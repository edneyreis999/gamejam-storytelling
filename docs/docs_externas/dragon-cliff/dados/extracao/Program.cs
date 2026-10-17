using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using System.Text.Json;

var tree = CSharpSyntaxTree.ParseText(File.ReadAllText(args[0]));
var root = tree.GetRoot();
var diagnostics = tree.GetDiagnostics().Where(d => d.Severity == DiagnosticSeverity.Error).ToList();
if (diagnostics.Count > 0) throw new Exception(string.Join("\n", diagnostics.Take(10)));
object Expr(ExpressionSyntax e) {
  if(e == null) return null;
  if(e is LiteralExpressionSyntax lit) return lit.Token.Value;
  if(e is ParenthesizedExpressionSyntax par) return Expr(par.Expression);
  if(e is PrefixUnaryExpressionSyntax pre && pre.OperatorToken.Text == "-" && pre.Operand is LiteralExpressionSyntax num) return -Convert.ToDouble(num.Token.Value);
  if(e is InitializerExpressionSyntax init) return init.Expressions.Select(Expr).ToArray();
  if(e is ObjectCreationExpressionSyntax obj) return new { kind="new", type=obj.Type.ToString(), args=obj.ArgumentList?.Arguments.Select(a=>Expr(a.Expression)).ToArray(), init=obj.Initializer?.Expressions.Select(Expr).ToArray() };
  if(e is AssignmentExpressionSyntax ass) return new { kind="assign", name=ass.Left.ToString(), value=Expr(ass.Right) };
  return new { kind="expression", csharp=e.ToString() };
}
var classes=root.DescendantNodes().OfType<ClassDeclarationSyntax>().Where(c=>c.Parent is not TypeDeclarationSyntax).Select(c=>new {
 name=c.Identifier.Text,
 bases=c.BaseList?.Types.Select(t=>t.Type.ToString()).ToArray() ?? Array.Empty<string>(),
 modifiers=c.Modifiers.ToString(),
 line=c.GetLocation().GetLineSpan().StartLinePosition.Line+1,
 fields=c.Members.OfType<FieldDeclarationSyntax>().SelectMany(f=>f.Declaration.Variables.Select(v=>new { name=v.Identifier.Text,type=f.Declaration.Type.ToString(),value=Expr(v.Initializer?.Value),csharp=v.Initializer?.Value.ToString()})),
 properties=c.Members.OfType<PropertyDeclarationSyntax>().Select(p=>new {name=p.Identifier.Text,type=p.Type.ToString(), value=Expr(p.ExpressionBody?.Expression),csharp=p.ToString()}),
 methods=c.Members.OfType<MethodDeclarationSyntax>().Select(m=>new {name=m.Identifier.Text,signature=m.ParameterList.ToString(),type=m.ReturnType.ToString(),value=Expr(m.ExpressionBody?.Expression),csharp=m.ToString()}),
 constructors=c.Members.OfType<ConstructorDeclarationSyntax>().Select(m=>m.ToString()),
 csharp=c.ToString()
}).ToArray();
var enums=root.DescendantNodes().OfType<EnumDeclarationSyntax>().Select(e=>new {name=e.Identifier.Text, members=e.Members.Select(m=>new {name=m.Identifier.Text,value=Expr(m.EqualsValue?.Value)})}).ToArray();
File.WriteAllText(args[1],JsonSerializer.Serialize(new{classes,enums},new JsonSerializerOptions{WriteIndented=false}));
Console.WriteLine($"Parsed {classes.Length} classes, {enums.Length} enums; no syntax errors.");

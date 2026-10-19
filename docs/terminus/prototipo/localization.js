(function (root) {
  'use strict';
  const records = typeof module !== 'undefined' ? require('./locales/en-US.js') : root.TerminusLocale;
  const byId = new Map(records.map(record => [record.id, record]));
  const byText = new Map();
  const templates = [];
  let language = 'en-US';
  const escape = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  for (const record of records) {
    byText.set(record.pt, record);
    if (record.template) {
      const names = [];
      const parts = record.pt.split(/(\{\w+\})/g);
      const expression = parts.map(part => {
        if (/^\{\w+\}$/.test(part)) { names.push(part.slice(1, -1)); return '([\\s\\S]*?)'; }
        return escape(part);
      }).join('');
      templates.push({ record, names, pattern: new RegExp('^' + expression + '$'), specificity: record.pt.replace(/\{\w+\}/g, '').length });
    }
  }
  templates.sort((a, b) => b.specificity - a.specificity);
  function setLanguage(value) {
    if (!['pt-BR', 'en-US'].includes(value)) throw new Error('Unsupported language: ' + value);
    language = value;
  }
  function format(record, values, depth) {
    const source = language === 'pt-BR' ? record.pt : record.en;
    return source.replace(/\{(\w+)\}/g, (_, name) => {
      if (!Object.hasOwn(values, name)) throw new Error(`Missing parameter ${name} in ${record.id}`);
      return translate(String(values[name]), depth + 1);
    });
  }
  function t(id, values = {}) {
    const record = byId.get(id);
    if (!record) throw new Error('Unknown localization key: ' + id);
    return format(record, values, 0);
  }
  // Canonical game data stays in Portuguese. This adapter translates only display strings.
  // Dynamic messages use the explicitly authored templates in the same catalog.
  function translate(value, depth = 0) {
    if (typeof value !== 'string' || !value) return value;
    const record = byText.get(value);
    if (record) return language === 'pt-BR' ? record.pt : record.en;
    if (language === 'pt-BR' || depth > 8) return value;
    for (const template of templates) {
      const match = template.pattern.exec(value);
      if (match) return format(template.record, Object.fromEntries(template.names.map((name, i) => [name, match[i + 1]])), depth);
    }
    return value;
  }
  function localizeMarkup(element) {
    const walker = element.ownerDocument.createTreeWalker(element, 4);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    for (const node of nodes) {
      const original = node.textContent;
      const trimmed = original.trim();
      if (trimmed) node.textContent = original.replace(trimmed, translate(trimmed));
    }
    for (const node of [element, ...element.querySelectorAll('[aria-label], [title], [alt]')])
      for (const name of ['aria-label', 'title', 'alt'])
        if (node.hasAttribute(name)) node.setAttribute(name, translate(node.getAttribute(name)));
  }
  const api = { t, text: translate, setLanguage, getLanguage: () => language, has: value => byText.has(value), records, localizeMarkup };
  root.TerminusLanguage = api;
  if (typeof module !== 'undefined') module.exports = api;
})(globalThis);

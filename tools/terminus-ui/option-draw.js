const theme = __THEME__;
const spec = __SPEC__;
const symbol = arguments[0];
const index = arguments[1];
const bitmap = this.contents;
const rect = this.itemRect(index);
const enabled = this.isCommandEnabled(index);
const selected = enabled && index === this.index();
const highlighted = selected || enabled && index === this._coretoHoverIndex;
const colors = theme.Surfaces;
const ink = ColorManager.normalColor();
const value = __VALUE__;

function textStyle(face, size, color) {
    bitmap.fontFace = face;
    bitmap.fontSize = size;
    bitmap.fontBold = false;
    bitmap.fontItalic = false;
    bitmap.outlineColor = 'transparent';
    bitmap.outlineWidth = 0;
    bitmap.textColor = color;
    bitmap.paintOpacity = 255;
}

function box(x, y, width, height, fill, border, radius = theme.Shapes.ControlRadius) {
    const ctx = bitmap.context;
    ctx.save();
    ctx.beginPath();
    const r = Math.min(radius, width / 2, height / 2);
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + width, y, x + width, y + height, r);
    ctx.arcTo(x + width, y + height, x, y + height, r);
    ctx.arcTo(x, y + height, x, y, r);
    ctx.arcTo(x, y, x + width, y, r);
    ctx.closePath();
    if (fill) { ctx.fillStyle = fill; ctx.fill(); }
    if (border) { ctx.strokeStyle = border; ctx.lineWidth = 1; ctx.stroke(); }
    ctx.restore();
    bitmap.baseTexture.update();
}

function label(text, x, y, width, height, align = 'left') {
    bitmap.drawText(String(text), x, y, width, height, align);
}

function wrappedLabel(text, x, y, width, height) {
    const lines = [''];
    for (const word of text.split(' ')) {
        const last = lines.length - 1;
        const next = lines[last] ? lines[last] + ' ' + word : word;
        if (bitmap.measureTextWidth(next) > width && lines[last]) lines.push(word);
        else lines[last] = next;
    }
    const top = y + (height - lines.length * theme.Menu.Line) / 2;
    lines.forEach((line, i) => label(line, x, top + i * theme.Menu.Line, width, theme.Menu.Line));
}

if (spec.kind === 'heading') {
    textStyle(theme.Section.Face, theme.Section.Size, ColorManager.normalColor());
    label(spec.label, rect.x + 16, rect.y + (rect.height - theme.Section.Line) / 2, rect.width - 32, theme.Section.Line);
    return;
}

const source = ImageManager.loadSystem(spec.asset);
if (source.isReady()) {
    const tinted = new Bitmap(source.width, source.height);
    tinted.blt(source, 0, 0, source.width, source.height, 0, 0);
    const ctx = tinted.context;
    ctx.globalCompositeOperation = 'source-in';
    ctx.fillStyle = ink;
    ctx.fillRect(0, 0, tinted.width, tinted.height);
    tinted.baseTexture.update();
    bitmap.blt(tinted, 0, 0, tinted.width, tinted.height, rect.x + 20, rect.y + (rect.height - 24) / 2, 24, 24);
    tinted.destroy();
} else {
    source.addLoadListener(() => { if (!this._destroyed && this.contents === bitmap) this.refresh(); });
}

const controlX = rect.x + Math.round(rect.width * theme.Controls.ValueRatio / 100);
const controlWidth = rect.width - (controlX - rect.x) - 20;
const controlY = rect.y + (rect.height - 44) / 2;
const control = {kind:spec.kind,x:controlX,width:controlWidth,value,min:spec.min,max:spec.max};
this.setOptionControl(index, control);
textStyle(theme.Menu.Face, theme.Menu.Size, ink);
wrappedLabel(spec.label, rect.x + 64, rect.y, controlX - rect.x - 80, rect.height);

function check(x, y, color) {
    const ctx = bitmap.context;
    ctx.save();
    ctx.beginPath(); ctx.moveTo(x, y + 6); ctx.lineTo(x + 4, y + 10); ctx.lineTo(x + 12, y);
    ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke();
    ctx.restore(); bitmap.baseTexture.update();
}

function chip(text, x, width, current) {
    const fill = current ? (highlighted ? colors.panel : colors.hover) : null;
    const color = current ? colors.primary : ink;
    if (current) box(x, controlY, width, 44, fill, colors.subtle);
    textStyle(theme.Action.Face, theme.Action.Size, color);
    if (current) check(x + 12, controlY + 16, color);
    label(text, x + (current ? 32 : 8), controlY, width - (current ? 40 : 16), 44, 'center');
}

if (!enabled) {
    textStyle(theme.Label.Face, theme.Label.Size, ColorManager.normalColor());
    label(spec.disabledHint || 'Indisponível', controlX, controlY, controlWidth, 44, 'right');
} else if (spec.kind === 'toggle' || spec.kind === 'segments') {
    const choices = __CHOICES__;
    control.count = choices.length;
    control.first = spec.first || 0;
    const current = spec.kind === 'toggle' ? Number(!!value) : value - (spec.first || 0);
    const width = (controlWidth - 12 * (choices.length - 1)) / choices.length;
    choices.forEach((text, i) => chip(text, controlX + i * (width + 12), width, i === current));
} else if (spec.kind === 'slider') {
    const rate = Math.max(0, Math.min(1, (value - spec.min) / (spec.max - spec.min)));
    const display = __DISPLAY__;
    textStyle(theme.Menu.Face, theme.Menu.Size, ink);
    const valueWidth = Math.max(100, Math.ceil(bitmap.measureTextWidth(display)));
    const trackWidth = controlWidth - valueWidth - 12;
    control.trackWidth = trackWidth;
    const trackY = controlY + 18;
    const fill = colors.primary;
    box(controlX, trackY, trackWidth, theme.Controls.TrackHeight, colors.disabled, null, 4);
    if (rate > 0) box(controlX, trackY, rate * trackWidth, theme.Controls.TrackHeight, fill, null, 4);
    box(controlX + Math.max(0, Math.min(trackWidth - theme.Controls.ThumbWidth, rate * trackWidth - theme.Controls.ThumbWidth / 2)), trackY - 5, theme.Controls.ThumbWidth, theme.Controls.ThumbHeight, fill, colors.panel, 4);
    textStyle(theme.Menu.Face, theme.Menu.Size, ink);
    label(display, controlX + trackWidth + 12, controlY, valueWidth, 44, 'right');
} else if (spec.kind === 'cycle') {
    const currentLabel = __DISPLAY__;
    chip(currentLabel, controlX + 44, controlWidth - 88, true);
    textStyle(theme.Menu.Face, theme.Menu.Size, ink);
    label('‹', controlX, controlY, 32, 44, 'center');
    label('›', controlX + controlWidth - 32, controlY, 32, 44, 'center');
} else if (spec.kind === 'action') {
    textStyle(theme.Action.Face, theme.Action.Size, ink);
    label('Abrir  ›', controlX, controlY, controlWidth, 44, 'right');
}

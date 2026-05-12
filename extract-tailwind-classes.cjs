const fs = require('fs');
const path = require('path');
const root = path.join(process.cwd(), 'src');
const classes = new Set();
function scanFile(text) {
  const regex = /className\s*=\s*"([^"]+)"|className\s*=\s*`([^`]+)`|className\s*=\s*\{\s*`([^`]*)`\s*\}|className\s*=\s*\{\s*"([^"\\]*?)"\s*\}|className\s*=\s*\{\s*'([^'\\]*?)'\s*\}/g;
  let m;
  while ((m = regex.exec(text))) {
    const raw = m[1] || m[2] || m[3] || m[4] || m[5];
    if (!raw) continue;
    raw.split(/\s+/).filter(Boolean).forEach(c => {
      if (/^[a-z0-9_\-:\/\[\]]+$/.test(c) && !c.includes('${') && !c.includes('?.') && !c.includes('==') && !c.includes('>') && !c.includes('<') && !c.includes('&&') && !c.includes('||')) {
        classes.add(c);
      }
    });
  }
}
function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    const fp = path.join(dir, name);
    const stat = fs.statSync(fp);
    if (stat.isDirectory()) walk(fp);
    else if (/\.tsx?$/.test(name)) {
      const text = fs.readFileSync(fp, 'utf8');
      scanFile(text);
    }
  }
}
const styleMap = {
  '0': '0',
  '1': '0.25rem',
  '2': '0.5rem',
  '3': '0.75rem',
  '4': '1rem',
  '5': '1.25rem',
  '6': '1.5rem',
  '8': '2rem',
  '10': '2.5rem',
  '12': '3rem',
  '16': '4rem',
  '20': '5rem',
  '24': '6rem',
  '32': '8rem',
  '64': '16rem',
};
const colors = {
  'black': '#000000',
  'white': '#ffffff',
  'gray-50': '#f9fafb',
  'gray-100': '#f3f4f6',
  'gray-200': '#e5e7eb',
  'gray-300': '#d1d5db',
  'gray-400': '#9ca3af',
  'gray-500': '#6b7280',
  'gray-600': '#4b5563',
  'gray-700': '#374151',
  'gray-800': '#1f2937',
  'gray-900': '#111827',
  'blue-600': '#2563eb',
  'blue-700': '#1d4ed8',
  'red-500': '#ef4444',
  'red-600': '#dc2626',
  'yellow-300': '#fcd34d',
  'yellow-400': '#fbbf24',
  'yellow-100': '#fef3c7',
  'green-400': '#4ade80',
  'green-600': '#16a34a',
  'accent': '#d4af37',
  'orange': '#f97316',
};
const gradientStops = {
  'from-black': '#000000',
  'from-yellow-300': '#fcd34d',
  'from-yellow-400/20': 'rgba(251,191,24,0.2)',
  'via-gray-900': '#111827',
  'to-black': '#000000',
  'to-transparent': 'transparent',
  'to-yellow-100': '#fef3c7',
};
function cssEscapeClass(cls) {
  return cls.replace(/[:\.\[\]]/g, match => `\\${match}`);
}
function decl(name, value) { return `${name}: ${value};`; }
function buildRule(selector, declarations) {
  const body = declarations
    .map(d => d.trim().endsWith(';') ? d.trim() : `${d.trim()};`)
    .join(' ');
  return `${selector} { ${body} }\n`;
}
function styleForClass(cls) {
  if (cls === 'flex') return ['display: flex'];
  if (cls === 'grid') return ['display: grid'];
  if (cls === 'block') return ['display: block'];
  if (cls === 'inline-block') return ['display: inline-block'];
  if (cls === 'hidden') return ['display: none'];
  if (cls === 'relative') return ['position: relative'];
  if (cls === 'absolute') return ['position: absolute'];
  if (cls === 'fixed') return ['position: fixed'];
  if (cls === 'inset-0') return ['top: 0', 'right: 0', 'bottom: 0', 'left: 0'];
  if (cls === 'top-0') return ['top: 0'];
  if (cls === 'left-0') return ['left: 0'];
  if (cls === 'right-0') return ['right: 0'];
  if (cls === 'bottom-0') return ['bottom: 0'];
  if (cls === 'top-1/2') return ['top: 50%'];
  if (cls === 'z-10') return ['z-index: 10'];
  if (cls === 'z-50') return ['z-index: 50'];
  if (cls === 'min-h-screen') return ['min-height: 100vh'];
  if (cls === 'object-cover') return ['object-fit: cover'];
  if (cls === 'aspect-square') return ['aspect-ratio: 1 / 1'];
  if (cls === 'leading-relaxed') return ['line-height: 1.75'];
  if (cls === 'leading-tight') return ['line-height: 1.1'];
  if (cls === 'uppercase') return ['text-transform: uppercase'];
  if (cls === 'tracking-widest') return ['letter-spacing: 0.1em'];
  if (cls === 'whitespace-nowrap') return ['white-space: nowrap'];
  if (cls === 'transition') return ['transition: all 0.3s ease'];
  if (cls === 'transition-all') return ['transition: all 0.3s ease'];
  if (cls === 'transition-colors') return ['transition: color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease'];
  if (cls === 'transition-shadow') return ['transition: box-shadow 0.3s ease'];
  if (cls === 'transition-transform') return ['transition: transform 0.3s ease'];
  if (cls === 'duration-300') return ['transition-duration: 0.3s'];
  if (cls === 'scroll-smooth') return ['scroll-behavior: smooth'];
  if (cls === 'opacity-80') return ['opacity: 0.8'];
  if (cls === 'rounded') return ['border-radius: 0.375rem'];
  if (cls === 'rounded-full') return ['border-radius: 9999px'];
  if (cls === 'rounded-lg') return ['border-radius: 0.5rem'];
  if (cls === 'shadow-md') return ['box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1)'];
  if (cls === 'shadow-2xl') return ['box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25)'];
  if (cls === 'hover:bg-gray-100') return ['/* placeholder */'];
  if (cls === 'hover:bg-gray-300') return ['/* placeholder */'];
  if (cls === 'hover:bg-gray-800') return ['/* placeholder */'];
  if (cls === 'hover:bg-red-50') return ['/* placeholder */'];
  if (cls === 'hover:bg-white') return ['/* placeholder */'];
  if (cls === 'hover:scale-110') return ['/* placeholder */'];
  if (cls === 'hover:shadow-lg') return ['/* placeholder */'];
  if (cls === 'hover:shadow-md') return ['/* placeholder */'];
  if (cls === 'hover:text-black') return ['/* placeholder */'];
  if (cls === 'hover:text-blue-700') return ['/* placeholder */'];
  if (cls === 'hover:text-blue-800') return ['/* placeholder */'];
  if (cls === 'hover:text-red-700') return ['/* placeholder */'];
  if (cls === 'hover:text-white') return ['/* placeholder */'];
  if (cls === 'focus:outline-none') return ['outline: none'];
  if (cls === 'focus:ring-2') return ['box-shadow: 0 0 0 2px rgba(0,0,0,0.1)'];
  if (cls === 'focus:ring-black') return ['box-shadow: 0 0 0 2px #000000'];
  if (cls === 'focus:ring-yellow-400') return ['box-shadow: 0 0 0 2px #fbbf24'];
  if (cls === 'text-center') return ['text-align: center'];
  if (cls === 'text-left') return ['text-align: left'];
  if (cls === 'text-right') return ['text-align: right'];
  if (cls === 'font-bold') return ['font-weight: 700'];
  if (cls === 'font-semibold') return ['font-weight: 600'];
  if (cls === 'animate-fadeIn') return ['animation: fadeIn 0.5s ease-in-out'];
  if (cls === 'animate-slideUp') return ['animation: slideUp 0.5s ease-out'];
  if (cls === 'bg-clip-text') return ['-webkit-background-clip: text', 'background-clip: text'];
  if (cls === 'text-transparent') return ['color: transparent'];
  if (cls === 'line-clamp-2') return ['display: -webkit-box', '-webkit-line-clamp: 2', '-webkit-box-orient: vertical', 'overflow: hidden'];
  if (cls === 'bg-gradient-to-r') return ['background-image: linear-gradient(to right, var(--tw-gradient-from, transparent), var(--tw-gradient-via, transparent), var(--tw-gradient-to, transparent))'];
  if (cls === 'bg-black/40') return ['background-color: rgba(0,0,0,0.4)'];
  if (cls === 'flex-1') return ['flex: 1 1 0%'];
  if (cls === 'flex-col') return ['flex-direction: column'];
  if (cls === 'flex-wrap') return ['flex-wrap: wrap'];
  if (cls === 'flex-grow') return ['flex-grow: 1'];
  if (cls === 'flex-shrink-0') return ['flex-shrink: 0'];
  if (cls === 'transform') return ['transform: translate(0, 0)'];
  if (cls === '-translate-y-1/2') return ['transform: translateY(-50%)'];
  if (cls === 'sticky') return ['position: sticky'];
  if (cls === 'top-24') return ['top: 6rem'];
  if (cls === 'top-3') return ['top: 0.75rem'];
  if (cls === 'left-3') return ['left: 0.75rem'];
  if (cls === 'w-5') return ['width: 1.25rem'];
  if (cls === 'h-5') return ['height: 1.25rem'];
  if (cls === 'w-24') return ['width: 6rem'];
  if (cls === 'w-64') return ['width: 16rem'];
  if (cls === 'line-through') return ['text-decoration: line-through'];
  if (cls === 'hr') return ['border: none'];
  if (cls === 'btn-primary') return ['padding: 0.75rem 2rem', 'background-color: #000000', 'color: #ffffff', 'font-weight: 600', 'border-radius: 0.375rem', 'cursor: pointer', 'transition: all 0.3s ease'];
  if (cls === 'btn-secondary') return ['padding: 0.75rem 2rem', 'background-color: #ffffff', 'color: #000000', 'border: 2px solid #000000', 'font-weight: 600', 'border-radius: 0.375rem', 'cursor: pointer', 'transition: all 0.3s ease'];
  if (cls === 'btn-outline') return ['padding: 0.5rem 1.5rem', 'border: 1px solid #d1d5db', 'color: #374151', 'border-radius: 0.375rem', 'cursor: pointer', 'transition: all 0.3s ease'];
  if (cls === 'section-title') return ['font-size: 2.25rem', 'font-weight: 700', 'text-align: center', 'margin-bottom: 3rem', 'color: #111827'];
  if (cls === 'bg-white') return ['background-color: #ffffff'];
  if (cls === 'bg-black') return ['background-color: #000000'];
  if (cls === 'bg-gray-50') return ['background-color: #f9fafb'];
  if (cls === 'bg-gray-100') return ['background-color: #f3f4f6'];
  if (cls === 'bg-gray-200') return ['background-color: #e5e7eb'];
  if (cls === 'bg-gray-900') return ['background-color: #111827'];
  if (cls === 'bg-red-50') return ['background-color: #fef2f2'];
  if (cls === 'text-black') return ['color: #000000'];
  if (cls === 'text-white') return ['color: #ffffff'];
  if (cls === 'text-gray-300') return ['color: #d1d5db'];
  if (cls === 'text-gray-400') return ['color: #9ca3af'];
  if (cls === 'text-gray-500') return ['color: #6b7280'];
  if (cls === 'text-gray-600') return ['color: #4b5563'];
  if (cls === 'text-gray-700') return ['color: #374151'];
  if (cls === 'text-gray-900') return ['color: #111827'];
  if (cls === 'text-blue-600') return ['color: #2563eb'];
  if (cls === 'text-green-400') return ['color: #4ade80'];
  if (cls === 'text-red-500') return ['color: #ef4444'];
  if (cls === 'text-red-600') return ['color: #dc2626'];
  if (cls === 'text-xl') return ['font-size: 1.25rem'];
  if (cls === 'text-lg') return ['font-size: 1.125rem'];
  if (cls === 'text-sm') return ['font-size: 0.875rem'];
  if (cls === 'text-xs') return ['font-size: 0.75rem'];
  if (cls === 'text-2xl') return ['font-size: 1.5rem'];
  if (cls === 'text-3xl') return ['font-size: 1.875rem'];
  if (cls === 'text-4xl') return ['font-size: 2.25rem'];
  if (cls === 'text-5xl') return ['font-size: 3rem'];
  if (cls === 'font-semibold') return ['font-weight: 600'];
  if (cls === 'font-bold') return ['font-weight: 700'];
  if (cls === 'max-w-7xl') return ['max-width: 80rem'];
  if (cls === 'max-w-3xl') return ['max-width: 48rem'];
  if (cls === 'max-w-2xl') return ['max-width: 42rem'];
  if (cls === 'mx-auto') return ['margin-left: auto', 'margin-right: auto'];
  if (cls === 'grid-cols-1') return ['grid-template-columns: repeat(1, minmax(0, 1fr))'];
  if (cls === 'md:grid-cols-2') return ['grid-template-columns: repeat(2, minmax(0, 1fr))'];
  if (cls === 'md:grid-cols-4') return ['grid-template-columns: repeat(4, minmax(0, 1fr))'];
  if (cls === 'lg:grid-cols-3') return ['grid-template-columns: repeat(3, minmax(0, 1fr))'];
  if (cls === 'md:block') return ['display: block'];
  if (cls === 'lg:block') return ['display: block'];
  if (cls === 'lg:hidden') return ['display: none'];
  if (cls === 'sm:flex-row') return ['flex-direction: row'];
  if (cls === 'md:flex-row') return ['flex-direction: row'];
  if (cls === 'lg:col-span-1') return ['grid-column: span 1 / span 1'];
  if (cls === 'lg:col-span-2') return ['grid-column: span 2 / span 2'];
  if (cls === 'rounded-full') return ['border-radius: 9999px'];
  if (cls === 'max-h-[300px]') return ['max-height: 300px'];
  if (cls === 'fixed') return ['position: fixed'];
  if (cls === 'w-full') return ['width: 100%'];
  if (cls === 'h-full') return ['height: 100%'];
  if (cls === 'overflow-hidden') return ['overflow: hidden'];
  if (cls === 'overflow-x-auto') return ['overflow-x: auto'];
  if (cls === 'overflow-y-auto') return ['overflow-y: auto'];
  if (cls === 'justify-between') return ['justify-content: space-between'];
  if (cls === 'justify-center') return ['justify-content: center'];
  if (cls === 'items-center') return ['align-items: center'];
  if (cls === 'gap-1') return ['gap: 0.25rem'];
  if (cls === 'gap-2') return ['gap: 0.5rem'];
  if (cls === 'gap-3') return ['gap: 0.75rem'];
  if (cls === 'gap-4') return ['gap: 1rem'];
  if (cls === 'gap-6') return ['gap: 1.5rem'];
  if (cls === 'gap-8') return ['gap: 2rem'];
  if (cls === 'space-y-2') return ['display: flex', 'flex-direction: column', 'gap: 0.5rem'];
  if (cls === 'space-y-4') return ['display: flex', 'flex-direction: column', 'gap: 1rem'];
  if (cls === 'space-y-6') return ['display: flex', 'flex-direction: column', 'gap: 1.5rem'];
  return null;
}
function variableColor(cls) {
  const match = cls.match(/^(text|bg|border)-(.*)$/);
  if (match) {
    const [, prefix, key] = match;
    if (key === 'black/40') return 'rgba(0,0,0,0.4)';
    if (gradientStops[`${prefix}-${key}`]) return gradientStops[`${prefix}-${key}`];
    if (colors[key]) return colors[key];
    return null;
  }
  if (cls.startsWith('from-')) return gradientStops[cls] || null;
  if (cls.startsWith('via-')) return gradientStops[cls] || null;
  if (cls.startsWith('to-')) return gradientStops[cls] || null;
  return null;
}
function dimensionClass(cls) {
  if (/^p-\d+$/.test(cls)) {
    const value = styleMap[cls.slice(2)];
    if (value) return ['padding: ' + value];
  }
  if (/^px-\d+$/.test(cls)) {
    const value = styleMap[cls.slice(3)];
    if (value) return ['padding-left: ' + value, 'padding-right: ' + value];
  }
  if (/^py-\d+$/.test(cls)) {
    const value = styleMap[cls.slice(3)];
    if (value) return ['padding-top: ' + value, 'padding-bottom: ' + value];
  }
  if (/^pt-\d+$/.test(cls)) {
    const value = styleMap[cls.slice(3)];
    if (value) return ['padding-top: ' + value];
  }
  if (/^pb-\d+$/.test(cls)) {
    const value = styleMap[cls.slice(3)];
    if (value) return ['padding-bottom: ' + value];
  }
  if (/^m[trblxy]?-(\d+)$/.test(cls)) {
    const parts = cls.split('-');
    const type = parts[0];
    const value = styleMap[parts[1]];
    if (!value) return null;
    if (type === 'm') return ['margin: ' + value];
    if (type === 'mt') return ['margin-top: ' + value];
    if (type === 'mb') return ['margin-bottom: ' + value];
    if (type === 'ml') return ['margin-left: ' + value];
    if (type === 'mr') return ['margin-right: ' + value];
    if (type === 'mx') return ['margin-left: ' + value, 'margin-right: ' + value];
    if (type === 'my') return ['margin-top: ' + value, 'margin-bottom: ' + value];
  }
  if (/^w-(\d+)$/.test(cls)) {
    const value = styleMap[cls.slice(2)];
    if (value) return ['width: ' + value];
  }
  if (/^h-(\d+)$/.test(cls)) {
    const value = styleMap[cls.slice(2)];
    if (value) return ['height: ' + value];
  }
  if (/^grid-cols-(\d+)$/.test(cls)) {
    const n = cls.match(/^grid-cols-(\d+)$/)[1];
    return ['grid-template-columns: repeat(' + n + ', minmax(0, 1fr))'];
  }
  if (/^max-w-(7xl|3xl|2xl)$/.test(cls)) return null;
  if (/^max-h-\[\d+px\]$/.test(cls)) {
    const value = cls.match(/^max-h-\[(\d+)px\]$/)[1];
    return ['max-height: ' + value + 'px'];
  }
  return null;
}
function borderClass(cls) {
  if (cls === 'border') return ['border: 1px solid #e5e7eb'];
  if (cls === 'border-b') return ['border-bottom: 1px solid #e5e7eb'];
  if (cls === 'border-t') return ['border-top: 1px solid #e5e7eb'];
  if (cls.startsWith('border-')) {
    const color = variableColor(cls);
    if (color) return ['border-color: ' + color];
  }
  return null;
}
function parseClass(cls) {
  const custom = styleForClass(cls) || dimensionClass(cls) || borderClass(cls);
  if (custom) return custom;
  if (cls.startsWith('text-') || cls.startsWith('bg-')) {
    const color = variableColor(cls);
    if (color) {
      return [cls.startsWith('bg-') ? 'background-color: ' + color : 'color: ' + color];
    }
  }
  if (cls.startsWith('from-')) {
    const color = variableColor(cls);
    if (color) return ['--tw-gradient-from: ' + color];
  }
  if (cls.startsWith('via-')) {
    const color = variableColor(cls);
    if (color) return ['--tw-gradient-via: ' + color];
  }
  if (cls.startsWith('to-')) {
    const color = variableColor(cls);
    if (color) return ['--tw-gradient-to: ' + color];
  }
  return null;
}
walk(root);
const classArray = Array.from(classes).sort();
const rules = [];
for (const cls of classArray) {
  if (cls.startsWith('sm:') || cls.startsWith('md:') || cls.startsWith('lg:')) continue;
  if (cls.startsWith('hover:') || cls.startsWith('focus:')) continue;
  const decls = parseClass(cls);
  if (decls) {
    const sel = '.' + cssEscapeClass(cls);
    rules.push(buildRule(sel, decls));
  }
}
const responsive = {
  'sm': { mq: '@media (min-width: 640px)', classes: [] },
  'md': { mq: '@media (min-width: 768px)', classes: [] },
  'lg': { mq: '@media (min-width: 1024px)', classes: [] },
};
for (const cls of classArray) {
  if (!cls.includes(':')) continue;
  const [prefix, rest] = cls.split(/:(.+)/);
  if (!responsive[prefix]) continue;
  const decls = parseClass(rest);
  if (decls) {
    const sel = '.' + cssEscapeClass(cls);
    responsive[prefix].classes.push(buildRule(sel, decls));
  }
}
for (const key of Object.keys(responsive)) {
  if (responsive[key].classes.length) {
    rules.push(`${responsive[key].mq} {\n${responsive[key].classes.join('')} }\n`);
  }
}
const hoverRules = {
  'hover:bg-gray-100': 'background-color: #f3f4f6',
  'hover:bg-gray-300': 'background-color: #d1d5db',
  'hover:bg-gray-800': 'background-color: #1f2937',
  'hover:bg-red-50': 'background-color: #fef2f2',
  'hover:bg-white': 'background-color: #ffffff',
  'hover:scale-110': 'transform: scale(1.1)',
  'hover:shadow-lg': 'box-shadow: 0 10px 15px rgba(0, 0, 0, 0.15)',
  'hover:shadow-md': 'box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1)',
  'hover:text-black': 'color: #000000',
  'hover:text-blue-700': 'color: #1d4ed8',
  'hover:text-blue-800': 'color: #1e40af',
  'hover:text-red-700': 'color: #b91c1c',
  'hover:text-white': 'color: #ffffff',
  'hover:border-black': 'border-color: #000000',
};
for (const [cls, decl] of Object.entries(hoverRules)) {
  rules.push(buildRule(`.${cssEscapeClass(cls)}:hover`, [decl]));
}
const focusRules = {
  'focus:outline-none': ['outline: none'],
  'focus:ring-2': ['box-shadow: 0 0 0 2px rgba(0,0,0,0.1)'],
  'focus:ring-black': ['box-shadow: 0 0 0 2px #000000'],
  'focus:ring-yellow-400': ['box-shadow: 0 0 0 2px #fbbf24'],
};
for (const [cls, decls] of Object.entries(focusRules)) {
  rules.push(buildRule(`.${cssEscapeClass(cls)}:focus`, decls));
}
const utilityCss = `:root {
  --color-black: #000000;
  --color-white: #ffffff;
  --color-gray-50: #f9fafb;
  --color-gray-100: #f3f4f6;
  --color-gray-200: #e5e7eb;
  --color-gray-300: #d1d5db;
  --color-gray-400: #9ca3af;
  --color-gray-500: #6b7280;
  --color-gray-600: #4b5563;
  --color-gray-700: #374151;
  --color-gray-800: #1f2937;
  --color-gray-900: #111827;
  --color-blue: #2563eb;
  --color-red: #ef4444;
  --color-yellow: #fbbf24;
  --color-green: #4ade80;
  --color-orange: #f97316;
  --transition-all: all 0.3s ease;
  --transition-colors: color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease;
  --transition-shadow: box-shadow 0.3s ease;
}

html { scroll-behavior: smooth; }
body { font-family: "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; background-color: var(--color-white); color: var(--color-black); line-height: 1.6; }
* { margin: 0; padding: 0; box-sizing: border-box; transition: var(--transition-colors); }
::selection { background: var(--color-black); color: var(--color-white); }

${rules.join('\n')}

@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes slideUp { from { transform: translateY(10px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
`;
fs.writeFileSync(path.join('src', 'styles', 'utilities.css'), utilityCss);
fs.writeFileSync('tailwind-classes.txt', Array.from(classes).sort().join('\n'));
const defined = new Set();
function normalizeClass(name) {
  return name.replace(/[:\.\[\]\\]/g, '');
}
utilityCss.split(/\n/).forEach(line => {
  const m = line.match(/^\.(\\?.+?)(?=(?::|\s*\{))/);
  if (m) defined.add(normalizeClass(m[1].replace(/\\/g, '')));
});
const missing = Array.from(classes).filter(c => !defined.has(normalizeClass(c)));
console.log(`${classes.size} unique classes written to tailwind-classes.txt and src/styles/utilities.css generated.`);
if (missing.length) {
  console.log(`Missing ${missing.length} classes:`);
  console.log(missing.join('\n'));
}

import hljs from 'highlight.js';
import katex from 'katex';
import { Marked, type MarkedExtension, type Renderer, type Tokens } from 'marked';
import 'katex/dist/katex.min.css';

const regexPreviewLink = /^\[(.*)\]$/;

const blockLatexRule: RegExp[] = [
  /^\$\$([\s\S]+?)\$\$/,
  /^\\\[([\s\S]+?)\\\]/,
  /^\\begin\{equation\}([\s\S]+?)\\end\{equation\}/,
  /^\\begin\{align\}([\s\S]+?)\\end\{align\}/,
  /^\\begin\{math\}([\s\S]+?)\\end\{math\}/,
];

const inlineLatexRule: RegExp[] = [
  /^\$([^$\n]+?)\$/,
  /^\\\(([\s\S]+?)\\\)/,
  /^\\begin\{math\}([\s\S]+?)\\end\{math\}/,
  /^\\begin\{inline\}([\s\S]+?)\\end\{inline\}/,
];
const inlineLatexStart = /^\$|\\\(|\\begin\{/;
const blockLatexStart = /^\$\$|\\\[|\\begin\{/;

function safeEncodeURIComponent(str: string) {
  try {
    return encodeURIComponent(str);
  } catch {
    try {
      const cleaned = String(str).replace(/[\uD800-\uDFFF]/g, '�');
      return encodeURIComponent(cleaned);
    } catch {
      return encodeURIComponent(String(str).replace(/[^\x20-\x7E]/g, '?'));
    }
  }
}

// Helper function to render LaTeX with consistent error handling
function renderLatex(tex: string, displayMode: boolean): string {
  try {
    // Trim and sanitize the LaTeX content
    const sanitizedTex = tex.trim().replace(/\\$/g, '\\');
    return katex.renderToString(sanitizedTex, {
      displayMode,
      throwOnError: false,
      strict: false,
    });
  } catch (e) {
    console.error('KaTeX error:', e);
    return displayMode
      ? `<div class="tex-error">LaTeX Error: ${e instanceof Error ? e.message : 'Unknown error'}</div>`
      : `<span class="tex-error">LaTeX Error: ${e instanceof Error ? e.message : 'Unknown error'}</span>`;
  }
}

// LaTeX extension
const latexExtension: MarkedExtension = {
  extensions: [
    {
      name: 'blockLatex',
      level: 'block',
      start(src: string) {
        return src.match(blockLatexStart)?.index ?? -1;
      },
      tokenizer(src) {
        for (const rule of blockLatexRule) {
          const match = rule.exec(src);
          if (match) {
            return {
              type: 'html',
              raw: match[0],
              text: match[1] ? `<div class="block-latex">${renderLatex(match[1], true)}</div>` : '',
              tokens: [],
            };
          }
        }
        return undefined;
      },
    },

    // Inline LaTeX
    {
      name: 'inlineLatex',
      level: 'inline',
      start(src: string) {
        if (src.startsWith('$$')) {
          return -1;
        }
        return src.match(inlineLatexStart)?.index ?? -1;
      },
      tokenizer(src) {
        if (src.startsWith('$$')) {
          return undefined;
        }

        for (const rule of inlineLatexRule) {
          const match = rule.exec(src);
          if (match) {
            return {
              type: 'html',
              raw: match[0],
              text: match[1] ? renderLatex(match[1], false) : '',
              tokens: [],
            };
          }
        }
        return undefined;
      },
    },
  ],
};

export const marked = new Marked({
  renderer: {
    link(this: Renderer, { href, title, text }: Tokens.Link) {
      const isButton = regexPreviewLink.test(text ?? '');
      if (isButton) {
        return `
          <a href="${href}" 
             target="_blank" 
             data-meta-trigger="true"
             data-meta-href="${href}"
             class="mcaption-regular10 inline-flex items-center justify-center break-all rounded-full border bg-primary/10 px-2 py-1 hover:border-primary hover:bg-background hover:text-primary"
             ${title ? `title="${title}"` : ''}>${text.substring(1, text.length - 1)}</a>
        `;
      }

      // Regular links don't get tooltip trigger attributes
      return `<a 
        href="${href}" 
        target="_blank" 
        class="text-primary break-all underline" 
        ${title ? `title="${title}"` : ''}
      >${text}</a>`;
    },
    code(this: Renderer, { text, lang }: Tokens.Code) {
      const originalCode = text;
      const language = hljs.getLanguage(lang ?? '') ? lang : 'plaintext';

      const highlightedCode = hljs.highlight(originalCode, {
        language: language || 'plaintext',
      }).value;

      return `
<pre><div class="flex justify-between border-b pb-2 opacity-50 code-title-wrapper" 
data-code="${safeEncodeURIComponent(originalCode)}">
  <p class="uppercase">${language}</p>
</div>
<code class="hljs overflow-x-auto language-${lang}">${highlightedCode}</code></pre>`;
    },

    image(this: Renderer, { href, title, text }: Tokens.Image) {
      if (!href) {
        return '';
      }

      return `
      <div class="flex justify-center">
        <div class="relative inline-block group image-preview">
          <img 
            src="${href}" 
            alt="${text}" 
            ${title ? `title="${title}"` : ''} 
            class="md:max-w-[400px] rounded-xl"
          />
        </div>
      </div>
      `;
    },
  },
});

// Add the LaTeX extension to marked
marked.use(latexExtension);

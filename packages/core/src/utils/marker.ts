import hljs from 'highlight.js';
import katex from 'katex';
import { Marked, type MarkedExtension, type Renderer, type Tokens } from 'marked';
import 'katex/dist/katex.min.css';

const regexLinkButton = /^\[(\d+)\]$/;

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
      const isButton = regexLinkButton.test(text ?? '');
      return `<a href="${href}" target="_blank" class="text-primary ${isButton ? 'border font-bold rounded-full bg-primary/10 p-1 text-xs h-5 w-5 inline-flex items-center justify-center' : 'underline'}" ${title ? `title="${title}"` : ''}>${isButton ? text.substring(1, text.length - 1) : text}</a>`;
    },
    code(this: Renderer, { text, lang }: Tokens.Code) {
      const originalCode = text;
      const language = hljs.getLanguage(lang ?? '') ? lang : 'plaintext';

      // Check if this might be LaTeX code block
      if (lang === 'latex' || lang === 'tex') {
        return `<div class="latex-block">${renderLatex(text, true)}</div>`;
      }

      const highlightedCode = hljs.highlight(originalCode, {
        language: language || 'plaintext',
      }).value;

      return `
<pre><div class="flex justify-between border-b pb-2 opacity-50">
  <p class="uppercase">${language}</p>
  <button 
        onclick="(function(button){
      const code = decodeURIComponent(button.getAttribute('data-code'));
      navigator.clipboard.writeText(code).then(() => {
        const copyIcon = button.querySelector('.copy-icon');
        const checkIcon = button.querySelector('.check-icon');
        copyIcon.classList.add('hidden');
        checkIcon.classList.remove('hidden');
        setTimeout(() => {
          copyIcon.classList.remove('hidden');
          checkIcon.classList.add('hidden');
        }, 2000);
      });
    })(this)"
    data-copy-button data-code="${safeEncodeURIComponent(originalCode)}" class="flex items-center justify-center h-6 w-6 border rounded hover:bg-gray-100">
    <svg class="copy-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M8 17.929H6c-1.105 0-2-.912-2-2.036V5.036C4 3.912 4.895 3 6 3h8c1.105 0 2 .912 2 2.036v1.866m-6 .17h8c1.105 0 2 .91 2 2.035v10.857C20 21.088 19.105 22 18 22h-8c-1.105 0-2-.911-2-2.036V9.107c0-1.124.895-2.036 2-2.036z"/>
    </svg>
    <svg class="check-icon hidden" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  </button>
</div>
<code class="hljs overflow-x-auto language-${lang}">${highlightedCode}</code></pre>`;
    },

    image(this: Renderer, { href, title, text }: Tokens.Image) {
      if (!href) {
        return '';
      }

      return `
        <div class="relative inline-block">
          <img 
            src="${href}" 
            alt="${text}" 
            ${title ? `title="${title}"` : ''} 
            class="md:max-w-[400px] rounded-xl"
          />
          <button
            onclick="(function(button) {
              const imgUrl = button.getAttribute('data-image-url');
              const fileName = button.getAttribute('data-file-name');
              
              fetch(imgUrl)
                .then(response => response.blob())
                .then(blob => {
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = fileName || 'image';
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  window.URL.revokeObjectURL(url);
                })
                .catch(error => console.error('Error downloading image:', error));
            })(this)"
            data-image-url="${href}"
            data-file-name="${text || 'image'}"
            class="p-2 flex gap-1 border rounded bg-background absolute bottom-2 right-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
          </button>
        </div>
      `;
    },
  },
});

// Add the LaTeX extension to marked
marked.use(latexExtension);

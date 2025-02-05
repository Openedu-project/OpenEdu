import hljs from 'highlight.js';
import { Marked, type Renderer, type Tokens } from 'marked';

export const marked = new Marked({
  renderer: {
    link(this: Renderer, { href, title, text }: Tokens.Link) {
      return `<a href="${href}" class="text-primary underline" ${title ? `title="${title}"` : ''}>${text}</a>`;
    },
    code(this: Renderer, { text, lang }: Tokens.Code) {
      // Store the original unformatted code
      const originalCode = text;
      // Get the language or fallback to plaintext
      const language = hljs.getLanguage(lang ?? '') ? lang : 'plaintext';

      const highlightedCode = hljs.highlight(originalCode, {
        language: language || 'plaintext',
      }).value;

      return `
<pre><div class="flex justify-between border-b pb-2 opacity-50">
  <p class="uppercase">${lang}</p>
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
    data-copy-button data-code="${encodeURIComponent(originalCode)}" class="flex items-center justify-center h-6 w-6 border rounded hover:bg-gray-100">
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
            class="md:max-w-[400px] rounded-lg"
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

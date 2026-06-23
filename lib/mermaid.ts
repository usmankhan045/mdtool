// IMPORTANT: mermaid is NEVER imported at the top level.
// It uses browser APIs (SVG, DOM) and will crash on the server.
// Always use dynamic import inside each function.

export async function initMermaid(): Promise<void> {
  const mermaid = (await import('mermaid')).default;
  mermaid.initialize({
    startOnLoad: false,
    theme: 'default',
    securityLevel: 'loose', // needed to render diagrams inside iframes / srcdoc
    fontFamily: 'inherit',
  });
}

export async function renderMermaidBlocks(container: HTMLElement): Promise<void> {
  const mermaid = (await import('mermaid')).default;

  // marked outputs mermaid fences as <code class="language-mermaid">
  const blocks = container.querySelectorAll<HTMLElement>('code.language-mermaid');
  if (blocks.length === 0) return;

  for (let i = 0; i < blocks.length; i++) {
    const codeEl = blocks[i];
    const diagram = codeEl.textContent?.trim() ?? '';
    if (!diagram) continue;

    const id = `mermaid-${Date.now()}-${i}`;

    try {
      const { svg } = await mermaid.render(id, diagram);
      const wrapper = document.createElement('div');
      wrapper.className = 'mermaid-diagram';
      wrapper.innerHTML = svg;
      // codeEl is inside a <pre> — replace the whole <pre>
      const pre = codeEl.closest('pre') ?? codeEl;
      pre.replaceWith(wrapper);
    } catch (err) {
      console.error(`Mermaid render failed for block #${i}:`, err);
      // Leave the original code block in place on error
    }
  }
}

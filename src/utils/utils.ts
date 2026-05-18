export function createTemplateAndAppend(html: string, root: ShadowRoot) {
  const template = document.createElement('template');
  template.innerHTML = html;
  root.appendChild(template.content.cloneNode(true));
  const $ = (selector: string) => {
    return root.querySelector(selector);
  };
  const all = (selector: string) => {
    return root.querySelectorAll(selector);
  }

  return {root, $, all};
}




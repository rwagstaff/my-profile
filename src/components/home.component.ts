const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
      min-height: 100vh;
    }

    .root {
      background: #020617;
      min-height: 100vh;
      overflow: clip;
    }
  </style>
  <main class="root">
    <hero-section></hero-section>
    <tech-bubbles-section></tech-bubbles-section>
    <career-timeline-section></career-timeline-section>
    <about-section></about-section>
    <thanks-section></thanks-section>
  </main>
`;

export class HomeComponent extends HTMLElement {
  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true));
    }
  }
}

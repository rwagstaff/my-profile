import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { hobbies, profile } from '../data/cv';

gsap.registerPlugin(ScrollTrigger);

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
    }

    .section {
      background:
        radial-gradient(circle at 10% 20%, rgba(20, 184, 166, 0.18), transparent 30rem),
        linear-gradient(180deg, #020617, #111827);
      color: #f8fafc;
      min-height: 100svh;
      padding: clamp(4rem, 8vw, 8rem) clamp(1.25rem, 5vw, 5rem);
    }

    .layout {
      align-items: start;
      display: grid;
      gap: clamp(1.5rem, 4vw, 4rem);
      grid-template-columns: minmax(0, 1.2fr) minmax(18rem, 0.8fr);
      margin: 0 auto;
      max-width: 75rem;
    }

    .eyebrow {
      color: #5eead4;
      font-weight: 900;
      letter-spacing: 0.2em;
      margin: 0 0 0.75rem;
      text-transform: uppercase;
    }

    h2 {
      font-size: clamp(2.6rem, 7vw, 7rem);
      letter-spacing: -0.07em;
      line-height: 0.9;
      margin: 0 0 1.5rem;
    }

    .summary {
      color: #cbd5e1;
      font-size: clamp(1.05rem, 2vw, 1.35rem);
      max-width: 52rem;
    }

    .panel {
      background: rgba(15, 23, 42, 0.76);
      border: 1px solid rgba(148, 163, 184, 0.22);
      border-radius: 1.5rem;
      box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.16);
      padding: clamp(1.25rem, 3vw, 2rem);
    }

    .panel + .panel {
      margin-top: 1rem;
    }

    h3 {
      font-size: 1.2rem;
      margin: 0 0 0.75rem;
    }

    a {
      color: #93c5fd;
      font-weight: 800;
      text-decoration: none;
    }

    ul {
      display: grid;
      gap: 0.75rem;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    li {
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 999px;
      padding: 0.7rem 1rem;
    }

    @media (max-width: 760px) {
      .layout {
        grid-template-columns: 1fr;
      }
    }
  </style>
  <section class="section" aria-labelledby="about-title">
    <div class="layout">
      <div class="content">
        <p class="eyebrow">04 / About</p>
        <h2 id="about-title">About me</h2>
        <p class="summary">${profile.summary}</p>
      </div>
      <aside>
        <div class="panel">
          <h3>Contact</h3>
          <a href="mailto:${profile.email}">${profile.email}</a>
        </div>
        <div class="panel">
          <h3>Hobbies</h3>
          <ul>
            ${hobbies.map(hobby => `<li>${hobby}</li>`).join('')}
          </ul>
        </div>
      </aside>
    </div>
  </section>
`;

export class AboutSectionComponent extends HTMLElement {
  private context?: gsap.Context;

  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true));
    }

    const root = this.shadowRoot;

    if (!root) {
      return;
    }

    const content = root.querySelector('.content');
    const panels = root.querySelectorAll('.panel');

    this.context = gsap.context(() => {
      gsap.from(content, {
        duration: 0.9,
        ease: 'power3.out',
        opacity: 0,
        scrollTrigger: {
          start: 'top 76%',
          toggleActions: 'play none none reverse',
          trigger: this,
        },
        y: 50,
      });

      gsap.from(panels, {
        duration: 0.8,
        ease: 'power3.out',
        opacity: 0,
        scrollTrigger: {
          start: 'top 72%',
          toggleActions: 'play none none reverse',
          trigger: this,
        },
        stagger: 0.15,
        x: 70,
      });
    });
  }

  disconnectedCallback() {
    this.context?.revert();
  }
}

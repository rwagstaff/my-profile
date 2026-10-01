import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { aboutCards, profile } from '../data/cv';

gsap.registerPlugin(ScrollTrigger);

const aboutCardMarkup = aboutCards
  .map((card, index) => {
    const frontIconMarkup = card.icon
      ? card.iconDisplay === 'image'
        ? `<img class="card-icon card-icon-image" src="${card.icon}" alt="" aria-hidden="true" />`
        : `<span class="card-icon card-icon-mask" style="--icon: url('${card.icon}')" aria-hidden="true"></span>`
      : '';
    const backIconMarkup = card.icon
      ? card.iconDisplay === 'image'
        ? `<img class="card-icon card-icon-small card-icon-image" src="${card.icon}" alt="" aria-hidden="true" />`
        : `<span class="card-icon card-icon-small card-icon-mask" style="--icon: url('${card.icon}')" aria-hidden="true"></span>`
      : '';
    const linkMarkup = card.href
      ? `<a class="card-link" href="${card.href}" target="_blank" rel="noreferrer">Open ${card.title}</a>`
      : '';
    const backDetailsMarkup = card.backItems?.length
      ? `
        ${card.backTitle ? `<span class="card-back-title">${card.backTitle}</span>` : ''}
        <ul class="card-detail-list">
          ${card.backItems.map(item => `<li>${item}</li>`).join('')}
        </ul>
      `
      : '';

    return `
      <article class="card-shell" style="--accent: ${card.accent}">
        <div class="card">
          <div class="card-inner">
            <button class="card-face card-front" type="button" aria-label="Turn ${card.title} card over">
              <span class="card-index">${String(index + 1).padStart(2, '0')}</span>
              ${frontIconMarkup}
              <span class="card-title">${card.title}</span>
            </button>
            <div class="card-face card-back">
              <span class="card-index">${String(index + 1).padStart(2, '0')}</span>
              ${backIconMarkup}
              <div class="card-back-content">
                ${backDetailsMarkup}
                ${linkMarkup}
              </div>
              <button class="card-reset" type="button">Flip back</button>
            </div>
          </div>
        </div>
      </article>
    `;
  })
  .join('');

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
    }

    *,
    *::before,
    *::after {
      box-sizing: border-box;
    }

    .section {
      background:
        radial-gradient(circle at 85% 12%, rgba(96, 165, 250, 0.18), transparent 34rem),
        radial-gradient(circle at 10% 20%, rgba(20, 184, 166, 0.18), transparent 30rem),
        linear-gradient(180deg, #020617, #111827);
      color: #f8fafc;
      min-height: 100svh;
      overflow: hidden;
      padding: clamp(3rem, 5vw, 5rem) clamp(1.25rem, 5vw, 5rem);
    }

    .layout {
      display: grid;
      gap: clamp(1.5rem, 3vw, 2.5rem);
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
      line-height: 1.7;
      max-width: 58rem;
    }

    .education {
      color: #5eead4;
      font-weight: 800;
      margin: 1.5rem 0 0;
    }

    a {
      text-decoration: none;
    }

    .card-grid {
      display: grid;
      gap: clamp(1rem, 2.4vw, 1.5rem);
      grid-template-columns: repeat(3, minmax(0, 1fr));
      perspective: 90rem;
    }

    .card-shell {
      min-height: clamp(10rem, 16vw, 14rem);
      perspective: 90rem;
      transform-origin: 50% 70%;
      will-change: transform, opacity;
    }

    .card {
      display: block;
      min-height: inherit;
      perspective: 90rem;
    }

    .card-inner {
      min-height: inherit;
      position: relative;
      transform-style: preserve-3d;
      transition: transform 0.7s cubic-bezier(0.2, 0.8, 0.2, 1);
    }

    .card.is-flipped .card-inner {
      transform: rotateY(180deg);
    }

    .card-face {
      align-items: center;
      background:
        radial-gradient(circle at 18% 16%, rgba(var(--accent), 0.38), transparent 11rem),
        linear-gradient(145deg, rgba(15, 23, 42, 0.96), rgba(30, 41, 59, 0.8));
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
      border: 1px solid rgba(var(--accent), 0.34);
      border-radius: clamp(1.25rem, 3vw, 2rem);
      box-sizing: border-box;
      box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.22);
      color: #f8fafc;
      display: flex;
      flex-direction: column;
      font: inherit;
      gap: clamp(1rem, 2.5vw, 1.4rem);
      justify-content: center;
      min-height: inherit;
      overflow: hidden;
      padding: clamp(1.25rem, 3vw, 2rem);
      position: relative;
      text-align: center;
      width: 100%;
    }

    .card-front {
      appearance: none;
      -webkit-appearance: none;
      cursor: pointer;
    }

    .card-face::after {
      background: linear-gradient(90deg, rgba(var(--accent), 0), rgba(var(--accent), 0.78), rgba(var(--accent), 0));
      bottom: 0;
      content: '';
      height: 1px;
      left: 12%;
      position: absolute;
      width: 76%;
    }

    .card-back {
      align-items: stretch;
      background:
        radial-gradient(circle at 50% 35%, rgba(var(--accent), 0.42), transparent 13rem),
        linear-gradient(145deg, rgba(30, 41, 59, 0.96), rgba(15, 23, 42, 0.92));
      inset: 0;
      position: absolute;
      transform: rotateY(180deg);
    }

    .card:hover .card-face {
      border-color: rgba(var(--accent), 0.7);
    }

    .card-front:focus-visible,
    .card-link:focus-visible,
    .card-reset:focus-visible {
      border-color: rgba(var(--accent), 0.9);
      outline: 3px solid rgba(var(--accent), 0.4);
      outline-offset: 4px;
    }

    .card-icon {
      display: block;
      height: clamp(5rem, 12vw, 8.5rem);
      opacity: 0.96;
      width: clamp(5rem, 12vw, 8.5rem);
    }

    .card-icon-small {
      height: clamp(2rem, 5vw, 3.2rem);
      position: absolute;
      right: clamp(1rem, 2.5vw, 1.5rem);
      top: clamp(1rem, 2.5vw, 1.5rem);
      width: clamp(2rem, 5vw, 3.2rem);
    }

    .card-icon-mask {
      background: rgb(var(--accent));
      mask: var(--icon) center / contain no-repeat;
      -webkit-mask: var(--icon) center / contain no-repeat;
    }

    .card-icon-image {
      filter: drop-shadow(0 0.35rem 0.75rem rgba(0, 0, 0, 0.28));
      object-fit: contain;
    }

    .card-index {
      color: rgba(var(--accent), 0.86);
      font-size: 0.78rem;
      font-weight: 900;
      left: clamp(1rem, 2.5vw, 1.5rem);
      letter-spacing: 0.16em;
      position: absolute;
      top: clamp(1rem, 2.5vw, 1.5rem);
      text-transform: uppercase;
    }

    .card-title {
      font-size: clamp(1.65rem, 4vw, 3.1rem);
      font-weight: 900;
      letter-spacing: -0.06em;
      line-height: 0.92;
    }

    .card-back-content {
      align-items: center;
      display: grid;
      flex: 1;
      gap: 1rem;
      justify-items: center;
      padding: clamp(1rem, 3vw, 2.5rem) 0;
    }

    .card-link,
    .card-reset {
      appearance: none;
      -webkit-appearance: none;
      border: 1px solid rgba(var(--accent), 0.48);
      border-radius: 999px;
      color: #f8fafc;
      cursor: pointer;
      font-size: 0.78rem;
      font-weight: 900;
      letter-spacing: 0.14em;
      padding: 0.7rem 1rem;
      text-transform: uppercase;
    }

    .card-link {
      background: rgba(var(--accent), 0.18);
    }

    .card-reset {
      background: transparent;
      font-family: inherit;
    }

    .card-back-title {
      color: rgb(var(--accent));
      font-size: 0.78rem;
      font-weight: 900;
      letter-spacing: 0.14em;
      text-transform: uppercase;
    }

    .card-detail-list {
      display: grid;
      gap: 0.45rem;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .card-detail-list li {
      color: #e2e8f0;
      font-size: clamp(0.95rem, 2vw, 1.12rem);
      font-weight: 700;
      line-height: 1.25;
    }

    @media (max-width: 960px) {
      .card-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    @media (max-width: 640px) {
      .section {
        min-height: auto;
      }

      .card-grid {
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
        <p class="education">${profile.education}</p>
      </div>
      <div class="card-grid" aria-label="Personal interests and code profiles">
        ${aboutCardMarkup}
      </div>
    </div>
  </section>
`;

export class AboutSectionComponent extends HTMLElement {
  private context?: gsap.Context;
  private flipEvents?: AbortController;

  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true));
    }

    const root = this.shadowRoot;

    if (!root) {
      return;
    }

    const content = root.querySelector('.content');
    const cardGrid = root.querySelector('.card-grid');
    const cardShells = gsap.utils.toArray<HTMLElement>(root.querySelectorAll('.card-shell'));
    const cardFaces = gsap.utils.toArray<HTMLElement>(root.querySelectorAll('.card-face'));
    const flipButtons = gsap.utils.toArray<HTMLButtonElement>(root.querySelectorAll('.card-front'));
    const resetButtons = gsap.utils.toArray<HTMLButtonElement>(root.querySelectorAll('.card-reset'));

    if (!content || !cardGrid || cardShells.length === 0) {
      return;
    }

    this.flipEvents?.abort();
    const flipEvents = new AbortController();
    this.flipEvents = flipEvents;
    const setCardFlipped = (control: Element, isFlipped: boolean) => {
      const card = control.closest('.card');

      if (card instanceof HTMLElement) {
        card.classList.toggle('is-flipped', isFlipped);
      }
    };

    flipButtons.forEach(button => {
      button.addEventListener('click', () => setCardFlipped(button, true), { signal: flipEvents.signal });
    });

    resetButtons.forEach(button => {
      button.addEventListener('click', () => setCardFlipped(button, false), { signal: flipEvents.signal });
    });

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

      const growScrollTrigger = (): ScrollTrigger.Vars => ({
        end: 'top 45%',
        scrub: 1,
        start: 'top 125%',
        trigger: cardGrid,
      });

      gsap.fromTo(
        cardShells,
        {
          opacity: 0.2,
          rotateX: -18,
          scale: 0.36,
          y: 90,
        },
        {
          ease: 'none',
          opacity: 1,
          rotateX: 0,
          scale: 1,
          y: 0,
          scrollTrigger: growScrollTrigger(),
        },
      );

      gsap.to(cardFaces, {
        boxShadow: '0 2rem 5rem rgba(0, 0, 0, 0.34)',
        ease: 'none',
        scrollTrigger: growScrollTrigger(),
      });
    });
  }

  disconnectedCallback() {
    this.flipEvents?.abort();
    this.context?.revert();
  }
}

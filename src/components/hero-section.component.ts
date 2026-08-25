import { gsap } from 'gsap';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { profile } from '../data/cv';

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);

const nameMarkup = profile.name
  .split('')
  .map(character => `<span class="letter">${character === ' ' ? '&nbsp;' : character}</span>`)
  .join('');

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
    }

    .hero {
      align-items: center;
      background:
        linear-gradient(135deg, rgba(2, 6, 23, 0.82), rgba(15, 23, 42, 0.72)),
        url('/background.svg') center / cover no-repeat,
        linear-gradient(135deg, #020617 0%, #0f172a 52%, #111827 100%);
      color: #f8fafc;
      display: grid;
      min-height: 100svh;
      overflow: hidden;
      padding: clamp(2rem, 5vw, 5rem);
      position: relative;
    }

    .orb {
      aspect-ratio: 1;
      background: linear-gradient(135deg, rgba(45, 212, 191, 0.38), rgba(96, 165, 250, 0.16));
      border: 1px solid rgba(255, 255, 255, 0.18);
      border-radius: 999px;
      filter: blur(0.2px);
      position: absolute;
      right: min(8vw, 7rem);
      top: 13vh;
      width: clamp(11rem, 26vw, 28rem);
    }

    .content {
      max-width: 66rem;
      position: relative;
      z-index: 1;
    }

    .eyebrow {
      color: #67e8f9;
      font-size: clamp(0.8rem, 2vw, 1rem);
      font-weight: 800;
      letter-spacing: 0.26em;
      margin: 0 0 1.3rem;
      text-transform: uppercase;
    }

    h1 {
      display: flex;
      flex-wrap: wrap;
      font-size: clamp(4rem, 14vw, 11.5rem);
      letter-spacing: -0.08em;
      line-height: 0.84;
      margin: 0;
      max-width: 13ch;
      overflow: hidden;
      text-transform: uppercase;
    }

    .letter {
      display: inline-block;
      transform-origin: 50% 100%;
      will-change: transform, opacity;
    }

    .title {
      color: #e2e8f0;
      font-size: clamp(1.4rem, 4vw, 3.8rem);
      font-weight: 800;
      letter-spacing: -0.04em;
      margin: 1.6rem 0 1rem;
    }

    .summary {
      color: #cbd5e1;
      font-size: clamp(1.05rem, 2vw, 1.35rem);
      max-width: 54rem;
    }

    .scroll-prompt {
      align-items: center;
      bottom: clamp(1.5rem, 4vw, 3rem);
      color: #bae6fd;
      display: flex;
      font-weight: 800;
      gap: 0.75rem;
      left: clamp(2rem, 5vw, 5rem);
      letter-spacing: 0.08em;
      position: absolute;
      text-transform: uppercase;
      z-index: 1;
    }

    .arrow {
      border: 2px solid currentColor;
      border-left: 0;
      border-top: 0;
      display: inline-block;
      height: 0.85rem;
      transform: rotate(45deg);
      width: 0.85rem;
    }
  </style>
  <section class="hero" aria-labelledby="hero-title">
    <div class="orb"></div>
    <div class="content">
      <p class="eyebrow">Animated CV</p>
      <h1 id="hero-title">${nameMarkup}</h1>
      <p class="title">${profile.role}</p>
      <p class="summary">${profile.headline}</p>
    </div>
    <div class="scroll-prompt">
      <span>Scroll down for more info</span>
      <span class="arrow" aria-hidden="true"></span>
    </div>
  </section>
`;

export class HeroSectionComponent extends HTMLElement {
  private context?: gsap.Context;

  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true));
    }

    const root = this.shadowRoot;

    if (!root) {
      return;
    }

    const letters = root.querySelectorAll('.letter');
    const title = root.querySelector('.title');
    const summary = root.querySelector('.summary');
    const prompt = root.querySelector('.scroll-prompt');
    const orb = root.querySelector('.orb');

    this.context = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .from(letters, { duration: 0.9, opacity: 0, rotateX: -90, stagger: 0.025, yPercent: 120 })
        .from(title, { duration: 0.45, opacity: 0, y: 32 }, '-=0.35')
        .to(title, {
          duration: 1.2,
          scrambleText: {
            chars: 'upperAndLowerCase',
            revealDelay: 0.15,
            speed: 0.45,
            text: profile.role,
          },
        })
        .from(summary, { duration: 0.7, opacity: 0, y: 24 }, '-=0.35')
        .from(prompt, { duration: 0.6, opacity: 0, y: 18 }, '-=0.2');

      gsap.to(prompt, { duration: 0.9, ease: 'sine.inOut', repeat: -1, y: 10, yoyo: true });
      gsap.to(orb, {
        scale: 1.42,
        scrollTrigger: {
          end: 'bottom top',
          scrub: true,
          start: 'top top',
          trigger: this,
        },
      });
    });
  }

  disconnectedCallback() {
    this.context?.revert();
  }
}

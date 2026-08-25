import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experiences } from '../data/cv';

gsap.registerPlugin(ScrollTrigger);

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
    }

    .section {
      background: #f8fafc;
      color: #0f172a;
      min-height: 120svh;
      padding: clamp(4rem, 8vw, 8rem) clamp(1.25rem, 5vw, 5rem);
    }

    .intro {
      margin: 0 auto;
      max-width: 70rem;
    }

    .eyebrow {
      color: #2563eb;
      font-weight: 900;
      letter-spacing: 0.2em;
      margin: 0 0 0.75rem;
      text-transform: uppercase;
    }

    h2 {
      font-size: clamp(2.4rem, 7vw, 6.5rem);
      letter-spacing: -0.07em;
      line-height: 0.9;
      margin: 0;
    }

    .copy {
      color: #475569;
      font-size: clamp(1rem, 2vw, 1.25rem);
      max-width: 48rem;
    }

    .timeline {
      margin: clamp(3rem, 7vw, 6rem) auto 0;
      max-width: 75rem;
      position: relative;
    }

    .base-line,
    .progress-line {
      border-radius: 999px;
      bottom: 0;
      left: 50%;
      position: absolute;
      top: 0;
      transform: translateX(-50%);
      width: 0.35rem;
    }

    .base-line {
      background: #dbeafe;
    }

    .progress-line {
      background: linear-gradient(180deg, #0ea5e9, #8b5cf6, #f97316);
      transform: translateX(-50%) scaleY(0);
      transform-origin: top center;
      will-change: transform;
    }

    .timeline-item {
      display: grid;
      grid-template-columns: minmax(0, 1fr) 5rem minmax(0, 1fr);
      min-height: 22rem;
      position: relative;
    }

    .timeline-card {
      align-self: start;
      background: rgba(255, 255, 255, 0.86);
      border: 1px solid #dbeafe;
      border-radius: 1.5rem;
      box-shadow: 0 1.5rem 4rem rgba(15, 23, 42, 0.09);
      grid-column: 1;
      padding: clamp(1.25rem, 3vw, 2rem);
      text-align: right;
      will-change: transform, opacity;
    }

    .timeline-item.right .timeline-card {
      grid-column: 3;
      text-align: left;
    }

    .marker {
      align-self: start;
      background: #0f172a;
      border: 0.4rem solid #f8fafc;
      border-radius: 999px;
      box-shadow: 0 0 0 0.25rem #93c5fd;
      grid-column: 2;
      height: 1.2rem;
      justify-self: center;
      margin-top: 1.1rem;
      position: relative;
      width: 1.2rem;
      z-index: 1;
    }

    .years {
      color: #2563eb;
      font-size: 0.85rem;
      font-weight: 900;
      letter-spacing: 0.16em;
      text-transform: uppercase;
    }

    h3 {
      font-size: clamp(1.4rem, 2.5vw, 2rem);
      letter-spacing: -0.04em;
      line-height: 1;
      margin: 0.45rem 0;
    }

    .role,
    .project,
    .stack,
    .summary {
      margin: 0.35rem 0;
    }

    .role,
    .project {
      color: #334155;
      font-weight: 800;
    }

    .stack {
      color: #0f766e;
      font-weight: 800;
    }

    .summary {
      color: #475569;
    }

    ul {
      color: #334155;
      margin: 1rem 0 0;
      padding-left: 1.15rem;
      text-align: left;
    }

    @media (max-width: 760px) {
      .base-line,
      .progress-line {
        left: 0.75rem;
      }

      .timeline-item,
      .timeline-item.right {
        grid-template-columns: 1.5rem minmax(0, 1fr);
        min-height: auto;
        padding-bottom: 2rem;
      }

      .timeline-card,
      .timeline-item.right .timeline-card {
        grid-column: 2;
        text-align: left;
      }

      .marker {
        grid-column: 1;
      }
    }
  </style>
  <section class="section" aria-labelledby="career-title">
    <div class="intro">
      <p class="eyebrow">03 / Career</p>
      <h2 id="career-title">Career timeline</h2>
      <p class="copy">Scroll to draw the career line and reveal each company from alternating sides.</p>
    </div>
    <div class="timeline">
      <div class="base-line" aria-hidden="true"></div>
      <div class="progress-line" aria-hidden="true"></div>
      ${experiences
        .map(
          (experience, index) => `
            <article class="timeline-item ${index % 2 === 0 ? 'left' : 'right'}">
              <span class="marker" aria-hidden="true"></span>
              <div class="timeline-card">
                <span class="years">${experience.years}</span>
                <h3>${experience.company}</h3>
                <p class="role">${experience.role}</p>
                <p class="project">Project: ${experience.project}</p>
                <p class="stack">${experience.stack}</p>
                <p class="summary">${experience.summary}</p>
                <ul>
                  ${experience.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
                </ul>
              </div>
            </article>
          `
        )
        .join('')}
    </div>
  </section>
`;

export class CareerTimelineSectionComponent extends HTMLElement {
  private context?: gsap.Context;

  connectedCallback() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true));
    }

    const root = this.shadowRoot;

    if (!root) {
      return;
    }

    const section = root.querySelector('.section');
    const timeline = root.querySelector('.timeline');
    const progressLine = root.querySelector('.progress-line');
    const cards = Array.from(root.querySelectorAll<HTMLElement>('.timeline-card'));
    const markers = Array.from(root.querySelectorAll('.marker'));

    this.context = gsap.context(() => {
      gsap.to(progressLine, {
        ease: 'none',
        scaleY: 1,
        scrollTrigger: {
          end: 'bottom 48%',
          scrub: true,
          start: 'top 58%',
          trigger: section,
        },
      });

      cards.forEach(card => {
        const item = card.closest('.timeline-item');
        const fromX = item?.classList.contains('right') ? 130 : -130;

        gsap.from(card, {
          duration: 0.85,
          ease: 'power3.out',
          opacity: 0,
          scrollTrigger: {
            start: 'top 82%',
            toggleActions: 'play none none reverse',
            trigger: card,
          },
          x: fromX,
        });
      });

      gsap.from(markers, {
        opacity: 0,
        scale: 0,
        scrollTrigger: {
          end: 'bottom 50%',
          scrub: 0.5,
          start: 'top 64%',
          trigger: timeline,
        },
        stagger: 0.18,
      });
    });
  }

  disconnectedCallback() {
    this.context?.revert();
  }
}

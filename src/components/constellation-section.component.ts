import { Application, Graphics } from 'pixi.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const groupColors = {
  Industries: '#77cfff',
  Architecture: '#bd9aff',
  Engineering: '#7fe1c2',
  Leadership: '#ffc48b',
};

type Point = readonly [x: number, y: number];
type Layout = 'desktop' | 'mobile';
type Topic = Record<Layout, Point> & {
  group: keyof typeof groupColors;
  radius: number;
  description: string;
};

const topics = {
  Retail: {
    group: 'Industries',
    desktop: [180, 130],
    mobile: [63, 94],
    radius: 39,
    description: 'Point-of-sale systems, payments, offline resilience and operational reliability.',
  },
  Finance: {
    group: 'Industries',
    desktop: [520, 85],
    mobile: [172, 58],
    radius: 34,
    description: 'Transaction integrity, auditability, security and domain modelling.',
  },
  Cloud: {
    group: 'Industries',
    desktop: [835, 125],
    mobile: [280, 99],
    radius: 36,
    description: 'Cloud infrastructure, scalable services and platform engineering.',
  },
  EDA: {
    group: 'Architecture',
    desktop: [355, 210],
    mobile: [110, 198],
    radius: 31,
    description: 'Asynchronous messaging, decoupled services and event-driven workflows.',
  },
  DDD: {
    group: 'Architecture',
    desktop: [640, 195],
    mobile: [220, 177],
    radius: 30,
    description: 'Domain boundaries and business-focused modelling.',
  },
  CQRS: {
    group: 'Architecture',
    desktop: [490, 315],
    mobile: [168, 281],
    radius: 29,
    description: 'Separating read and write models where different needs justify the complexity.',
  },
  Microservices: {
    group: 'Architecture',
    desktop: [790, 320],
    mobile: [263, 353],
    radius: 39,
    description: 'Service boundaries, deployment independence and distributed-system trade-offs.',
  },
  Observability: {
    group: 'Engineering',
    desktop: [180, 350],
    mobile: [69, 356],
    radius: 39,
    description: 'Metrics, logs and tracing to understand systems in production.',
  },
  Reliability: {
    group: 'Engineering',
    desktop: [340, 405],
    mobile: [113, 477],
    radius: 34,
    description: 'Failure recovery, graceful degradation and resilient design.',
  },
  Scalability: {
    group: 'Engineering',
    desktop: [660, 405],
    mobile: [227, 487],
    radius: 33,
    description: 'Designing systems to handle growth while controlling complexity.',
  },
  Mentoring: {
    group: 'Leadership',
    desktop: [90, 255],
    mobile: [54, 263],
    radius: 31,
    description: 'Sharing technical knowledge and supporting other engineers.',
  },
  'Technical Direction': {
    group: 'Leadership',
    desktop: [900, 245],
    mobile: [284, 250],
    radius: 41,
    description: 'Making architectural decisions and aligning technical work with outcomes.',
  },
} as const satisfies Record<string, Topic>;

type TopicName = keyof typeof topics;
const topicNames = Object.keys(topics) as TopicName[];
const connections: readonly (readonly [TopicName, TopicName])[] = [
  ['Retail', 'EDA'],
  ['Retail', 'Observability'],
  ['Retail', 'Reliability'],
  ['Retail', 'Mentoring'],
  ['Finance', 'DDD'],
  ['Finance', 'CQRS'],
  ['Finance', 'EDA'],
  ['Cloud', 'Microservices'],
  ['Cloud', 'Scalability'],
  ['Cloud', 'Technical Direction'],
  ['EDA', 'CQRS'],
  ['EDA', 'Microservices'],
  ['DDD', 'CQRS'],
  ['Microservices', 'Scalability'],
  ['Observability', 'Reliability'],
  ['Mentoring', 'Technical Direction'],
];

const edgePath = ([x1, y1]: Point, [x2, y2]: Point) => `M${x1} ${y1} Q${(x1 + x2) / 2} ${(y1 + y2) / 2 - 10} ${x2} ${y2}`;

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
    }

    * {
      box-sizing: border-box;
    }

    .space {
      background:
        radial-gradient(ellipse at 24% 40%, #182450a6 0%, transparent 43%),
        radial-gradient(ellipse at 77% 55%, #371a58a0 0%, transparent 45%),
        linear-gradient(135deg, #020512, #0b1530 50%, #06071a);
      color: #eaf2ff;
      isolation: isolate;
      overflow: hidden;
      position: relative;
    }

    .space::after {
      background: radial-gradient(ellipse at center, transparent 45%, #02040c99);
      content: '';
      inset: 0;
      pointer-events: none;
      position: absolute;
      z-index: 1;
    }

    .starfield {
      inset: 0;
      pointer-events: none;
      position: absolute;
    }

    .starfield canvas {
      display: block;
    }

    .content {
      margin: 0 auto;
      max-width: 77.5rem;
      padding: clamp(2.75rem, 6vw, 4.4rem) clamp(0.75rem, 3vw, 1.5rem);
      position: relative;
      z-index: 2;
    }

    .heading {
      text-align: center;
    }

    .eyebrow {
      color: #91a9fa;
      font-size: 0.73rem;
      font-weight: 800;
      letter-spacing: 0.3em;
      margin: 0;
      text-transform: uppercase;
    }

    h2 {
      font-size: clamp(2.4rem, 5vw, 4.5rem);
      letter-spacing: -0.06em;
      line-height: 1;
      margin: 0.5rem 0;
    }

    .heading .intro {
      color: #a7b7d5;
      margin: 1rem auto;
      max-width: 38.75rem;
    }

    .map {
      display: block;
      height: auto;
      margin: 0 auto;
      max-width: 65.625rem;
      overflow: visible;
      width: 100%;
    }

    .edge {
      fill: none;
      opacity: 0.18;
      stroke: #8ca9f8;
      stroke-width: 1.2;
      transition: opacity 0.4s, stroke 0.4s, stroke-width 0.4s;
    }

    .edge.active {
      filter: drop-shadow(0 0 5px #67a7ff);
      opacity: 0.85;
      stroke: #a9d7ff;
      stroke-width: 2;
    }

    .node {
      cursor: pointer;
      outline: none;
      -webkit-tap-highlight-color: transparent;
    }

    .node .halo {
      opacity: 0.48;
      pointer-events: none;
      transform-box: fill-box;
      transform-origin: center;
      transition: opacity 0.45s, transform 0.45s;
    }

    .node text {
      fill: #f4f8ff;
      font-size: 12px;
      font-weight: 650;
      paint-order: stroke;
      pointer-events: none;
      stroke: #060b1b;
      stroke-linejoin: round;
      stroke-width: 3px;
      text-anchor: middle;
    }

    .node.active .halo {
      opacity: 0.85;
      transform: scale(1.12);
    }

    .node.related .halo {
      opacity: 0.64;
    }

    .node.active .core,
    .node:focus-visible .core {
      stroke-width: 3;
    }

    .node:focus-visible {
      opacity: 1;
    }

    .node:focus-visible .core {
      stroke: #fff;
    }

    .node.dim:not(:focus-visible) {
      opacity: 0.55;
    }

    .details {
      backdrop-filter: blur(14px);
      background: #0a1430b8;
      border: 1px solid #9bb4f333;
      border-radius: 20px;
      box-shadow: 0 15px 60px #0006;
      margin: 0 auto;
      max-width: 41.875rem;
      padding: 1.4rem 1.6rem;
    }

    .details .tag {
      color: #a7baff;
      font-size: 0.73rem;
      letter-spacing: 0.16em;
      text-transform: uppercase;
    }

    .details h3 {
      font-size: 1.5rem;
      margin: 0.5rem 0;
    }

    .details p {
      color: #c0cde7;
      line-height: 1.65;
      margin: 0.5rem 0;
    }

    .details small {
      color: #91a9cf;
    }

    @media (max-width: 760px) {
      .map {
        max-width: 26rem;
      }

      .details {
        padding: 1.2rem;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .edge,
      .node .halo {
        transition: none;
      }
    }
  </style>
  <section class="space" aria-labelledby="constellation-title">
    <div class="starfield" aria-hidden="true"></div>
    <div class="content">
      <div class="heading">
        <p class="eyebrow">03 / Experience &amp; Thinking</p>
        <h2 id="constellation-title">My Engineering Universe</h2>
        <p class="intro">Explore the industries, architecture patterns and principles that shape how I build software.</p>
      </div>
      <svg class="map" viewBox="0 0 1000 480" role="group" aria-label="Interactive knowledge constellation">
        <defs>
          ${Object.entries(groupColors)
            .map(
              ([group, color]) => `
                <radialGradient id="glow-${group}">
                  <stop offset="0%" stop-color="${color}" stop-opacity="0.22" />
                  <stop offset="25%" stop-color="${color}" stop-opacity="0.16" />
                  <stop offset="55%" stop-color="${color}" stop-opacity="0.085" />
                  <stop offset="80%" stop-color="${color}" stop-opacity="0.025" />
                  <stop offset="100%" stop-color="${color}" stop-opacity="0" />
                </radialGradient>
              `
            )
            .join('')}
        </defs>
        <g aria-hidden="true">
          ${connections.map(() => '<path class="edge" />').join('')}
        </g>
        ${topicNames
          .map(name => {
            const { group, radius } = topics[name];
            const color = groupColors[group];
            const label = name === 'Technical Direction' ? '<tspan x="0" dy="-7">Technical</tspan><tspan x="0" dy="14">Direction</tspan>' : name;

            return `
              <g class="node" role="button" tabindex="0" aria-label="${name}" aria-pressed="false">
                <g class="node-art" aria-hidden="true">
                  <circle class="halo" r="${radius + 64}" fill="url(#glow-${group})" />
                  <circle class="core" r="${radius}" fill="#0e1a37" stroke="${color}" stroke-width="1.5" />
                  <circle r="${Math.max(3, radius * 0.12)}" cy="${-radius * 0.53}" fill="${color}" />
                  <text y="5">${label}</text>
                </g>
              </g>
            `;
          })
          .join('')}
      </svg>
      <article class="details" aria-live="polite" aria-atomic="true">
        <div class="tag"></div>
        <h3></h3>
        <p></p>
        <small></small>
      </article>
    </div>
  </section>
`;

export class ConstellationSectionComponent extends HTMLElement {
  private connection?: AbortController;
  private motionAnimations?: gsap.MatchMedia;

  connectedCallback() {
    const root = this.shadowRoot ?? this.attachShadow({ mode: 'open' });
    if (!root.hasChildNodes()) {
      root.appendChild(template.content.cloneNode(true));
    }

    const { signal } = (this.connection = new AbortController());
    const map = root.querySelector<SVGSVGElement>('.map')!;
    const nodes = Array.from(map.querySelectorAll<SVGGElement>('.node'));
    const edges = Array.from(map.querySelectorAll<SVGPathElement>('.edge'));
    const details = root.querySelector<HTMLElement>('.details')!;
    const category = details.querySelector('.tag')!;
    const title = details.querySelector('h3')!;
    const description = details.querySelector('p')!;
    const relatedTopics = details.querySelector('small')!;
    const narrowViewport = window.matchMedia('(max-width: 760px)');

    const positionMap = () => {
      const layout: Layout = narrowViewport.matches ? 'mobile' : 'desktop';
      map.setAttribute('viewBox', layout === 'mobile' ? '0 0 344 540' : '0 0 1000 480');

      topicNames.forEach((name, index) => {
        const [x, y] = topics[name][layout];
        nodes[index].setAttribute('transform', `translate(${x} ${y})`);
      });
      connections.forEach(([from, to], index) => {
        edges[index].setAttribute('d', edgePath(topics[from][layout], topics[to][layout]));
      });
    };

    const select = (selected: TopicName) => {
      const connected = new Set<TopicName>();
      connections.forEach(([from, to], index) => {
        const isConnected = from === selected || to === selected;
        edges[index].classList.toggle('active', isConnected);
        if (isConnected) connected.add(from === selected ? to : from);
      });

      topicNames.forEach((name, index) => {
        const node = nodes[index];
        node.classList.toggle('active', name === selected);
        node.classList.toggle('related', connected.has(name));
        node.classList.toggle('dim', name !== selected && !connected.has(name));
        node.setAttribute('aria-pressed', String(name === selected));
      });

      category.textContent = topics[selected].group;
      title.textContent = selected;
      description.textContent = topics[selected].description;
      relatedTopics.textContent = `Connected: ${Array.from(connected).join(' · ')}`;
      ScrollTrigger.refresh(true);
    };

    topicNames.forEach((name, index) => {
      const node = nodes[index];
      node.addEventListener('click', () => select(name), { signal });
      node.addEventListener(
        'keydown',
        event => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            select(name);
          }
        },
        { signal }
      );
    });

    narrowViewport.addEventListener('change', positionMap, { signal });
    positionMap();
    select('Retail');

    this.motionAnimations = gsap.matchMedia();
    this.motionAnimations.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from(root.querySelector('.heading'), {
        duration: 1,
        opacity: 0,
        scrollTrigger: { trigger: this, start: 'top 80%' },
        y: 45,
      });
      gsap.from(details, {
        duration: 0.9,
        opacity: 0,
        scrollTrigger: { trigger: map, start: 'top 70%' },
        y: 30,
      });
      gsap.from(map.querySelectorAll('.node-art'), {
        clearProps: 'opacity,transform',
        duration: 0.9,
        ease: 'back.out(1.7)',
        opacity: 0,
        scale: 0.35,
        scrollTrigger: { trigger: map, start: 'top 82%' },
        stagger: 0.055,
        transformOrigin: 'center center',
      });
    });

    void this.initialiseStarfield(root.querySelector<HTMLElement>('.starfield')!, signal);
  }

  disconnectedCallback() {
    this.connection?.abort();
    this.motionAnimations?.revert();
  }

  private async initialiseStarfield(stage: HTMLElement, signal: AbortSignal) {
    const app = new Application();

    try {
      await app.init({
        antialias: true,
        autoDensity: true,
        autoStart: false,
        backgroundAlpha: 0,
        height: Math.max(1, stage.clientHeight),
        resolution: Math.min(window.devicePixelRatio || 1, 2),
        width: Math.max(1, stage.clientWidth),
      });
    } catch (error) {
      if (!signal.aborted) console.warn('Could not initialise the constellation starfield.', error);
      return;
    }

    if (signal.aborted) {
      app.destroy(true, true);
      return;
    }

    stage.appendChild(app.canvas);

    const { random } = gsap.utils;
    const stars = Array.from({ length: 90 }, () => {
      const star = new Graphics().circle(0, 0, random(0.9, 2.6)).fill(0xffffff);
      const brightness = random(0.48, 1);
      star.alpha = brightness * 0.65;
      app.stage.addChild(star);

      return { star, brightness, x: Math.random(), y: Math.random(), phase: random(0, Math.PI * 2), speed: random(0.8, 2.1) };
    });

    const resize = new ResizeObserver(() => {
      app.renderer.resize(Math.max(1, stage.clientWidth), Math.max(1, stage.clientHeight));
      stars.forEach(({ star, x, y }) => star.position.set(x * app.screen.width, y * app.screen.height));
      app.render();
    });
    resize.observe(stage);

    let time = 0;
    app.ticker.add(({ deltaTime }) => {
      time += 0.018 * deltaTime;
      stars.forEach(({ star, brightness, phase, speed }) => {
        const wave = (Math.sin(time * speed + phase) + 1) / 2;
        star.alpha = 0.28 + brightness * wave * 0.72;
        star.scale.set(0.8 + wave * 0.45);
      });
    });

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    const updateAnimation = () => {
      if (visible && !reducedMotion.matches) app.start();
      else app.stop();
    };
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      updateAnimation();
    });
    visibility.observe(this);
    reducedMotion.addEventListener('change', updateAnimation, { signal });

    signal.addEventListener(
      'abort',
      () => {
        resize.disconnect();
        visibility.disconnect();
        app.destroy(true, true);
      },
      { once: true }
    );
  }
}

import { Application, Assets, Container, Graphics, Sprite, Text, Texture } from 'pixi.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { technologies, type Technology } from '../data/cv';

gsap.registerPlugin(ScrollTrigger);

type BubbleView = {
  container: Container;
  floatingLayer: Container;
  radius: number;
  targetX: number;
  targetY: number;
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const placements = [
  { x: 0.2, y: 0.24 },
  { x: 0.45, y: 0.17 },
  { x: 0.72, y: 0.25 },
  { x: 0.31, y: 0.43 },
  { x: 0.58, y: 0.42 },
  { x: 0.84, y: 0.48 },
  { x: 0.15, y: 0.62 },
  { x: 0.42, y: 0.64 },
  { x: 0.68, y: 0.65 },
  { x: 0.87, y: 0.72 },
  { x: 0.27, y: 0.81 },
  { x: 0.53, y: 0.83 },
  { x: 0.76, y: 0.86 },
  { x: 0.08, y: 0.39 },
];

const mobilePlacements = [
  { x: 0.26, y: 0.14 },
  { x: 0.72, y: 0.16 },
  { x: 0.5, y: 0.28 },
  { x: 0.22, y: 0.38 },
  { x: 0.76, y: 0.4 },
  { x: 0.5, y: 0.5 },
  { x: 0.25, y: 0.59 },
  { x: 0.74, y: 0.6 },
  { x: 0.5, y: 0.69 },
  { x: 0.23, y: 0.77 },
  { x: 0.76, y: 0.79 },
  { x: 0.5, y: 0.88 },
  { x: 0.3, y: 0.95 },
  { x: 0.7, y: 0.96 },
];

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
        radial-gradient(circle at 18% 18%, rgba(191, 219, 254, 0.7), transparent 30rem),
        radial-gradient(circle at 82% 42%, rgba(221, 214, 254, 0.68), transparent 32rem),
        linear-gradient(180deg, #f8fafc 0%, #eef6ff 48%, #fdf2f8 100%);
      color: #0f172a;
      min-height: 100svh;
      overflow: hidden;
      padding: clamp(3rem, 5vw, 5rem) clamp(1.25rem, 5vw, 5rem);
    }

    .intro {
      margin: 0 auto 2rem;
      max-width: 70rem;
    }

    .eyebrow {
      color: #2563eb;
      font-weight: 800;
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

    .stage {
      height: min(58vh, 38rem);
      min-height: 26rem;
      position: relative;
      touch-action: pan-y;
    }

    .stage canvas {
      display: block;
      height: 100%;
      pointer-events: none;
      width: 100%;
    }

    .tech-list {
      display: grid;
      gap: 0.75rem;
      grid-template-columns: repeat(auto-fit, minmax(9rem, 1fr));
      list-style: none;
      margin: 1.5rem auto 0;
      max-width: 70rem;
      padding: 0;
    }

    .tech-list li {
      background: rgba(255, 255, 255, 0.72);
      border: 1px solid rgba(148, 163, 184, 0.18);
      border-radius: 999px;
      color: #334155;
      padding: 0.55rem 0.85rem;
      text-align: center;
    }

    @media (max-width: 700px) {
      .section {
        min-height: auto;
        padding-bottom: clamp(3rem, 10vw, 5rem);
      }

      .stage {
        height: min(52vh, 30rem);
        min-height: 24rem;
      }
    }
  </style>
  <section class="section" aria-labelledby="tech-title">
    <div class="intro">
      <p class="eyebrow">02 / Technology</p>
      <h2 id="tech-title">Years in the stack</h2>
    </div>
    <div class="stage" aria-hidden="true"></div>
  </section>
`;

export class TechBubblesSectionComponent extends HTMLElement {
  private app?: Application;
  private bubbleViews: BubbleView[] = [];
  private floatTweens: gsap.core.Tween[] = [];
  private resizeObserver?: ResizeObserver;
  private resizeFrame = 0;
  private scrollTimeline?: gsap.core.Timeline;
  private isDisconnected = false;

  connectedCallback() {
    this.isDisconnected = false;

    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true));
    }

    void this.initialisePixi();
  }

  disconnectedCallback() {
    this.isDisconnected = true;
    this.resizeObserver?.disconnect();

    if (this.resizeFrame) {
      cancelAnimationFrame(this.resizeFrame);
    }

    this.scrollTimeline?.kill();
    this.floatTweens.forEach(tween => tween.kill());
    this.app?.destroy(true, true);
    this.app = undefined;
    this.bubbleViews = [];
    this.floatTweens = [];
    this.scrollTimeline = undefined;
  }

  private async initialisePixi() {
    const root = this.shadowRoot;
    const stage = root?.querySelector<HTMLElement>('.stage');

    if (!stage || this.app) {
      return;
    }

    const { width, height } = this.getStageSize(stage);
    const app = new Application();

    await app.init({
      antialias: true,
      autoDensity: true,
      backgroundAlpha: 0,
      height,
      resolution: Math.min(window.devicePixelRatio || 1, 2),
      width,
    });

    const iconTextures = await Assets.load<Texture>(technologies.map(technology => technology.icon));

    if (this.isDisconnected) {
      app.destroy(true, true);
      return;
    }

    const canvas = app.canvas as HTMLCanvasElement;
    canvas.setAttribute('aria-hidden', 'true');
    stage.appendChild(canvas);
    this.app = app;

    technologies.forEach((technology, index) => {
      const bubbleView = this.createBubbleView(technology, iconTextures[technology.icon]);
      app.stage.addChild(bubbleView.container);
      this.bubbleViews.push(bubbleView);

      this.floatTweens.push(
        gsap.to(bubbleView.floatingLayer, {
          duration: 2.2 + (index % 4) * 0.3,
          ease: 'sine.inOut',
          repeat: -1,
          y: index % 2 === 0 ? -8 : 8,
          yoyo: true,
        })
      );
    });

    this.layoutBubbles();
    this.createScrollTimeline();

    this.resizeObserver = new ResizeObserver(() => {
      if (this.resizeFrame) {
        cancelAnimationFrame(this.resizeFrame);
      }

      this.resizeFrame = requestAnimationFrame(() => this.resizePixi());
    });
    this.resizeObserver.observe(stage);

    ScrollTrigger.refresh();
  }

  private createBubbleView(technology: Technology, texture: Texture): BubbleView {
    const radius = Math.max(40, Math.min(84, 29 + technology.years * 2.7));
    const container = new Container();
    const floatingLayer = new Container();
    const circle = new Graphics();
    const icon = new Sprite(texture);
    const label = new Text({
      style: {
        align: 'center',
        fill: 0x0f172a,
        fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
        fontSize: Math.max(10, Math.min(14, radius / 5.25)),
        fontWeight: '800',
        lineHeight: 16,
      },
      text: `${technology.name}\n${technology.years} yrs`,
    });

    circle.circle(0, 0, radius).fill({ alpha: 0.96, color: technology.color });

    icon.anchor.set(0.5);
    icon.height = radius * 0.62;
    icon.width = radius * 0.62;
    icon.y = -radius * 0.2;

    label.anchor.set(0.5);
    label.y = radius * 0.42;

    floatingLayer.addChild(circle, icon, label);
    container.addChild(floatingLayer);
    container.alpha = 0;
    container.scale.set(0.2);

    return { container, floatingLayer, radius, targetX: 0, targetY: 0 };
  }

  private layoutBubbles() {
    const app = this.app;

    if (!app) {
      return;
    }

    const width = app.screen.width;
    const height = app.screen.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const placementsForViewport = width <= 700 ? mobilePlacements : placements;

    this.bubbleViews.forEach((view, index) => {
      const placement = placementsForViewport[index % placementsForViewport.length];
      const horizontalPadding = view.radius + (width <= 700 ? 8 : 12);
      const verticalPadding = view.radius + (width <= 700 ? 28 : 54);

      view.targetX = clamp(placement.x * width, horizontalPadding, width - horizontalPadding);
      view.targetY = clamp(placement.y * height, verticalPadding, height - verticalPadding);

      if (!this.scrollTimeline) {
        view.container.x = centerX;
        view.container.y = centerY;
      }
    });
  }

  private createScrollTimeline() {
    const app = this.app;

    if (!app) {
      return;
    }

    this.scrollTimeline?.kill();

    const centerX = app.screen.width / 2;
    const centerY = app.screen.height / 2;
    const timeline = gsap.timeline({
      scrollTrigger: {
        end: 'bottom 55%',
        scrub: 1,
        start: 'top 90%',
        trigger: this,
      },
    });

    this.bubbleViews.forEach((view, index) => {
      const position = index * 0.045;

      timeline.fromTo(
        view.container,
        { alpha: 0, x: centerX, y: centerY },
        { alpha: 1, duration: 0.8, ease: 'power2.out', x: view.targetX, y: view.targetY },
        position
      );
      timeline.fromTo(view.container.scale, { x: 0.2, y: 0.2 }, { duration: 0.8, ease: 'back.out(1.6)', x: 1, y: 1 }, position);
    });

    this.scrollTimeline = timeline;
  }

  private resizePixi() {
    const stage = this.shadowRoot?.querySelector<HTMLElement>('.stage');

    if (!stage || !this.app) {
      return;
    }

    const { width, height } = this.getStageSize(stage);
    this.app.renderer.resize(width, height);
    this.layoutBubbles();
    this.createScrollTimeline();
    ScrollTrigger.refresh();
  }

  private getStageSize(stage: HTMLElement) {
    const rect = stage.getBoundingClientRect();

    return {
      height: Math.max(window.innerWidth <= 700 ? 360 : 420, Math.round(rect.height)),
      width: Math.max(320, Math.round(rect.width)),
    };
  }
}

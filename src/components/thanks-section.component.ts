import { Application, Container, Graphics } from 'pixi.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { profile } from '../data/cv';

gsap.registerPlugin(ScrollTrigger);

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
    }

    .section {
      align-items: center;
      background:
        radial-gradient(circle at 50% 20%, rgba(251, 146, 60, 0.22), transparent 28rem),
        linear-gradient(135deg, #111827, #020617);
      color: #f8fafc;
      display: grid;
      min-height: 100svh;
      overflow: hidden;
      padding: clamp(2rem, 6vw, 5rem);
      position: relative;
      text-align: center;
    }

    .fireworks-stage {
      inset: 0;
      pointer-events: none;
      position: absolute;
      z-index: 0;
    }

    .fireworks-stage canvas {
      display: block;
      height: 100%;
      mix-blend-mode: screen;
      width: 100%;
    }

    .content {
      margin: 0 auto;
      max-width: 55rem;
      position: relative;
      z-index: 1;
    }

    .eyebrow {
      color: #fdba74;
      font-weight: 900;
      letter-spacing: 0.2em;
      margin: 0 0 0.75rem;
      text-transform: uppercase;
    }

    h2 {
      font-size: clamp(3rem, 10vw, 9rem);
      letter-spacing: -0.08em;
      line-height: 0.85;
      margin: 0 0 1rem;
    }

    p {
      color: #cbd5e1;
      font-size: clamp(1rem, 2vw, 1.3rem);
      margin: 0 auto 2rem;
      max-width: 35rem;
    }

    .actions {
      align-items: center;
      display: flex;
      flex-wrap: nowrap;
      gap: clamp(1rem, 2vw, 1.5rem);
      justify-content: center;
      margin-bottom: 2rem;
      margin-top: clamp(2.5rem, 6vw, 4.5rem);
    }

    .action-link,
    button {
      background: #f8fafc;
      border: 0;
      border-radius: 999px;
      color: #020617;
      cursor: pointer;
      display: inline-block;
      font: inherit;
      font-weight: 900;
      padding: 0.9rem 1.4rem;
      text-decoration: none;
    }

    .action-link.secondary {
      background: rgba(248, 250, 252, 0.12);
      border: 1px solid rgba(248, 250, 252, 0.3);
      color: #f8fafc;
    }

    .actions .action-link {
      align-items: center;
      display: inline-flex;
      font-size: clamp(1.1rem, 2.2vw, 1.45rem);
      gap: 0.65rem;
      padding: clamp(1.1rem, 2.4vw, 1.5rem) clamp(1.9rem, 4vw, 2.75rem);
      white-space: nowrap;
    }

    .actions .material-icons-outlined {
      font-family: 'Material Icons Outlined', sans-serif;
      font-size: 1.6em;
      font-weight: 400;
      line-height: 1;
    }

    @media (max-width: 30rem) {
      .actions {
        flex-wrap: wrap;
      }
    }

    .action-link:focus-visible,
    button:focus-visible {
      outline: 0.25rem solid #fdba74;
      outline-offset: 0.25rem;
    }
  </style>
  <section class="section" aria-labelledby="thanks-title">
    <div class="fireworks-stage" aria-hidden="true"></div>
    <div class="content">
      <p class="eyebrow">05 / End</p>
      <h2 id="thanks-title">Thanks for scrolling</h2>    
      <div class="actions" aria-label="Contact links">
        <a class="action-link secondary" href="mailto:${profile.email}">
          <span class="material-icons-outlined" aria-hidden="true">email</span>
          Email Me
        </a>
        <a class="action-link secondary" href="${profile.printableCvUrl}" target="_blank" rel="noreferrer">
          <span class="material-icons-outlined" aria-hidden="true">print</span>
          Print Me
        </a>
      </div>
      <button type="button">Back to top</button>
    </div>
  </section>
`;

export class ThanksSectionComponent extends HTMLElement {
  private app?: Application;
  private context?: gsap.Context;
  private fireworksLayer?: Container;
  private fireworksTrigger?: ScrollTrigger;
  private isDisconnected = false;
  private isFireworksActive = false;
  private particleTweens: gsap.core.Tween[] = [];
  private queuedCalls: gsap.core.Tween[] = [];
  private resizeObserver?: ResizeObserver;
  private readonly backToTop = () => window.scrollTo({ behavior: 'smooth', top: 0 });
  private readonly launchFireworks = (event: PointerEvent) => {
    if (event.composedPath().some(target => target instanceof HTMLAnchorElement || target instanceof HTMLButtonElement)) {
      return;
    }

    const stage = this.shadowRoot?.querySelector<HTMLElement>('.fireworks-stage');

    if (!stage || !this.app) {
      return;
    }

    const bounds = stage.getBoundingClientRect();

    this.createFirework(event.clientX - bounds.left, event.clientY - bounds.top);
    this.spawnVolley(4);
  };

  connectedCallback() {
    this.isDisconnected = false;

    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true));
    }

    const root = this.shadowRoot;

    if (!root) {
      return;
    }

    const content = root.querySelector('.content');
    const button = root.querySelector('button');
    const section = root.querySelector<HTMLElement>('.section');
    const fireworksStage = root.querySelector<HTMLElement>('.fireworks-stage');

    button?.addEventListener('click', this.backToTop);
    section?.addEventListener('pointerdown', this.launchFireworks);

    this.context = gsap.context(() => {
      gsap.from(content, {
        duration: 0.9,
        ease: 'power3.out',
        opacity: 0,
        scrollTrigger: {
          start: 'top 72%',
          toggleActions: 'play none none reverse',
          trigger: this,
        },
        y: 50,
      });
    });

    if (fireworksStage) {
      void this.initialiseFireworks(fireworksStage);
    }
  }

  disconnectedCallback() {
    this.isDisconnected = true;
    this.stopFireworks();
    this.fireworksTrigger?.kill();
    this.resizeObserver?.disconnect();
    this.particleTweens.forEach(tween => tween.kill());
    this.app?.destroy(true, true);
    this.context?.revert();
    this.shadowRoot?.querySelector('button')?.removeEventListener('click', this.backToTop);
    this.shadowRoot?.querySelector<HTMLElement>('.section')?.removeEventListener('pointerdown', this.launchFireworks);
    this.app = undefined;
    this.fireworksLayer = undefined;
    this.particleTweens = [];
  }

  private async initialiseFireworks(stage: HTMLElement) {
    if (this.app) {
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

    if (this.isDisconnected) {
      app.destroy(true, true);
      return;
    }

    const canvas = app.canvas as HTMLCanvasElement;
    const layer = new Container();

    canvas.setAttribute('aria-hidden', 'true');
    stage.appendChild(canvas);
    app.stage.addChild(layer);

    this.app = app;
    this.fireworksLayer = layer;
    this.resizeObserver = new ResizeObserver(() => this.resizeFireworks(stage));
    this.resizeObserver.observe(stage);

    this.fireworksTrigger = ScrollTrigger.create({
      end: 'bottom top',
      onEnter: () => this.startFireworks(),
      onEnterBack: () => this.startFireworks(),
      onLeave: () => this.stopFireworks(),
      onLeaveBack: () => this.stopFireworks(),
      start: 'top bottom',
      trigger: this,
    });

    const bounds = this.getBoundingClientRect();

    if (bounds.top < window.innerHeight && bounds.bottom > 0) {
      this.startFireworks();
    }
  }

  private startFireworks() {
    if (this.isFireworksActive || !this.app) {
      return;
    }

    this.isFireworksActive = true;
    this.spawnVolley(7);
    this.scheduleNextVolley();
  }

  private stopFireworks() {
    this.isFireworksActive = false;
    this.queuedCalls.forEach(call => call.kill());
    this.queuedCalls = [];
  }

  private scheduleNextVolley() {
    if (!this.isFireworksActive) {
      return;
    }

    const delay = gsap.utils.random(0.65, 1.35);
    const call = gsap.delayedCall(delay, () => {
      this.queuedCalls = this.queuedCalls.filter(queuedCall => queuedCall !== call);

      if (!this.isFireworksActive) {
        return;
      }

      this.spawnVolley(gsap.utils.random(4, 7, 1));
      this.scheduleNextVolley();
    });

    this.queuedCalls.push(call);
  }

  private spawnVolley(count: number) {
    if (!this.app) {
      return;
    }

    for (let index = 0; index < count; index += 1) {
      const call = gsap.delayedCall(gsap.utils.random(0, 0.42), () => {
        this.queuedCalls = this.queuedCalls.filter(queuedCall => queuedCall !== call);
        this.createFirework();
      });

      this.queuedCalls.push(call);
    }
  }

  private createFirework(x?: number, y?: number) {
    const app = this.app;
    const layer = this.fireworksLayer;

    if (!app || !layer) {
      return;
    }

    const colors = [0x38bdf8, 0x5eead4, 0xa78bfa, 0xfb7185, 0xfacc15, 0xfdba74];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const originX = x ?? gsap.utils.random(app.screen.width * 0.14, app.screen.width * 0.86);
    const originY = y ?? gsap.utils.random(app.screen.height * 0.1, app.screen.height * 0.56);
    const flash = new Graphics();

    flash.circle(0, 0, 8).fill({ alpha: 0.35, color }).stroke({ alpha: 0.9, color: 0xffffff, width: 1 });
    flash.x = originX;
    flash.y = originY;
    flash.scale.set(0.4);
    layer.addChild(flash);

    const flashTween = gsap.to(flash, {
      alpha: 0,
      duration: 0.5,
      ease: 'power2.out',
      onComplete: () => {
        flash.destroy();
        this.particleTweens = this.particleTweens.filter(tween => tween !== flashTween);
      },
    });
    const flashScaleTween = gsap.to(flash.scale, {
      duration: 0.5,
      ease: 'power2.out',
      onComplete: () => {
        this.particleTweens = this.particleTweens.filter(tween => tween !== flashScaleTween);
      },
      x: 5,
      y: 5,
    });

    this.particleTweens.push(flashTween, flashScaleTween);

    const particleCount = gsap.utils.random(58, 96, 1);

    for (let index = 0; index < particleCount; index += 1) {
      const particle = new Graphics();
      const particleColor = Math.random() > 0.78 ? 0xffffff : color;
      const angle = (Math.PI * 2 * index) / particleCount + gsap.utils.random(-0.1, 0.1);
      const distance = gsap.utils.random(56, 178);
      const duration = gsap.utils.random(0.85, 1.65);
      const gravity = gsap.utils.random(44, 132);
      const size = gsap.utils.random(1.2, 3.1);

      particle.circle(0, 0, size).fill({ color: particleColor });
      particle.alpha = gsap.utils.random(0.72, 1);
      particle.x = originX;
      particle.y = originY;
      layer.addChild(particle);

      const targetX = originX + Math.cos(angle) * distance;
      const targetY = originY + Math.sin(angle) * distance + gravity;
      const tween = gsap.to(particle, {
        alpha: 0,
        duration,
        ease: 'power3.out',
        onComplete: () => {
          particle.destroy();
          this.particleTweens = this.particleTweens.filter(particleTween => particleTween !== tween);
        },
        x: targetX,
        y: targetY,
      });

      this.particleTweens.push(tween);
    }
  }

  private resizeFireworks(stage: HTMLElement) {
    const app = this.app;

    if (!app) {
      return;
    }

    const { width, height } = this.getStageSize(stage);
    app.renderer.resize(width, height);
  }

  private getStageSize(stage: HTMLElement) {
    const bounds = stage.getBoundingClientRect();

    return {
      height: Math.max(320, Math.round(bounds.height)),
      width: Math.max(320, Math.round(bounds.width)),
    };
  }
}

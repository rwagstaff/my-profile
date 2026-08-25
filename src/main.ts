import './style.css';

import { AboutSectionComponent } from './components/about-section.component.ts';
import { CareerTimelineSectionComponent } from './components/career-timeline-section.component.ts';
import { DrawCircleComponent } from './components/draw-circle.component.ts';
import { HeroSectionComponent } from './components/hero-section.component.ts';
import { HomeComponent } from './components/home.component.ts';
import { TechBubblesSectionComponent } from './components/tech-bubbles-section.component.ts';
import { ThanksSectionComponent } from './components/thanks-section.component.ts';

const defineElement = (name: string, constructor: CustomElementConstructor) => {
  if (!window.customElements.get(name)) {
    window.customElements.define(name, constructor);
  }
};

defineElement('home-component', HomeComponent);
defineElement('hero-section', HeroSectionComponent);
defineElement('tech-bubbles-section', TechBubblesSectionComponent);
defineElement('career-timeline-section', CareerTimelineSectionComponent);
defineElement('about-section', AboutSectionComponent);
defineElement('thanks-section', ThanksSectionComponent);
defineElement('draw-circle-component', DrawCircleComponent);

document.querySelector<HTMLDivElement>('#app')!.innerHTML = '<home-component></home-component>';

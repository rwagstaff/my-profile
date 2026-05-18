import { gsap } from 'gsap';

import html from './draw-circle.component.html?raw';
import { createTemplateAndAppend } from '../utils/utils.ts';


const template = document.createElement('template');
template.innerHTML = html;

export class DrawCircleComponent extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    let { root, $, all } = createTemplateAndAppend(html, this.shadowRoot as ShadowRoot);


    //const masterTl = gsap.timeline()

    gsap.to(all('.circle1'), {
      scale: 1.75,
      opacity: 0,
      duration: 2,
      stagger: {
        each: 0.5,
        repeat: -1,
      },
      transformOrigin: 'center',
    });

    // Create timeline

    // Define the animation sequence


    const action = gsap.timeline();
    const circle1 = $('#circle1');
    let $theGreenLine = $('#theGreenLine');
    action.set($theGreenLine, { drawSVG: '0%' });
    action.from($theGreenLine, { drawSVG: '0%' });
    action.to($theGreenLine, {
      drawSVG: '100%',
      visibility: 'visible',
      autoAlpha: 1,
      stroke: 'red',
      strokeWidth: 5,
      scrollTrigger: {
        trigger: $theGreenLine,
        start: 'clamp(top 40%)',
        end: 'clamp(bottom 30%)',
        scrub: true,
        toggleActions: 'restart pause resume pause',
        markers: true,
        onUpdate: (self) => {
          //console.log(self.progress);
          if (self.progress >= 0.2) {
            // Show circle if 10% drawn
            gsap.to(circle1, {
              scale: 1.75,
              opacity: 1,
              duration: 0.5,
              visibility: 'visible',
              transformOrigin: 'center',
            });
          } else {
            // Hide circle if less than 10% drawn
            gsap.to(circle1, {
              opacity: 0,
              duration: 0.5,
            });
          }

        }
      },

    });

    // action.to(circle1, {
    //   scale: 1.75,
    //   opacity: 1,
    //   duration: 2,
    //   visibility: 'visible',
    //   transformOrigin: 'center',
    // });


    // gsap.to(circle1, {
    //   scale: 1.75,
    //   opacity: 1,
    //   duration: 2,
    //   visibility: 'visible',
    //   transformOrigin: 'center',
    //
    // });

  }
}

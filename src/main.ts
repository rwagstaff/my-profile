import './style.css';

import { HomeComponent } from './components/home.component.ts';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
//import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { ScrollComponent } from './components/scroll.component.ts';
import { DrawCircleComponent } from './components/draw-circle.component.ts';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(DrawSVGPlugin);
gsap.registerPlugin(MorphSVGPlugin)
gsap.defaults({ease: 'none', duration: 2});


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div style="height: 100vh">
      Hello
  </div>
  
  <draw-circle-component></draw-circle-component>
`;

window.customElements.define('home-component', HomeComponent);
window.customElements.define('scroll-component', ScrollComponent);
window.customElements.define('draw-circle-component', DrawCircleComponent);

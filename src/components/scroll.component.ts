import {gsap} from "gsap";

import html from "./scroll.component.html?raw";
import { createTemplateAndAppend } from '../utils/utils.ts';




const template = document.createElement("template");
template.innerHTML = html;

export class ScrollComponent extends HTMLElement {
    connectedCallback() {
        this.attachShadow({mode: "open"});
        let root = createTemplateAndAppend(html, this.shadowRoot as ShadowRoot)

        const masterTl = gsap.timeline();






    }
}

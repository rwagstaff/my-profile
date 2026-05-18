import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import html from "./home.component.html?raw";


gsap.registerPlugin(ScrollTrigger);

const template = document.createElement("template");
template.innerHTML = html;

export class HomeComponent extends HTMLElement {
    connectedCallback() {
        this.attachShadow({mode: "open"});
        let root = this.shadowRoot as ShadowRoot;
        root.appendChild(template.content.cloneNode(true));
        const c = root.querySelector(".c");
        const ghost    = root.querySelector(".ghost");


        gsap.to(c, {
            scrollTrigger: {
                trigger: c,
                start: "top center",

                toggleActions: "restart pause resume pause",
                scrub: 1,
            },
            x: 500,
            rotation: 360,
            duration: 2,
        });

        // gsap.to(ghost, {
        //     scrollTrigger: {
        //         trigger: ghost,
        //         start: "top center",
        //         toggleActions: "restart pause resume pause",
        //         scrub: true,
        //     },
        //     x: 500,
        //     rotation: 360,
        //     duration: 2,
        // });


    }
}

import { LitElement } from "lit";
import { customElement } from "lit/decorators";

@customElement("lib-mouse-parallax")
export class LibMouseParallax extends LitElement {}

declare global {
  interface HTMLElementTagNameMap {
    "lib-mouse-parallax": LibMouseParallax;
  }
}

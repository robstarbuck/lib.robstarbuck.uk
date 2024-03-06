import { LitElement, html } from "lit";
import {
  customElement,
  property,
  queryAssignedElements,
} from "lit/decorators.js";
import { throttle } from "../../utils/throttle";
import { style } from "./style";

@customElement("lib-mouse-parallax")
export class LibMouseParallax extends LitElement {
  @property({ type: Number })
  speed = 0.25;

  @property({ type: String })
  foreground?: string;

  @property({ type: String })
  middleground?: string;

  @property({ type: String })
  background?: string;

  @queryAssignedElements({ selector: "svg" })
  svgElements!: Array<SVGSVGElement>;

  static styles = [style];

  svgViewPort?: { width: number; height: number };

  private _calculateTransform = (
    property: "width" | "height",
    xOrY: number,
  ) => {
    const svg = this.svgElements.at(0);
    if (!svg) {
      return 0;
    }
    const { [property]: widthOrHeight } = svg.getBoundingClientRect();
    if (this.svgViewPort) {
      const correction = this.svgViewPort[property] / widthOrHeight;
      return (xOrY - widthOrHeight / 2) * correction;
    }
    return xOrY - widthOrHeight / 2;
  };

  private _calculateXTransform = (x: number) => {
    return this._calculateTransform("width", x);
  };

  private _calculateYTransform = (x: number) => {
    return this._calculateTransform("height", x);
  };

  private _resetPosition = () => {
    this._throttleMove(0, 0);
  };

  private _throttleMove = throttle((x: number, y: number) => {
    this.style.setProperty("--mouse-x", `${x}`);
    this.style.setProperty("--mouse-y", `${y}`);
  }, 125);

  private _handleMouseMove = (e: MouseEvent) => {
    const x = this._calculateXTransform(e.offsetX);
    const y = this._calculateYTransform(e.offsetY);
    this._throttleMove(x, y);
  };

  private setTransform = (elements: NodeListOf<SVGElement>, value: string) => {
    elements.forEach((e) => {
      // Avoid distorting the svg, only set transform where absent
      if (window.getComputedStyle(e).transform === "none") {
        e.style.setProperty("transform", value);
        e.style.setProperty("transition", "transform 500ms");
      }
    });
  };

  protected firstUpdated(): void {
    const svg = this.svgElements.at(0);

    if (svg instanceof SVGSVGElement) {
      this.svgViewPort = svg.viewBox.baseVal;

      if (this.foreground || this.middleground || this.background) {
        this.style.setProperty("--speed", `${this.speed}`);
      }

      if (this.foreground) {
        this.setTransform(
          svg.querySelectorAll(this.foreground),
          "var(--set-foreground)",
        );
      }

      if (this.middleground) {
        this.setTransform(
          svg.querySelectorAll(this.middleground),
          "var(--set-middleground)",
        );
      }

      if (this.background) {
        this.setTransform(
          svg.querySelectorAll(this.background),
          "var(--set-background)",
        );
      }

      svg.addEventListener("mouseenter", () => {
        svg.addEventListener("mousemove", this._handleMouseMove);
      });
      svg.addEventListener("mouseleave", () => {
        svg.removeEventListener("mousemove", this._handleMouseMove);
        this._resetPosition();
      });
    }
  }

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "lib-mouse-parallax": LibMouseParallax;
  }
}

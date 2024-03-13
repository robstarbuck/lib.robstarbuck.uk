import { LitElement, html } from "lit";
import {
  customElement,
  property,
  queryAssignedElements,
} from "lit/decorators.js";
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

  easing = 0;

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

  private _preventTransition = () => {
    this.style.setProperty("--animation", "none");
  };

  private _addTransition = () => {
    this.style.setProperty("--animation", "transform 500ms");
  };

  private _resetPosition = () => {
    this.easing = 0;
    this._addTransition();
    this._Move(0, 0);
  };

  private _Move = (x: number, y: number) => {
    this.style.setProperty("--mouse-x", `${x}`);
    this.style.setProperty("--mouse-y", `${y}`);
  };

  private isTouchEvent = (e: MouseEvent | TouchEvent): e is TouchEvent => {
    return "TouchEvent" in window && e instanceof TouchEvent;
  };

  private _eventXY = (e: MouseEvent | TouchEvent) => {
    if (this.isTouchEvent(e)) {
      const { clientX, clientY } = e.touches[0];
      if (e.target instanceof SVGElement) {
        const svg = e.target.closest("svg");
        if (svg) {
          // Corrects x and y relative to page position
          const { top, left } = svg.getBoundingClientRect();
          return { x: clientX - left, y: clientY - top };
        }
      }
      return { x: clientX, y: clientY };
    }
    return { x: e.offsetX, y: e.offsetY };
  };

  private _handleMove = (e: MouseEvent | TouchEvent) => {
    const { x: eventX, y: eventY } = this._eventXY(e);

    const x = this._calculateXTransform(eventX);
    const y = this._calculateYTransform(eventY);

    // Ease in the movement, prevents positions snapping
    const easedX = x * this.easing;
    const easedY = y * this.easing;

    this.easing = this.easing < 1 ? this.easing + 0.1 : 1;
    this._Move(easedX, easedY);
  };

  private setTransform = (elements: NodeListOf<SVGElement>, value: string) => {
    elements.forEach((e) => {
      // Avoid distorting the svg, only set transform where absent
      if (window.getComputedStyle(e).transform === "none") {
        e.style.setProperty("transform", value);
        e.style.setProperty("transition", "var(--animation)");
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

      // Mouse Events
      svg.addEventListener("mouseenter", this._preventTransition);
      svg.addEventListener("mousemove", this._handleMove);
      svg.addEventListener("mouseleave", this._resetPosition);

      // Touch Events
      svg.addEventListener("touchstart", this._preventTransition);
      svg.addEventListener("touchmove", this._handleMove);
      svg.addEventListener("touchend", this._resetPosition);
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

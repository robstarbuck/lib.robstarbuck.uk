import { LitElement, css, html } from "lit";
import {
  customElement,
  property,
  queryAssignedElements,
} from "lit/decorators.js";
import { throttle } from "../../utils/throttle";

@customElement("lib-mouse-fx")
export class LibMouseFx extends LitElement {
  svgViewPort?: { width: number; height: number };

  @property({ type: Number, reflect: true })
  mouseX = 0;

  static styles = [
    css`
      :host {
        display: block;
        --set-foreground: matrix(
          1,
          0,
          0,
          1,
          calc(var(--mouse-x, 0) * 1),
          calc(var(--mouse-y, 0) * 1)
        );
        --set-middleground: matrix(
          1,
          0,
          0,
          1,
          calc(var(--mouse-x, 0) * 0.75),
          calc(var(--mouse-y, 0) * 0.75)
        );
        --set-background: matrix(
          1,
          0,
          0,
          1,
          calc(var(--mouse-x, 0) * -0.5),
          calc(var(--mouse-y, 0) * -0.5)
        );
      }
    `,
  ];

  @queryAssignedElements({ selector: "svg" })
  svgElements!: Array<Element>;

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
      return xOrY * correction - widthOrHeight / 2;
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

  protected firstUpdated(): void {
    const svg = this.svgElements.at(0);
    if (svg instanceof SVGSVGElement) {
      this.svgViewPort = svg.viewBox.baseVal;

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
    "lib-mouse-fx": LibMouseFx;
  }
}

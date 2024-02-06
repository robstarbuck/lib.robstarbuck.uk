import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

/** Common element container
 * Useful for bringing elements to the fore
 *
 * @slot - Main
 * @slot image - An to be included, accessible with ::part(image)
 *
 * @csspart card - Outer wrapper
 * @csspart image - Image if included
 * @csspart contents - Contents, useful for adjusting padding
 */

@customElement("wbl-card")
export class WblCard extends LitElement {
  /**
   * @attr interactive
   */
  @property({ type: Boolean, reflect: true })
  interactive = false;

  static styles = [];

  render() {
    return html`
      <div part="card" class="wrapper">
        <slot part="image" name="image"></slot>
        <section part="contents">
          <slot></slot>
        </section>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    ["wbl-card"]: WblCard;
  }
}

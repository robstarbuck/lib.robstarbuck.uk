import { css } from "lit";

export const style = css`
  :host {
    display: block;
    --set-foreground: translate(
      calc(1px * var(--mouse-x, 0) * var(--speed)),
      calc(1px * var(--mouse-y, 0) * var(--speed))
    );
    --set-middleground: translate(
      calc(0.75px * var(--mouse-x, 0) * var(--speed)),
      calc(0.75px * var(--mouse-y, 0) * var(--speed))
    );
    --set-background: translate(
      calc(0.25px * var(--mouse-x, 0) * var(--speed)),
      calc(0.25px * var(--mouse-y, 0) * var(--speed))
    );
  }
`;

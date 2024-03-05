import { css } from "lit";

export const style = css`
  :host {
    display: block;
    --set-foreground: matrix(
      1,
      0,
      0,
      1,
      calc(var(--mouse-x, 0) * 1 * var(--speed, 0.25)),
      calc(var(--mouse-y, 0) * 1 * var(--speed, 0.25))
    );
    --set-middleground: matrix(
      1,
      0,
      0,
      1,
      calc(var(--mouse-x, 0) * 0.75 * var(--speed, 0.25)),
      calc(var(--mouse-y, 0) * 0.75 * var(--speed, 0.25))
    );
    --set-background: matrix(
      1,
      0,
      0,
      1,
      calc(var(--mouse-x, 0) * 0.5 * var(--speed, 0.25)),
      calc(var(--mouse-y, 0) * 0.5 * var(--speed, 0.25))
    );
  }
`;

import { LitElement } from "lit";
export declare class LibMouseFx extends LitElement {
    svgViewPort?: {
        width: number;
        height: number;
    };
    mouseX: number;
    static styles: import("lit").CSSResult[];
    svgElements: Array<Element>;
    private _calculateTransform;
    private _calculateXTransform;
    private _calculateYTransform;
    private _resetPosition;
    private _throttleMove;
    private _handleMouseMove;
    protected firstUpdated(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "lib-mouse-fx": LibMouseFx;
    }
}

import { LitElement } from "lit";
export declare class LibMouseParallax extends LitElement {
    svgViewPort?: {
        width: number;
        height: number;
    };
    speed: number;
    foreground?: string;
    middleground?: string;
    background?: string;
    static styles: import("lit").CSSResult[];
    svgElements: Array<Element>;
    private _calculateTransform;
    private _calculateXTransform;
    private _calculateYTransform;
    private _resetPosition;
    private _throttleMove;
    private _handleMouseMove;
    private setTransform;
    protected firstUpdated(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "lib-mouse-parallax": LibMouseParallax;
    }
}

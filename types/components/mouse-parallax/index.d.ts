import { LitElement } from "lit";
export declare class LibMouseParallax extends LitElement {
    speed: number;
    foreground?: string;
    middleground?: string;
    background?: string;
    svgElements: Array<SVGSVGElement>;
    static styles: import("lit").CSSResult[];
    svgViewPort?: {
        width: number;
        height: number;
    };
    easing: number;
    private _calculateTransform;
    private _calculateXTransform;
    private _calculateYTransform;
    private _preventTransition;
    private _addTransition;
    private _resetPosition;
    private _Move;
    private isTouchEvent;
    private _eventXY;
    private _handleMove;
    private setTransform;
    protected firstUpdated(): void;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "lib-mouse-parallax": LibMouseParallax;
    }
}

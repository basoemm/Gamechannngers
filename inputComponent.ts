import { LitElement, TemplateResult, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
 
@customElement("input-component")
export class InputComponent extends LitElement {
    @property({ type: String }) public label: string = "";
    @property({ type: String }) public type: string = "text";
    @property({ type: String }) public name: string = "";
    @property({ type: String }) public value: string = "";
    @property({ type: String }) public min: string = "";
    @property({ type: String }) public step: string = "";
 
   
    public static styles = css`
        /* Je stijlen hier Ibti*/
    `;
 
    public render(): TemplateResult {
        return html`
            <label>${this.label}:
                ${this.type === "textarea"
                    ? html`<textarea name="${this.name}" .value="${this.value}" @input="${this.handleInput}"></textarea>`
                    : html`<input type:string="${this.type}" name="${this.name}" .value="${this.value}" min="${this.min}" step:string="${this.step}" @input="${this.handleInput}" />`}
            </label>
        `;
    }
 
    private handleInput(event: Event): void {
        const target: HTMLInputElement | HTMLTextAreaElement = event.target as HTMLInputElement | HTMLTextAreaElement;
        this.value = target.value;
        this.dispatchEvent(new CustomEvent("value-changed", { detail: this.value, bubbles: true, composed: true }));
    }
}
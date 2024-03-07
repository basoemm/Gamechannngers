import { LitElement, html, css, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import "./inputComponent";
import { GameObjectFormResult } from "@shared/gameObjectFormResult";
import {addGameObject} from "../services/routeService";
 
@customElement("gameobject-form")
export class GameObjectForm extends LitElement {
    @state() private selectedType: string = "Item";
    @state() private alias: string = "";
    @state() private name: string = "";
    @state() private description: string = "";
    @state() private price: number = 0;
    @state() private hp: number = 0;
    @state() private message: string = "";
@state() private isSuccess: boolean | null = null;
 
 
    public static styles = css`
        .hidden {
            display: none;
        }
        .message-success {
        color: green;
    }
    .message-error {
        color: red;
    }
    `;
 
    public render(): TemplateResult {
        return html`
          ${this.isSuccess !== null ? html`
            <div class=${this.isSuccess ? "message-success" : "message-error"}>
                ${this.message}
            </div>
        ` : ""}
            <form id="gameObjectForm">
                <input-component label="Alias" name="alias" @value-changed="${(e: CustomEvent): string => this.alias = e.detail}"></input-component>
                <input-component label="Name" name="name" @value-changed="${(e: CustomEvent): string => this.name = e.detail}"></input-component>
                <input-component label="Description" name="description" type="textarea" @value-changed="${(e: CustomEvent): string => this.description = e.detail}"></input-component>
               
                <label>Type:
                    <select @change="${this.handleTypeChange}" name="type">
                        <option value="Item" ?selected="${this.selectedType === "Item"}">Item</option>
                        <option value="Room" ?selected="${this.selectedType === "Room"}">Room</option>
                        <option value="Character" ?selected="${this.selectedType === "Character"}">Character</option>
                    </select>
                </label>
               
                <input-component label="Price" name="price" type="number" min="0" step="0.01" .value="${this.price.toString()}" class="${this.selectedType === "Item" ? "" : "hidden"}" @value-changed="${(e: CustomEvent):number => this.price = Number(e.detail)}"></input-component>
                <input-component label="HP" name="hp" type="number" min="0" step="1" .value="${this.hp.toString()}" class="${this.selectedType === "Character" ? "" : "hidden"}" @value-changed="${(e: CustomEvent):number => this.hp = Number(e.detail)}"></input-component>
               
                <button type="button" @click="${this.handleSubmit}">Add ${this.selectedType}</button>
            </form>
        `;
    }
 
    public handleTypeChange(event: Event): void {
        const select: HTMLSelectElement = event.target as HTMLSelectElement;
        this.selectedType = select.value;
    }
 
 
public handleSubmit(): void {
    const formData: GameObjectFormResult = {
        alias: this.alias,
        name: this.name,
        description: this.description,
        type: this.selectedType,
        price: this.selectedType === "Item" ? this.price : undefined,
        hp: this.selectedType === "Character" ? this.hp : undefined,
    };
 
    addGameObject(formData).then(success => {
        if (success) {
            this.message = "Adding a gameobject was succesfull";
            this.isSuccess = true;
        } else {
            this.message = "Error! make sure all fields are filled";
            this.isSuccess = false;
        }
    }).catch(error => {
        console.error("An error occurred while communicating with the API:", error);
    });
}
 
 
}
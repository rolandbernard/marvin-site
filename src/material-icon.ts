
import { customElement, html, css, LitElement, property } from 'lit-element';

@customElement('material-icon')
export class MaterialIcon extends LitElement {

    @property()
    name: string = '';

    static get styles() {
        return css`
            :host {
                font-family: 'Material Icons Outlined';
                font-weight: normal;
                font-style: normal;
                line-height: 1;
                letter-spacing: normal;
                text-transform: none;
                display: inline-block;
                white-space: nowrap;
                word-wrap: normal;
                direction: ltr;
                -webkit-font-feature-settings: 'liga';
                -webkit-font-smoothing: antialiased;
            }
        `;
    }

    render() {
        return html`${this.name}`;
    }
}


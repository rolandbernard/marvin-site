
import { customElement, html, css, LitElement, property } from 'lit-element';

import Github from 'assets/icons/github.svg';
import Marvin from 'assets/icons/marvin.svg';

const ICONS = {
    'github': Github,
    'marvin': Marvin,
};

@customElement('material-icon')
export class MaterialIcon extends LitElement {

    @property()
    name: string = '';

    static get styles() {
        return css`
            :host {
                display: contents;
            }
            .material-icons {
                display: contents;
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
            .image {
                pointer-events: none;
                max-width: 1em;
                max-height: 1em;
            }
        `;
    }

    render() {
        if (this.name in ICONS) {
            return html`
                <img class="image" src="${ICONS[this.name as keyof typeof ICONS]}"/>
            `;
        } else {
            return html`
                <span class="material-icons">${this.name}</span>
            `;
        }
    }
}


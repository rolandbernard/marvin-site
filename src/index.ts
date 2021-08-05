
import { customElement, html, css, LitElement } from 'lit-element';

@customElement('page-root')
export class PageRoot extends LitElement {

    static get styles() {
        return css`
        `;
    }

    render() {
        return html`
            <div class="window">
                Hello world
            </div>
        `;
    }
}



import { customElement, html, css, LitElement } from 'lit-element';

import Logo from 'images/logo.svg';

@customElement('page-header')
export class PageHeader extends LitElement {

    static get styles() {
        return css`
        `;
    }

    render() {
        return html`
            <div class="header">
                <div>
                    <img class src="${Logo}" />
                </div>
                <nav class="nav">
                </nav>
            </div>
        `;
    }
}


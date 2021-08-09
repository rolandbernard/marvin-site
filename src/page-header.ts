
import { customElement, html, css, LitElement } from 'lit-element';

import Logo from 'images/logo.svg';

@customElement('page-header')
export class PageHeader extends LitElement {

    static get styles() {
        return css`
            .header {
                display: flex;
                flex-flow: row;
                justify-content: space-between;
            }
            .info {
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                padding: 1.5rem 3rem 0;
            }
            .logo {
                width: 5rem;
                height: 5rem;
            }
            .text {
                margin: 1.5rem;
            }
            .name {
                font-size: 1.5rem;
                font-weight: bold;
                margin-bottom: 0.25rem;
            }
            .desc {
                color: #ffffffa0;
            }
        `;
    }

    render() {
        return html`
            <div class="header">
                <div class="info">
                    <img class="logo" src="${Logo}" />
                    <div class="text">
                        <div class="name">Marvin</div>
                        <div class="desc">An app launcher for Linux and Windows</div>
                    </div>
                </div>
                <nav class="nav">
                </nav>
            </div>
        `;
    }
}


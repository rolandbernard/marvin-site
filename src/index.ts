
import { customElement, html, css, LitElement } from 'lit-element';

import 'page-header';
import 'page-footer';
import 'switch-route';

import 'index.css';

@customElement('page-root')
export class PageRoot extends LitElement {

    static get styles() {
        return css`
            .page {
                display: flex;
                flex-flow: column;
                color: white;
                min-height: 100%;
            }
            .header, .footer {
                flex: 0 0 auto;
            }
            .content {
                flex: 1 1 auto;
                height: 100%;
            }
        `
    }

    render() {
        return html`
            <div class="page">
                <page-header class="header"></page-header>
                <div class="content">
                    <switch-route .routes="${[
                        { route: '#/?download/?', component: html`Download` },
                        { route: '#/?features/?', component: html`Features` },
                        { component: html`Hello World` }
                    ]}"></switch-route>
                </div>
                <page-footer class="footer"></page-footer>
            </div>
        `;
    }
}


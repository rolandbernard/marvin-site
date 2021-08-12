
import { customElement, html, css, LitElement } from 'lit-element';

import 'components/page-header';
import 'components/page-footer';
import 'components/switch-route';

import 'pages/main-page';
import 'pages/download-page';
import 'pages/features-page';

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
                max-width: 1200px;
                margin: auto;
            }
            .header, .footer {
                flex: 0 0 auto;
            }
            .content {
                flex: 1 1 auto;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        `
    }

    render() {
        return html`
            <div class="page">
                <page-header class="header"></page-header>
                <div class="content">
                    <switch-route .routes="${[
                        { route: '#/?download(/.*)?', component: html`<download-page></download-page>` },
                        { route: '#/?features(/.*)?', component: html`<features-page></features-page>` },
                        { component: html`<main-page></main-page>` }
                    ]}"></switch-route>
                </div>
                <page-footer class="footer"></page-footer>
            </div>
        `;
    }
}


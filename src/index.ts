
import { customElement, html, css } from 'lit-element';

import { Router } from 'components/router';

import 'components/page-header';
import 'components/page-footer';

import 'pages/main-page';
import 'pages/download-page';
import 'pages/features-page';

import 'index.css';

@customElement('page-root')
export class PageRoot extends Router {

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
            }
        `
    }

    render() {
        return html`
            <div class="page">
                <page-header class="header"></page-header>
                <div class="content">
                    ${
                        this.isRouteActive('#/?download(/.*)?')
                            ? html`<download-page></download-page>`
                        : this.isRouteActive('#/?features(/.*)?')
                            ? html`<features-page></features-page>`
                            : html`<main-page></main-page>`
                    }
                </div>
                <page-footer class="footer"></page-footer>
            </div>
        `;
    }
}


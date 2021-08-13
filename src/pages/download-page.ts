
import { customElement, html, css, LitElement, property } from 'lit-element';
import { until } from 'lit-html/directives/until';

import 'components/material-icon';

const API_URL = 'https://api.github.com/repos/rolandbernard/marvin/releases/latest';
const DOWNLOAD_URL = 'https://github.com/rolandbernard/marvin/releases/download';

@customElement('download-button')
export class DownloadButton extends LitElement {

    @property()
    text: string = '';

    @property()
    href: string = '';

    static get styles() {
        return css`
            .link {
                color: white;
                text-decoration: none;
                padding: 0.75rem;
                display: flex;
                align-items: center;
                user-select: none;
                transition: var(--transition);
                transition-property: opacity;
                position: relative;
                margin: 0.5rem;
                transition: var(--transition);
                transition-property: background;
                background: #2f363f;
                justify-content: center;
            }
            .link:hover {
                background: #2b323a;
            }
            .icon, .name {
                transition: var(--transition);
                transition-property: opacity;
                opacity: 0.625;
            }
            .icon {
                font-size: 1.25rem;
            }
            .name {
                margin-left: 0.25rem;
                font-size: 0.85rem;
            }
            .link:hover .icon, .link:hover .name {
                opacity: 0.9;
            }
        `;
    }

    render() {
        return html`
            <a class="link" href="${this.href}" ondragstart="return false" @click="${() => this.requestUpdate()}">
                <material-icon class="icon" name="download"></material-icon>
                <span class="name">
                    ${this.text}
                </span>
            </a>
        `;
    }
}

@customElement('download-page')
export class DownloadPage extends LitElement {

    static get styles() {
        return css`
            :host {
                display: flex;
                justify-content: center;
                align-items: center;
                flex-flow: column;
                align-items: center;
                width: 100%;
                overflow: hidden;
            }
            .error {
                color: white;
                opacity: 0.625;
            }
            .link {
                margin: 0.5rem;
                color: white;
                transition: var(--transition);
                transition-property: opacity;
                opacity: 0.75;
            }
            .link:hover {
                opacity: 0.9;
            }
            .loading {
                animation: rotate 600ms infinite linear;
                width: 5rem;
                height: 5rem;
                fill: none;
                stroke: white;
                stroke-width: 6px;
                stroke-linecap: round;
                transform-origin: 50% 50%;
                opacity: 0.625;
            }
            @keyframes rotate {
                0% {
                    transform: rotate(0deg);
                }
                100% {
                    transform: rotate(360deg);
                }
            }
            .info {
                display: flex;
                flex-flow: column;
                align-items: center;
                opacity: 0.8;
            }
            .info > div {
                margin: 0.25rem;
            }
            .info strong {
                font-weight: bold;
            }
            .downloads {
                margin-bottom: 1rem;
                display: flex;
                flex-flow: row nowrap;
                align-items: stretch;
                justify-content: center;
            }
            .download {
                display: flex;
                flex-flow: column;
                align-items: center;
                justify-content: center;
                margin: 1rem 3rem;
            }
            .title {
                font-size: 1.5rem;
                font-weight: bold;
                color: white;
                opacity: 0.8;
            }
            .logo {
                width: 7rem;
                height: 7rem;
                font-size: 7rem;
                text-align: center;
                opacity: 0.625;
                margin: 2rem;
            }
            .separator {
                width: 2px;
                background: white;
                opacity: 0.5;
            }
            @media screen and (max-width: 750px) {
                .download {
                    margin: 1rem 2rem;
                }
            }
            @media screen and (max-width: 600px) {
                .download {
                    margin: 1rem 1rem;
                }
            }
            @media screen and (max-width: 400px) {
                .download {
                    margin: 1rem 0;
                }
            }
        `
    }

    async releaseInfo() {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            const version = data.tag_name?.substr(1);
            const published = new Date(data.published_at);
            return html`
                <div class="downloads">
                    <div class="download">
                        <div class="title">Linux</div>
                        <div class="logo">
                            <material-icon name="linux"></material-icon>
                        </div>
                        <div class="buttons">
                            <download-button
                                text=".AppImage"
                                href="${`${DOWNLOAD_URL}/v${version}/Marvin-${version}.AppImage`}"
                            ></download-button>
                            <download-button
                                text="Portable (.zip)"
                                href="${`${DOWNLOAD_URL}/v${version}/marvin-${version}.zip`}"
                            ></download-button>
                        </div>
                    </div>
                    <div class="separator"></div>
                    <div class="download">
                        <div class="title">Windows</div>
                        <div class="logo">
                            <material-icon name="windows"></material-icon>
                        </div>
                        <div class="buttons">
                            <download-button
                                text="Installer (.exe)"
                                href="${`${DOWNLOAD_URL}/v${version}/Marvin-Setup-${version}.exe`}"
                            ></download-button>
                            <download-button
                                text="Portable (.zip)"
                                href="${`${DOWNLOAD_URL}/v${version}/Marvin-${version}-win.zip`}"
                            ></download-button>
                        </div>
                    </div>
                </div>
                <div class="info">
                    <div>Version: <strong>${version}</strong></div>
                    <div>Published on: <strong>${published.toDateString()}</strong></div>
                </div>
            `;
        } catch (e) {
            return html`
                <div class="error">
                    Error loading release information
                </div>
            `;
        }
    }

    async downloadInfo() {
        return html`
            ${await this.releaseInfo()}
            <a class="link" href="https://github.com/rolandbernard/marvin/releases/">
                Release Notes
            </a>
        `;
    }

    loadingAnimation() {
        return html`
            <svg class="loading" viewBox="0 0 95 95">
                <path class="path" d="M 47.5 10 A 37.5 37.5 0 0 1 85 47.5"/>
                <path class="path" d="M 47.5 85 A 37.5 37.5 0 0 1 47.5 85"/>
                <path class="path" d="M 47.5 85 A 37.5 37.5 0 0 1 10 47.5"/>
                <path class="path" d="M 10 47.5 A 37.5 37.5 0 0 1 10 47.5"/>
            </svg>
        `;
    }

    render() {
        return html`
            ${until(this.downloadInfo(), this.loadingAnimation())}
        `;
    }
}


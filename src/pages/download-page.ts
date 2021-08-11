
import { customElement, html, css, LitElement } from 'lit-element';
import { until } from 'lit-html/directives/until';

const API = 'https://api.github.com/repos/rolandbernard/marvin/releases/latest';

@customElement('download-page')
export class DownloadPage extends LitElement {

    static get styles() {
        return css`
            :host {
                display: flex;
                flex-flow: column;
                align-items: center;
            }
            .error {
                color: white;
                opacity: 0.625;
            }
            .link {
                margin: 0.5rem;
                color: white;
                opacity: 0.625;
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
                opacity: 0.625;
            }
            .info > div {
                margin: 0.25rem;
            }
            .info strong {
                font-weight: bold;
            }
        `
    }

    async releaseInfo() {
        try {
            const response = await fetch(API);
            const data = await response.json();
            const version = data.tag_name?.substr(1);
            const published = new Date(data.published_at);
            return html`
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
            <a class="link" href="https://github.com/rolandbernard/marvin/releases/latest">
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


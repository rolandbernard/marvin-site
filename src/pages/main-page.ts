
import { customElement, html, css, LitElement } from 'lit-element';

import Demo from 'assets/demo.mp4';

@customElement('main-page')
export class MainPage extends LitElement {

    static get styles() {
        return css`
            :host {
                max-width: 90%;
                width: 800px;
                text-align: center;
            }
            .video {
                max-width: 100%;
                max-height: calc(80vh - 10rem);
            }
        `
    }

    render() {
        return html`
            <video
                class="video"
                autoplay
                muted
                loop
            >
                <source src="${Demo}" type="video/mp4">
            </video>
        `;
    }
}


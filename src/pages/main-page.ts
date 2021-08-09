
import { customElement, html, css, LitElement } from 'lit-element';

import Demo from 'images/demo.mp4';

@customElement('main-page')
export class MainPage extends LitElement {

    static get styles() {
        return css`
            :host {
                max-width: 90%;
                width: 800px;
            }
            .video {
                max-width: 100%;
            }
        `
    }

    render() {
        return html`
            <video
                class="video"
                .defaultPlaybackRate="${1.25}"
                ?autoplay="${true}"
                ?loop="${true}"
                src="${Demo}"
            ></video>
        `;
    }
}



import { customElement, html, css, LitElement } from 'lit-element';

import Demo from 'images/demo.mp4';

@customElement('main-page')
export class MainPage extends LitElement {

    static get styles() {
        return css`
        `
    }

    render() {
        return html`
            <video
                class="preview"
                ?autoplay="${true}"
                ?loop="${true}"
                src="${Demo}"
            ></video>
        `;
    }
}


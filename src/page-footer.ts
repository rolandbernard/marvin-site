
import { customElement, html, css, LitElement } from 'lit-element';

@customElement('page-footer')
export class PageFooter extends LitElement {

    static get styles() {
        return css`
        `;
    }

    render() {
        return html`
            <div class="footer">
                Hello World
            </div>
        `;
    }
}


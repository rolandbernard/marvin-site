
import { css, customElement, html, LitElement, property } from 'lit-element';

@customElement('simple-route')
export class SimpleRoute extends LitElement {

    @property()
    route?: string;

    visible = false;

    constructor() {
        super();
        this.updateRoute = this.updateRoute.bind(this);
    }

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('hashchange', this.updateRoute);
        this.updateRoute();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener('hashchange', this.updateRoute);
    }

    updateRoute() {
        if (this.route) {
            const regEx = new RegExp(`^${this.route}$`);
            let path;
            if (this.route[0] === "#") {
                path = window.location.hash || "#/";
            } else {
                path = window.location.pathname || "/";
            }            
            const match = path.match(regEx);
            if (match && !this.visible) {
                this.visible = true;
                this.requestUpdate();
            }
            if (!match && this.visible) {
                this.visible = false;
                this.requestUpdate();
            }
        } else if (!this.visible) {
            this.visible = true;
            this.requestUpdate();
        }
    }

    static get styles() {
        return css`
            :host {
                display: contents;
            }
        `;
    }

    render() {
        if (this.visible) {
            return html`<slot></slot>`;
        } else {
            return html`<slot name="fallback"></slot>`;
        }
    }
}


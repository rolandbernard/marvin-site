
import { css, customElement, html, LitElement, property } from 'lit-element';

export function isRouteActive(route?: string): boolean {
    if (route) {
        const regEx = new RegExp(`^${route}$`, 'i');
        let path;
        if (route[0] === "#") {
            path = window.location.hash || "#/";
        } else {
            path = window.location.pathname || "/";
        }            
        const match = path.match(regEx);
        return match ? true : false;
    } else {
        return true;
    }
}

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
        const active = isRouteActive(this.route);
        if (active && !this.visible) {
            this.visible = true;
            this.requestUpdate();
        }
        if (!active && this.visible) {
            this.visible = false;
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


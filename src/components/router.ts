
import { LitElement } from 'lit-element';

export abstract class Router extends LitElement {

    constructor() {
        super();
        this.onNavigation = this.onNavigation.bind(this);
    }

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('hashchange', this.onNavigation);
        this.onNavigation();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener('hashchange', this.onNavigation);
    }

    onNavigation() {
        this.requestUpdate();
    }

    isRouteActive(route?: string): boolean {
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
}

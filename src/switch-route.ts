
import { css, customElement, html, LitElement, property } from 'lit-element';
import { NodePart } from 'lit-html';

import 'simple-route';

export interface Route {
    route?: string;
    component: NodePart;
}

@customElement('switch-route')
export class SwitchRoute extends LitElement {

    @property({ attribute: false })
    routes: Route[] = [];

    static get styles() {
        return css`
            :host {
                display: contents;
            }
        `;
    }

    render() {
        if (this.routes.length > 0) {
            return html`
                <simple-route .route="${this.routes[0].route}">
                    ${this.routes[0].component}
                    <switch-route .routes="${this.routes.slice(1)}" slot="fallback">
                    </switch-route>
                </simple-route>
            `;
        }
    }
}


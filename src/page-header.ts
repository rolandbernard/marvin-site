
import { customElement, html, css, LitElement, property } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';

import { isRouteActive } from 'simple-route';

import Logo from 'images/logo.svg';

import 'material-icon';

@customElement('nav-button')
export class NavButton extends LitElement {

    @property()
    icon: string = '';

    @property()
    text: string = '';

    @property()
    href: string = '';

    constructor() {
        super();
        this.onNavigation = this.onNavigation.bind(this);
    }

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('hashchange', this.onNavigation);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener('hashchange', this.onNavigation);
    }

    onNavigation() {
        this.requestUpdate();
    }

    static get styles() {
        return css`
            .link {
                color: white;
                text-decoration: none;
                padding: 1rem;
                display: flex;
                align-items: center;
                user-select: none;
                transition: var(--transition);
                transition-property: opacity;
                position: relative;
                opacity: 0.625;
            }
            .link:hover {
                opacity: 0.9;
            }
            .link.active {
                opacity: 1;
            }
            .link::after {
                content: '';
                opacity: 0;
                position: absolute;
                height: 2px;
                bottom: 0;
                left: 0.25rem;
                right: 0.25rem;
                background: white;
            }
            .link.active::after {
                transition: var(--transition);
                transition-property: opacity;
                opacity: 0.625;
            }
            .icon {
                font-size: 1.5rem;
            }
            .name {
                margin-left: 0.25rem;
                font-weight: 300;
            }
        `;
    }

    render() {
        const classes = classMap({
            'link': true,
            'active': isRouteActive(this.href + '/?'),
        });
        return html`
            <a class="${classes}" href="${this.href}" ondragstart="return false" @click="${() => this.requestUpdate()}">
                <material-icon class="icon" name="${this.icon}"></material-icon>
                <span class="name">
                    ${this.text}
                </span>
            </a>
        `;
    }
}

@customElement('page-header')
export class PageHeader extends LitElement {

    static get styles() {
        return css`
            .header {
                display: flex;
                flex-flow: row;
                justify-content: space-between;
                align-items: center;
                padding: 1.5rem 3rem 0;
            }
            .info {
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
            }
            .logo {
                width: 5rem;
                height: 5rem;
                pointer-events: none;
            }
            .text {
                margin: 1.5rem;
            }
            .name {
                font-size: 1.5rem;
                font-weight: bold;
                margin-bottom: 0.25rem;
            }
            .desc {
                opacity: 0.625;
            }
            .nav {
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                justify-content: center;
            }
            @media screen and (max-width: 900px) {
                .header {
                    flex-flow: column;
                    justify-content: center;
                }
            }
        `;
    }

    render() {
        return html`
            <div class="header">
                <div class="info">
                    <img class="logo" src="${Logo}" />
                    <div class="text">
                        <div class="name">Marvin</div>
                        <div class="desc">An app launcher for Linux and Windows</div>
                    </div>
                </div>
                <nav class="nav">
                    <nav-button
                        icon="home"
                        text="Home"
                        href="#"
                    ></nav-button>
                    <nav-button
                        icon="download"
                        text="Download"
                        href="#/download"
                    ></nav-button>
                    <nav-button
                        icon="flash_on"
                        text="Features"
                        href="#/features"
                    ></nav-button>
                </nav>
            </div>
        `;
    }
}


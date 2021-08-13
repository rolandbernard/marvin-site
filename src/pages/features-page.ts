
import { customElement, html, css, LitElement, property } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';

import { isRouteActive } from 'components/simple-route';

import 'components/switch-route';

import Alias from 'assets/features/alias.png';
import Applications from 'assets/features/applications.png';
import Bookmarks from 'assets/features/bookmarks.png';
import Calculator from 'assets/features/calculator.png';
import Clipboard from 'assets/features/clipboard.png';
import Color from 'assets/features/color.png';
import Command from 'assets/features/command.png';
import CurrencyConverter from 'assets/features/currency-converter.png';
import Dictionary from 'assets/features/dictionary.png';
import DuckDuckGo from 'assets/features/duckduckgo.png';
import DuckDuckGoSearch from 'assets/features/duckduckgo-search.png';
import Email from 'assets/features/email.png';
import Folders from 'assets/features/folders.png';
import History from 'assets/features/history.png';
import Html from 'assets/features/html.png';
import Locate from 'assets/features/locate.png';
import SystemCommands from 'assets/features/system-commands.png';
import Translate from 'assets/features/translate.png';
import Url from 'assets/features/url.png';
import WebSearch from 'assets/features/web-search.png';
import Windows from 'assets/features/windows.png';

interface Feature {
    name: string;
    text: string;
    image?: string;
    linux_only?: boolean;
    window_only?: boolean;
};

const FEATURES: Feature[] = [
    {
        name: 'Alias',
        text: 'This module allows you to add an alias for a certain option, that allows you to search it under a different name.',
        image: Alias,
    },
    {
        name: 'Applications',
        text: 'This module allows you to start applications.',
        image: Applications,
    },
    {
        name: 'Bookmarks',
        text: 'This module allows you to search through your Firefox and Chromium/Google Chrome bookmarks.',
        image: Bookmarks,
    },
    {
        name: 'Calculator',
        text: 'This module allows you to do calculations using Math.js (and/or Algebrite).',
        image: Calculator,
    },
    {
        name: 'Clipboard',
        text: 'This module allows you to access your clipboard history.',
        image: Clipboard,
    },
    {
        name: 'Color',
        text: 'This module allows you to convert colors between hex/rgb/hsl/hsv.',
        image: Color,
    },
    {
        name: 'Command',
        text: 'This module allows you to execute shell commands.',
        image: Command,
    },
    {
        name: 'Currency converter',
        text: 'This module allows you to quickly convert between currencies.',
        image: CurrencyConverter,
    },
    {
        name: 'Dictionary',
        text: 'This module allows you to quickly lookup definitions and synonyms for words.',
        image: Dictionary,
    },
    {
        name: 'DuckDuckGo Instant',
        text: 'This module gives you the DuckDuckGo Instant Answers for your query.',
        image: DuckDuckGo,
    },
    {
        name: 'DuckDuckGo Search',
        text: 'This module gives you the DuckDuckGo Search results for your query.',
        image: DuckDuckGoSearch,
    },
    {
        name: 'Email',
        text: 'This module allows one to quickly start writing a new email.',
        image: Email,
    },
    {
        name: 'Folders',
        text: 'This module allows you to browse files.',
        image: Folders,
    },
    {
        name: 'History',
        text: 'This module allows you to execute recent options again.',
        image: History,
    },
    {
        name: 'HTML',
        text: 'This module allows you to create custom HTML entries.',
        image: Html,
    },
    {
        name: 'Locate',
        text: 'This module allows you to search for files using locate.',
        image: Locate,
        linux_only: true,
    },
    {
        name: 'Scripts',
        text: 'This module allows you to create custom entries to execute shell scripts.',
    },
    {
        name: 'Shortcuts',
        text: 'This module allows you to define shortcuts to run shell scripts.',
    },
    {
        name: 'System commands',
        text: 'This module will give you access to some fundamental system operations. (Reboot, Shutdown)',
        image: SystemCommands,
    },
    {
        name: 'Translate',
        text: 'This module allows you to translate words.',
        image: Translate,
    },
    {
        name: 'URL module',
        text: 'This module allows you to open urls.',
        image: Url,
    },
    {
        name: 'Web search',
        text: 'This module allows you to quickly do a web search. It will open a URL, by inserting the query at a specific location.',
        image: WebSearch,
    },
    {
        name: 'Windows',
        text: 'This module allows you to find open windows.',
        image: Windows,
    },
];

@customElement('list-button')
export class ListButton extends LitElement {

    @property({ attribute: false })
    feature?: Feature;

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
                display: flex;
                flex-flow: row nowrap;
                color: white;
                text-decoration: none;
                padding: 0.5rem;
                align-items: center;
                user-select: none;
                transition: var(--transition);
                transition-property: opacity;
                position: relative;
                transition: var(--transition);
                transition-property: background;
                background: #2f363f;
            }
            .link:hover {
                background: #2b323a;
            }
            .link.active {
                background: #272e35;
            }
            .link:hover .icon, .link.active .icon, .link:hover .name {
                opacity: 0.9;
            }
            .link.active .name {
                opacity: 1;
            }
            .windows-only .icon.linux {
                opacity: 0.2;
            }
            .linux-only .icon.windows {
                opacity: 0.2;
            }
            .icon, .name {
                transition: var(--transition);
                transition-property: opacity;
                opacity: 0.625;
            }
            .icon {
                font-size: 1rem;
            }
            .name {
                margin: 0 0.5rem;
                font-size: 0.8rem;
                white-space: nowrap;
            }
        `;
    }

    render() {
        if (this.feature) {
            const url = `#/features/${this.feature.name.toLowerCase().replace(/\s+/g, '-')}`;
            const classes = classMap({
                'link': true,
                'active': isRouteActive(`${url}(/.*)?`),
                'linux-only': this.feature.linux_only ? true : false,
                'windows-only': this.feature.window_only ? true : false,
            });
            return html`
                <a
                    class="${classes}"
                    href="${url}"
                    ondragstart="return false"
                    @click="${() => this.requestUpdate()}"
                >
                    <div class="icon linux">
                        <material-icon name="linux"></material-icon>
                    </div>
                    <div class="icon windows">
                        <material-icon name="windows"></material-icon>
                    </div>
                    <div class="name">
                        ${this.feature.name}
                    </div>
                </a>
            `;
        }
    }
}

@customElement('feature-item')
export class FeatureItem extends LitElement {

    @property({ attribute: false })
    feature?: Feature;

    static get styles() {
        return css`
            :host {
                width: 100%;
            }
            .name {
                margin: 0 2rem;
                font-size: 1.75rem;
                font-weight: bold;
                color: white;
                opacity: 0.8;
                margin-left: 4rem;
            }
            .desc {
                margin: 0 2rem;
                color: white;
                opacity: 0.8;
                margin: 1rem 0;
                margin-left: 4rem;
            }
            .image {
                width: 100%;
                padding-left: 4rem;
                box-sizing: border-box;
            }
        `
    }

    render() {
        return html`
            <div class="name">
                <div class="icons">
                </div>
                <div class="title">${this.feature?.name}</div>
            </div>
            <div class="desc">${this.feature?.text}</div>
            ${
                this.feature?.image
                    ? html`<img class="image" src="${this.feature.image}" loading="lazy"/>`
                    : undefined
            }
        `;
    }
}

@customElement('features-page')
export class FeaturesPage extends LitElement {

    static get styles() {
        return css`
            :host {
                display: flex;
                flex-flow: row nowrap;
                padding: 0 3rem;
                width: 100%;
                overflow: hidden;
            }
            .list {
                flex: 0 0 auto;
                display: flex;
                flex-flow: column;
                justify-content: center;
            }
            .info {
                flex: 1 1 100%;
                display: flex;
                flex-flow: column;
                align-items: center;
                justify-content: center;
            }
        `;
    }

    render() {
        return html`
            <div class="list">
                ${FEATURES.map(feature => html`
                    <list-button .feature="${feature}"></list-button>
                `)}
            </div>
            <div class="info">
                <switch-route .routes="${[
                    ...FEATURES.map(feature => ({
                        route: `#/?features/${feature.name.toLowerCase().replace(/\s+/g, '-')}(/.*)?`,
                        component: html`<feature-item .feature="${feature}"></feature-item>`,
                    })),
                    { component: html`<feature-item .feature="${FEATURES[0]}"></feature-item>` }
                ]}"></switch-route>
            </div>
        `;
    }
}


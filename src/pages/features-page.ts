
import { customElement, html, css, property } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';

import { Router } from 'components/router';

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
    linux?: boolean;
    windows?: boolean;
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
        windows: false,
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
export class ListButton extends Router {

    @property({ attribute: false })
    feature?: Feature;

    @property({ attribute: false })
    active = false;

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
            .no-linux .icon.linux {
                opacity: 0.2;
            }
            .no-windows .icon.windows {
                opacity: 0.2;
            }
            .icon, .name {
                transition: var(--transition);
                transition-property: opacity;
                opacity: 0.625;
            }
            .icon {
                font-size: 1rem;
                margin: 0 0.1rem;
            }
            .name {
                margin: 0 0.5rem;
                font-size: 0.8rem;
                white-space: nowrap;
            }
            @media screen and (max-width: 600px) {
                .icon {
                    display: none;
                }
                .name {
                    margin: 0;
                }
            }
        `;
    }

    render() {
        if (this.feature) {
            const url = `#/features/${this.feature.name.toLowerCase().replace(/\s+/g, '-')}`;
            const classes = classMap({
                'link': true,
                'active': this.active,
                'no-linux': !(this.feature.linux ?? true),
                'no-windows': !(this.feature.windows ?? true),
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
export class FeatureItem extends Router {

    @property({ attribute: false })
    feature?: Feature;

    static get styles() {
        return css`
            :host {
                width: 100%;
            }
            .name {
                font-size: 1.75rem;
                font-weight: bold;
                color: white;
                opacity: 0.8;
                padding-left: 4rem;
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
            }
            .icons {
                display: flex;
                flex-flow: row nowrap;
                color: white;
                opacity: 0.8;
                font-size: 1.25rem;
                margin: 0 1rem;
            }
            .icon {
                margin: 0 0.1rem;
            }
            .desc {
                color: white;
                opacity: 0.8;
                padding: 1rem 0;
                padding-left: 4rem;
            }
            .image {
                width: 100%;
                padding-left: 4rem;
                box-sizing: border-box;
            }
            @media screen and (max-width: 750px) {
                .name, .desc, .image {
                    padding-left: 2rem;
                }
            }
            @media screen and (max-width: 600px) {
                .name, .desc, .image {
                    padding-left: 1rem;
                }
            }
            @media screen and (max-width: 400px) {
                .name, .desc, .image {
                    padding-left: 0.5rem;
                }
            }
            @media screen and (max-width: 600px) {
                .icons {
                    display: none;
                }
            }
        `
    }

    render() {
        return html`
            <div class="name">
                <div class="title">${this.feature?.name}</div>
                <div class="icons">
                    ${this.feature?.linux ?? true ? html`<material-icon class="icon" name="linux"></material-icon>` : undefined}
                    ${this.feature?.windows ?? true ? html`<material-icon class="icon" name="windows"></material-icon>` : undefined}
                </div>
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
export class FeaturesPage extends Router {

    static get styles() {
        return css`
            :host {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-flow: row nowrap;
                padding: 0 3rem;
                overflow: hidden;
            }
            .header {
                font-size: 0.8rem;
                opacity: 0.625;
                margin-bottom: 0.5rem;
                margin-left: 0.5rem;
            }
            .list {
                flex: 0 0 auto;
                display: flex;
                flex-flow: column;
                justify-content: center;
                margin: 1rem 0;
            }
            .info {
                flex: 1 1 100%;
                display: flex;
                flex-flow: column;
                align-items: center;
                justify-content: center;
            }
            @media screen and (max-width: 750px) {
                :host {
                    padding: 0 2rem;
                }
            }
            @media screen and (max-width: 600px) {
                :host {
                    padding: 0 1rem;
                }
            }
            @media screen and (max-width: 400px) {
                :host {
                    padding: 0 0.5rem;
                }
            }
        `;
    }

    render() {
        const last_feature: Feature | null = JSON.parse(sessionStorage.getItem('last-feature') ?? 'null');
        const feature = FEATURES.find(
            feature => this.isRouteActive(`#/?features/${feature.name.toLowerCase().replace(/\s+/g, '-')}(/.*)?`)
        ) ?? last_feature ?? FEATURES[0];
        sessionStorage.setItem('last-feature', JSON.stringify(feature));
        return html`
            <div class="list">
                <div class="header">Modules</div>
                ${FEATURES.map(f => html`
                    <list-button .feature="${f}" .active="${feature.name === f.name}"></list-button>
                `)}
            </div>
            <div class="info">
                <feature-item .feature="${feature}"></feature-item>
            </div>
        `;
    }
}



import { customElement, html, css, LitElement } from 'lit-element';

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
import Settings from 'assets/features/settings.png';
import SystemCommands from 'assets/features/system-commands.png';
import Theme from 'assets/features/theme.png';
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
        name: 'DuckDuckGo Instant Answer',
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

const GENERAL: Feature[] = [
    {
        name: 'Settings',
        text: 'The settings include general settings, theme settings and settings specific to certain modules.',
        image: Settings,
    },
    {
        name: 'Themes',
        text: 'There are some predefined themes, but it is also possible to configure most of the colors and some other parameters.',
        image: Theme,
    },
]

@customElement('features-page')
export class FeaturesPage extends LitElement {

    static get styles() {
        return css`
        `
    }

    renderFeature(feature: Feature) {
        return html`
            <div class="name">
                <div class="icons">
                </div>
                <div class="title">${feature.name}</div>
            </div>
            <div class="desc">${feature.text}</div>
            ${
                feature.image
                    ? html`<img class="image" src="${feature.image}" loading="lazy"/>`
                    : undefined
            }
        `;
    }

    render() {
        return html`
            <div class="list">
            </div>
            <div class="info">
                <switch-route .routes="${[
                    ...[...FEATURES, ...GENERAL].map(feature => ({
                        route: `#/?features/${feature.name.toLowerCase().replace(/\s+/g, '-')}(/.*)?`,
                        component: this.renderFeature(feature),
                    })),
                    { component: this.renderFeature(FEATURES[0]) }
                ]}"></switch-route>
            </div>
        `;
    }
}


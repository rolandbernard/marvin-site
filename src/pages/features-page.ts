
import { customElement, html, css, LitElement } from 'lit-element';

import 'components/switch-route';

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
        image: 'alias.png',
    },
    {
        name: 'Applications',
        text: 'This module allows you to start applications.',
        image: 'applications.png',
    },
    {
        name: 'Bookmarks',
        text: 'This module allows you to search through your Firefox and Chromium/Google Chrome bookmarks.',
        image: 'bookmarks.png',
    },
    {
        name: 'Calculator',
        text: 'This module allows you to do calculations using Math.js (and/or Algebrite).',
        image: 'calculator.png',
    },
    {
        name: 'Clipboard',
        text: 'This module allows you to access your clipboard history.',
        image: 'clipboard.png',
    },
    {
        name: 'Color',
        text: 'This module allows you to convert colors between hex/rgb/hsl/hsv.',
        image: 'color.png',
    },
    {
        name: 'Command',
        text: 'This module allows you to execute shell commands.',
        image: 'command.png',
    },
    {
        name: 'Currency converter',
        text: 'This module allows you to quickly convert between currencies.',
        image: 'currency-converter.png',
    },
    {
        name: 'Dictionary',
        text: 'This module allows you to quickly lookup definitions and synonyms for words.',
        image: 'dictionary.png',
    },
    {
        name: 'DuckDuckGo Instant Answer',
        text: 'This module gives you the DuckDuckGo Instant Answers for your query.',
        image: 'duckduckgo.png',
    },
    {
        name: 'DuckDuckGo Search',
        text: 'This module gives you the DuckDuckGo Search results for your query.',
        image: 'duckduckgo-search.png',
    },
    {
        name: 'Email',
        text: 'This module allows one to quickly start writing a new email.',
        image: 'email.png',
    },
    {
        name: 'Folders',
        text: 'This module allows you to browse files.',
        image: 'folders.png',
    },
    {
        name: 'History',
        text: 'This module allows you to execute recent options again.',
        image: 'history.png',
    },
    {
        name: 'HTML',
        text: 'This module allows you to create custom HTML entries.',
        image: 'html.png',
    },
    {
        name: 'Locate',
        text: 'This module allows you to search for files using locate.',
        image: 'locate.png',
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
        image: 'system-commands.png',
    },
    {
        name: 'Translate',
        text: 'This module allows you to translate words.',
        image: 'translate.png',
    },
    {
        name: 'URL module',
        text: 'This module allows you to open urls.',
        image: 'url.png',
    },
    {
        name: 'Web search',
        text: 'This module allows you to quickly do a web search. It will open a URL, by inserting the query at a specific location.',
        image: 'web-search.png',
    },
    {
        name: 'Windows',
        text: 'This module allows you to find open windows.',
        image: 'windows.png',
    },
    {
        name: 'Windows',
        text: 'This module allows you to find open windows.',
        image: 'windows.png',
    },
];

const GENERAL: Feature[] = [
    {
        name: 'Settings',
        text: 'The settings include general settings, theme settings and settings specific to certain modules.',
        image: 'settings.png',
    },
    {
        name: 'Themes',
        text: 'There are some predefined themes, but it is also possible to configure most of the colors and some other parameters.',
        image: 'theme.png',
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



import { customElement, html, css, LitElement, property } from 'lit-element';

import 'material-icon';

@customElement('info-button')
export class InfoButton extends LitElement {

    @property()
    icon: string = '';

    @property()
    text: string = '';

    @property()
    href: string = '';

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
            .icon {
                font-size: 1rem;
            }
            .name {
                margin-left: 0.25rem;
                font-size: 0.8rem;
            }
        `;
    }

    render() {
        return html`
            <a class="link" href="${this.href}" ondragstart="return false" @click="${() => this.requestUpdate()}">
                <material-icon class="icon" name="${this.icon}"></material-icon>
                <span class="name">
                    ${this.text}
                </span>
            </a>
        `;
    }
}

@customElement('page-footer')
export class PageFooter extends LitElement {

    static get styles() {
        return css`
            .footer {
                display: flex;
                flex-flow: row;
                justify-content: center;
                align-items: center;
                margin-top: 1rem;
            }
        `;
    }

    render() {
        return html`
            <div class="footer">
                <info-button
                    icon="github"
                    text="GitHub"
                    href="https://github.com/rolandbernard/marvin"
                ></info-button>
                <info-button
                    icon="question_answer"
                    text="Feedback"
                    href="https://github.com/rolandbernard/marvin/issues"
                ></info-button>
            </div>
        `;
    }
}


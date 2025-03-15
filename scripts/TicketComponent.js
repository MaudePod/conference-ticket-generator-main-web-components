export default class TicketComponent extends HTMLElement {
    #internals;
    constructor() {
        super();
        this.#internals = this.attachInternals();
    }
    connectedCallback(
    ) {
        window.addEventListener('nameUpdated', (event) => {
            this.#internals.shadowRoot.querySelector('span[class="fullname"]').innerHTML = event.detail.name;
        })
        window.addEventListener('usernameUpdated', (event) => {
            this.#internals.shadowRoot.querySelector('span[class="git-hub-username"]').innerHTML = event.detail.username;
        })
    }
    disconnectedCallback() {
    }
}
if (!customElements.get("ticket-component")) {
    customElements.define("ticket-component", TicketComponent);
}
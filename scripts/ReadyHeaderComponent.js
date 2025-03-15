export default class ReadyHeaderComponent extends HTMLElement {
    #internals;
    constructor() {
        super();
        this.#internals = this.attachInternals();
    }
    connectedCallback(
    ) {
        window.addEventListener('nameUpdated', (event) => {
            this.#internals.shadowRoot.querySelector('span[id="name"]').innerHTML=event.detail.name;
          })
          window.addEventListener('emailUpdated', (event) => {
            this.#internals.shadowRoot.querySelector('span[id="email-address"]').innerHTML=event.detail.email;
          })
    }
    disconnectedCallback() {
    }
}
if (!customElements.get("ready-header-component")) {
    customElements.define("ready-header-component", ReadyHeaderComponent);
}
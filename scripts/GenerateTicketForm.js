export default class GenerateTicketForm extends HTMLElement {
    #internals;
    constructor() {
        super();
        this.#internals = this.attachInternals();
    }
    connectedCallback(
    ) {
        const avatarUploadInput = this.#internals.shadowRoot.querySelector('input[id="upload-avatar"]');
        avatarUploadInput.addEventListener('change', (event) => {
            if (this.isTooBig(avatarUploadInput.files[0].size, 500)) {
                avatarUploadInput.setAttribute('max-size', 'invalid');
                return;
            }
            if (avatarUploadInput.getAttribute('max-size')) {
                avatarUploadInput.removeAttribute('max-size');
            }
            const uploadArea = this.#internals.shadowRoot.querySelector('section[class="upload-instructions"]');
            const viewUploadedImg = this.#internals.shadowRoot.querySelector('section[class="view-uploaded-img"]');
            const uploadedImg = this.#internals.shadowRoot.querySelector('img[id="uploaded-img"]');
            const ticketImg = this.#internals.shadowRoot.querySelector('img[id="uploaded-img-ticket"]');
            uploadArea.style.display = "none";
            viewUploadedImg.style.display = "grid";
            uploadedImg.src = URL.createObjectURL(avatarUploadInput.files[0]);
            ticketImg.src = URL.createObjectURL(avatarUploadInput.files[0]);
            uploadedImg.style.padding = "0";
        });
        this.#internals.shadowRoot.querySelector('button[id="remove-img"]').addEventListener('click', (event) => {
            event.preventDefault();
            this.removeImg();
        });
        this.#internals.shadowRoot.querySelector('button[id="change-img"]').addEventListener('click', (event) => {
            event.preventDefault();
            this.changeImg();
        });
        this.#internals.shadowRoot.querySelector('button[id="generate"]').addEventListener('click', (event) => {
            event.preventDefault();
            const name=this.#internals.shadowRoot.querySelector('input[id="name"]').value;
            const username=this.#internals.shadowRoot.querySelector('input[id="username"]').value;
            this.#internals.shadowRoot.querySelector('span[class="fullname"]').innerHTML=name;
            this.#internals.shadowRoot.querySelector('span[class="git-hub-username"]').innerHTML=username;
            this.#internals.shadowRoot.querySelector('section[class="form-container"]').style.display="none";
            this.setAttribute("form","complete")
        });
    }

    disconnectedCallback() {
    }
    removeImg = () => {
        const uploadedImg = this.#internals.shadowRoot.querySelector('img[id="uploaded-img"]');
        uploadedImg.src = "./assets/images/icon-upload.svg";
    }
    changeImg = () => {
        const uploadArea = this.#internals.shadowRoot.querySelector('section[class="upload-instructions"]');
        const viewUploadedImg = this.#internals.shadowRoot.querySelector('section[class="view-uploaded-img"]');
        uploadArea.style.display = "grid";
        viewUploadedImg.style.display = "none";
        uploadArea.click();
    }

    isTooBig = (size, maxSizeAllowed) => {
        const sizeInKb = (size / 1e3).toFixed(1);
        if (sizeInKb > maxSizeAllowed) {
            return true;
        } else {
            return false;
        }
    }
    static get observedAttributes() {
        return [
        ];
    }
}
if (!customElements.get("generate-ticket-form")) {
    customElements.define("generate-ticket-form", GenerateTicketForm);
}
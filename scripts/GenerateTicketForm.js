export default class GenerateTicketForm extends HTMLElement {
    #internals;
    constructor() {
        super();
        this.#internals = this.attachInternals();
    }
    connectedCallback(
    ) {
        const photoUploadInput = this.#internals.shadowRoot.querySelector('input[id="upload-avatar"]');
        photoUploadInput.addEventListener('change', (event) => {
            if (this.isTooBig(photoUploadInput.files[0].size, 500)) {
                photoUploadInput.setCustomValidity("File too large. Please upload a photo under 500KB");
                photoUploadInput.setAttribute('max-size', 'invalid');
                return;
            }
            if (photoUploadInput.getAttribute('max-size')) {
                photoUploadInput.removeAttribute('max-size');
                photoUploadInput.setCustomValidity("");
            }
            const photo=URL.createObjectURL(photoUploadInput.files[0]);
            this.displayImage(photo);
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
            const name = this.#internals.shadowRoot.querySelector('input[id="name"]').value;
            const username = this.#internals.shadowRoot.querySelector('input[id="username"]').value;
            const email = this.#internals.shadowRoot.querySelector('input[id="email"]').value;
            this.dispatchEvents(name, email, username)
            this.setAttribute("form", "complete")
        });
    }

    disconnectedCallback() {
    }
    dispatchEvents = (name, email, username) => {
        this.notifyListersOfNameUpdate(name);
        this.notifyListersOfEmailUpdate(email);
        this.notifyListersOfUsernameUpdate(username);
    }

    hideForm = () => {
        this.#internals.shadowRoot.querySelector('section[class="form-container"]').style.display = "none";
    }

    notifyListersOfNameUpdate = (name) => {
        window.dispatchEvent(new CustomEvent("nameUpdated", { detail: { name: name } }));
    }
    notifyListersOfEmailUpdate = (email) => {
        window.dispatchEvent(new CustomEvent("emailUpdated", { detail: { email: email } }));
    }
    notifyListersOfUsernameUpdate = (username) => {
        window.dispatchEvent(new CustomEvent("usernameUpdated", { detail: { username: username } }));
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
    displayImage = (photo) => {
        const uploadArea = this.#internals.shadowRoot.querySelector('section[class="upload-instructions"]');
        const viewUploadedImg = this.#internals.shadowRoot.querySelector('section[class="view-uploaded-img"]');
        const uploadedImg = this.#internals.shadowRoot.querySelector('img[id="uploaded-img"]');
        uploadArea.style.display = "none";
        viewUploadedImg.style.display = "grid";
        uploadedImg.src = photo;
        uploadedImg.style.padding = "0";
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
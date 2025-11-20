class ModalComponent extends HTMLElement {
    
    static get observedAttributes() {
        return ["modale-width"]; // On observe max-width
    }
    
    constructor() {
        super();

        // Créer un shadow DOM
        this.attachShadow({ mode: "open" });

        // Contenu HTML du composant
        this.shadowRoot.innerHTML = `
        <style>
            .modal {
                display: none; /* Cachée par défaut */
                position: fixed; /* Fixe la modale à la fenêtre */
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 20, 20, 0.25); /* Fond semi-transparent */
                justify-content: center; /* Centrer horizontalement */
                align-items: center; /* Centrer verticalement */
                flex-direction: column;
            }

            .modal.show {
                display: flex;
            }

            /* Contenu de la modale avec bandeau en haut */
            .modal-content {
                background-color: white;
                width: 80%;
                max-width: 50%;
                border-radius: 8px;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
                display: flex;
                flex-direction: column;
            }

            /* Bandeau du header */
            .modal-header {
                background-color: #007bff; /* Couleur par défaut */
                color: white;
                padding: 10px;
                display: flex;
                justify-content: space-between; /* Espace entre le titre et la croix */
                align-items: center;
                font-size: 1.25em;
                border-radius: 8px 8px 0 0; /* Coins arrondis seulement en haut */
            }

            /* Bouton de fermeture */
            .close {
                background: none;
                border: none;
                font-size: 24px;
                color: white;
                cursor: pointer;
                transition: color 0.3s;
            }

            .close:hover {
                color: #ff0000; /* Rouge pour l'indication visuelle */
            }

            /* Corps de la modale */
            .modal-body {
                padding: 10px;
                font-size: 16px;
            }
            .modal-footer {
                background-color: lightgrey;
                padding: 5px;
                font-size: 16px;
                text-align: right;
                border-radius: 0px 0px 8px 8px;
                height: auto;
            }
        </style>
        <div class="modal">
          <div class="modal-content">
           <div class="modal-header">
                <slot name="title">Titre de la modale</slot>
                <button class="close">&times;</button>
            </div>
            <div class="modal-body">
                <slot name="body">
                </slot>
            </div>
            <div class="modal-footer">
                <slot name="footer">
                </slot>
            </div>

          </div>
        </div>
      `;

        // Références aux éléments
        this.modal = this.shadowRoot.querySelector(".modal");
        this.modalContent = this.shadowRoot.querySelector(".modal-content");
        if (this.modal.hasAttribute("modale-width")){
            const color = this.modal.getAttribute("modale-width");
            this.modal.style.maxWidth = newValue;
        }

        this.closeButton = this.shadowRoot.querySelector(".close");

        // Ajouter un événement pour fermer la modale
        this.closeButton.addEventListener("click", () => this.close());

        const titleSlot = this.shadowRoot.querySelector("slot[name='title']");
        titleSlot.addEventListener("slotchange", () => {
            // flatten à true permet de récupérer les sous-slots s'il y en a.
            const assignedNodes = titleSlot.assignedNodes({ flatten: true });
            const headerElement = assignedNodes.find(node => node.nodeType === Node.ELEMENT_NODE);

            // Appliquer la couleur si l'attribut "header-color" est présent
            if (headerElement && headerElement.hasAttribute("header-color")) {
                const color = headerElement.getAttribute("header-color");
                this.shadowRoot.querySelector(".modal-header").style.backgroundColor = color;
            }
        });
    }

    // Méthode pour ouvrir la modale
    open() {
        this.modal.classList.add("show");
    }

    // Méthode pour fermer la modale
    close() {
        this.modal.classList.remove("show");
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "modale-width") {
            console.log("ok")
            this.modalContent.style.maxWidth = newValue || "50%"; // Appliquer la valeur ou une valeur par défaut
        }
    }
}
// Déclarer le composant
customElements.define("modale-view", ModalComponent);

function openModale(idModale) {
    const modal = document.querySelector("#" + idModale);
    modal.open();
}

function closeModale(idModale) {
    const modal = document.querySelector("#" + idModale);
    modal.close();
}
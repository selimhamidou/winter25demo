var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { LightningElement, track } from "lwc";
import callChatGPT from "@salesforce/apex/BackEndChatGPT.callChatGPT";
export default class JokesBuilder extends LightningElement {
    @track dynamicText;
    constructor() {
        super(...arguments);
        this.question = "Fais-moi une blague en anglais"; // Propriété pour la question
        this.dynamicText = ""; // Propriété pour stocker la réponse
    }
    connectedCallback() {
        console.log("Le composant est connecté");
        this.handleGetResponse();
    }
    handleInputChange(event) {
        const inputElement = event.target;
        this.question = inputElement.value; // Met à jour la question avec la valeur du champ de texte
    }
    handleGetResponse() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield callChatGPT({ questionToAsk: this.question });
                this.dynamicText = response; // Met à jour dynamicText avec la réponse de l'Apex
            }
            catch (error) {
                console.error(error);
                this.dynamicText = "Une erreur s'est produite lors de l'appel à ChatGPT.";
            }
        });
    }
}
import { LightningElement } from "lwc";
import callChatGPT from "@salesforce/apex/BackEndChatGPT.callChatGPT";
export default class JokesBuilder extends LightningElement {
  question: string = "Fais-moi une blague en anglais"; // Propriété pour la question
  dynamicText: string = ""; // Propriété pour stocker la réponse
  connectedCallback() {
    console.log("Le composant est connecté");
  }
  handleInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.question = inputElement.value; // Met à jour la question avec la valeur du champ de texte
  }
  async handleGetResponse() {
    try {
      const response = await callChatGPT({ questionToAsk: this.question });
      this.dynamicText = response; // Met à jour dynamicText avec la réponse de l'Apex
    } catch (error) {
      console.error(error);
      this.dynamicText = "Une erreur s'est produite lors de l'appel à ChatGPT.";
    }
  }
}
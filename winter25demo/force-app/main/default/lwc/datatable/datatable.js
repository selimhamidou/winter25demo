import { LightningElement, api, track } from "lwc";
import executeSOQL from "@salesforce/apex/handleResultsClass.executeSOQL";

export default class Datatable extends LightningElement {
  @api soqlQuery; // Paramètre SOQL défini dans l'App Builder
  @track data;
  @track columns;
  @track error;

  connectedCallback() {
    this.fetchData();
  }

  fetchData() {
    // Vérifie si la requête SOQL est définie
    if (this.soqlQuery) {
      executeSOQL({ query: this.soqlQuery })
        .then((result) => {
          if (result && result.length > 0) {
            this.data = result;

            // Extraction des colonnes de manière dynamique
            this.columns = Object.keys(result[0]).map((key) => ({
              label: key,
              fieldName: key
            }));
          } else {
            this.data = [];
          }
          this.error = undefined;
        })
        .catch((error) => {
          this.error = error.body.message;
          this.data = undefined;
        });
    } else {
      this.error = "Requête SOQL non fournie";
    }
  }
}
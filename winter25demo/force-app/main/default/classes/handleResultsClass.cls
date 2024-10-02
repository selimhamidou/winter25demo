public with sharing class handleResultsClass {
  @AuraEnabled(cacheable=true)
  public static List<Map<String, Object>> executeSOQL(String query) {
      try {
          // Exécution de la requête SOQL
          List<SObject> queryResults = Database.query(query);
          
          // Transformation des résultats en une liste de Map
          List<Map<String, Object>> results = new List<Map<String, Object>>();
          
          // Parcours des résultats
          for (SObject record : queryResults) {
              // Utiliser getPopulatedFieldsAsMap pour obtenir uniquement les champs présents dans le résultat
              Map<String, Object> populatedFields = record.getPopulatedFieldsAsMap();
              
              // Ajouter le map des champs remplis à la liste des résultats
              results.add(populatedFields);
          }

          return results;
      } catch (Exception e) {
          throw new AuraHandledException('Erreur lors de l\'exécution de la requête SOQL : ' + e.getMessage());
      }
  }
}
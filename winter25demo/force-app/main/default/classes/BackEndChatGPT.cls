public class BackEndChatGPT {
  
  //We get the token and the endpoint from the custom metadata type Credentials__mdt, that we created before
  //Using custom metadata type is a personal choice. I could have used a custom setting instead, it would have worked the same
  private static String token = Credentials__mdt.getInstance('ChatGPT')
    .Token__c;
  private static String endpoint = Credentials__mdt.getInstance('ChatGPT')
    .Endpoint__c;

//This method is the one called by our LWC
//We call this method imperatively, so no need to add cacheable=true, but it's better for the performance
@AuraEnabled(cacheable=true)
public static String callChatGPT(String questionToAsk) {
//We create a POST request, and we define some parameters to give to the ChatGPT API. The model will be defined by our usage.
Http h = new Http();
HttpRequest req = new HttpRequest();
req.setEndpoint(endpoint);
req.setMethod('POST');
String body =
'{"model": "llama3-8b-8192","messages": [{"role": "user", "content": "' + //The model gpt-3.5-turbo seems to be the most versatile to use
//'{"model": "gpt-3.5-turbo","messages": [{"role": "user", "content": "' + //The model gpt-3.5-turbo seems to be the most versatile to use
questionToAsk +
'"}], "temperature":0.7}'; //The temperature defines the precision of the response. It's an arbitrary value, we could use more, or less(but always between 0 and 2)
req.setHeader('Authorization', 'Bearer ' + token);
req.setHeader('content-type', 'application/json');
req.setBody(body);
HttpResponse res = h.send(req);
//HttpResponse res = new HttpResponse();
//We check if the request has succeeded. If yes, we treat the response and give it back to our LWC.
//If no, we simply return an empty string
system.debug('test res: '+res.getbody());
if (res.getStatusCode() == 200) {
Map<String, Object> results = (Map<String, Object>) JSON.deserializeUntyped(
res.getBody()
);
List<Object> choices = (List<Object>) results.get('choices');
Map<String, Object> dataNode = (Map<String, Object>) ((Map<String, Object>) choices[0]);
String content = String.valueOf(
((Map<String, Object>) (dataNode.get('message'))).get('content')
);
return content;
}
return 'test';
}
}

const apiKey = process.env.WATSON_API_KEY || 'hgiFIypQyJrMFA_PzerPvLls1KIgHIrbaH1qLAr7RdcA';
const serviceUrl = process.env.WATSON_SERVICE_URL || 'https://api.jp-tok.discovery.watson.cloud.ibm.com';
const enviromnentId = process.env.WATSON_ENVIRONMENT_ID || '057e7d5d-b75e-4ddc-8de5-88aba66cbff2';
const collectionId = process.env.WATSON_COLLECTION_ID || 'be3fe3d0-9377-4704-a118-8f5905c820f0';

module.exports = {
  "watson": {
    "discovery": {
      "version": "2019-04-30",
      "apikey": apiKey,
      "serviceUrl": serviceUrl,
      "environmentId": enviromnentId,
      "collectionId": collectionId
    }
  }
}

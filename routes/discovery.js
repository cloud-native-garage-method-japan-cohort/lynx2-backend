const express = require('express');

const DiscoveryV1 = require('ibm-watson/discovery/v1');
const {IamAuthenticator} = require('ibm-watson/auth');
// const config = require('config');
const config = require('../config/config')

// eslint-disable-next-line new-cap
const router = express.Router();


// 接続情報
const discovery = new DiscoveryV1({
  version: config.watson.discovery.version,
  authenticator: new IamAuthenticator({
    apikey: config.watson.discovery.apikey,
  }),
  serviceUrl: config.watson.discovery.serviceUrl,
});

const createQuery = (searchStr) => {
  const texts = searchStr.split(' ').map((item) => `text:"${item}"`).join(',');
  return `(${texts})`;
};

const runQuery = async (searchStr) => {
  const query = createQuery(searchStr);

  const queryParams = {
    environmentId: config.watson.discovery.environmentId,
    collectionId: config.watson.discovery.collectionId,
    highlight: true,
    query,
    _return: 'highlight',
  };

  console.log(`Running query - ${query}`);
  const queryResponse = await discovery.query(queryParams);

  // let result = '';
  const results = queryResponse.result.results;
  console.log(JSON.stringify(results, null, '\t'));
  if (queryResponse.result.results && queryResponse.result.results.length > 0) {
    const textArray = queryResponse.result.results[0].highlight.text
    const filtered = textArray.map((text) => {
      return text.replace(/<em>/g, '').replace(/<\/em>/g, '');
    });
    return filtered;
  } else {
    return '該当する情報が見つかりませんでした。';
  }
};


router.post('/search', async (req, res) => {
  try {
    if (!req.body.searchText) {
      res.status(400).send('Missing search text.');
      return;
    }

    const responseTexts = await runQuery(req.body.searchText);
    res.json({
      responseTexts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to call watson service');
  }
});

module.exports = router;

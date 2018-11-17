const {
  Client, LocalAddress, CryptoUtils, LoomProvider
} = require('loom-js');

const Web3 = require('web3');
const HackerNoon = require('./contracts/HackerNoon.json');
const elasticsearch = require('elasticsearch');

const indexerPrivateKey = CryptoUtils.generatePrivateKey()
const indexerPublicKey = CryptoUtils.publicKeyFromPrivateKey(indexerPrivateKey)
const indexerUserAddress = LocalAddress.fromPublicKey(indexerPublicKey).toString()

const client = new Client(
  'default',
  'ws://127.0.0.1:46658/websocket',
  'ws://127.0.0.1:46658/queryws',
)

const esclient = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

client.on('error', msg => {
  console.error('Error on connect to client', msg)
})

const web3 = new Web3(new LoomProvider(client, indexerPrivateKey))
const ABI = HackerNoon.abi;
const indexerInstance = new web3.eth.Contract(ABI, HackerNoon.networks.default.address, { from: indexerUserAddress });

indexerInstance.events.StoryPublished((err, event) => {
  if (err) console.error('Error on event', err);
  const {storyId, owner, title, text} = event.returnValues;
  esclient.create({
    index: 'stories',
    type: '_doc',
    id: storyId.toString(),
    body: {
      title: title,
      text: text,
      writer: owner,
    }
  });
  
});
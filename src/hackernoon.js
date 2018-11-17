import {
  Client, LocalAddress, CryptoUtils, LoomProvider
} from 'loom-js'

import Web3 from 'web3'
import HackerNoon from './contracts/HackerNoon.json';

const hackernoonPrivateKey = CryptoUtils.generatePrivateKey()
const hackernoonPublicKey = CryptoUtils.publicKeyFromPrivateKey(hackernoonPrivateKey)
export const hackernoonUserAddress = LocalAddress.fromPublicKey(hackernoonPublicKey).toString()

const client = new Client(
  'default',
  'ws://127.0.0.1:46658/websocket',
  'ws://127.0.0.1:46658/queryws',
)

client.on('error', msg => {
  console.error('Error on connect to client', msg)
})

export function initEvents(onStoryAdded, onStoryPublished) {
  const web3 = new Web3(new LoomProvider(client, hackernoonPrivateKey))
  const ABI = HackerNoon.abi;
  const hackerNoonInstance = new web3.eth.Contract(ABI, HackerNoon.networks.default.address, { from: hackernoonUserAddress });
  hackerNoonInstance.events.StoryAdded((err, event) => {
    if (err) console.error('Error on event', err);
    else if (onStoryAdded) {
      onStoryAdded(event.returnValues);
    }
  });
  hackerNoonInstance.events.StoryPublished((err, event) => {
    if (err) console.error('Error on event', err);
    else if (onStoryPublished) {
      onStoryPublished(event.returnValues);
    }
  });
};
import {
  Client, LocalAddress, CryptoUtils, LoomProvider
} from 'loom-js'

import Web3 from 'web3'
import HackerNoon from './contracts/HackerNoon.json'


const editorPrivateKey = CryptoUtils.generatePrivateKey()
const editorPublicKey = CryptoUtils.publicKeyFromPrivateKey(editorPrivateKey)
export const editorUserAddress = LocalAddress.fromPublicKey(editorPublicKey).toString()


const client = new Client(
  'default',
  'ws://127.0.0.1:46658/websocket',
  'ws://127.0.0.1:46658/queryws',
)

client.on('error', msg => {
  console.error('Error on connect to client', msg)
})

const web3 = new Web3(new LoomProvider(client, editorPrivateKey))

const ABI = HackerNoon.abi;
const hackerNoonInstance = new web3.eth.Contract(ABI, HackerNoon.networks.default.address, { from: editorUserAddress });

export async function publishStory(storyId) {
  return await hackerNoonInstance.methods.publishStory(storyId).send({
    from: editorUserAddress,
  })
}
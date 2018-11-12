import {
  Client, LocalAddress, CryptoUtils, LoomProvider
} from 'loom-js'

import Web3 from 'web3'
import HackerNoon from './contracts/HackerNoon.json'


const writerPrivateKey = CryptoUtils.generatePrivateKey()
const writerPublicKey = CryptoUtils.publicKeyFromPrivateKey(writerPrivateKey)
export const writerUserAddress = LocalAddress.fromPublicKey(writerPublicKey).toString()


const client = new Client(
  'default',
  'ws://127.0.0.1:46658/websocket',
  'ws://127.0.0.1:46658/queryws',
)

client.on('error', msg => {
  console.error('Error on connect to client', msg)
})

const web3 = new Web3(new LoomProvider(client, writerPrivateKey))

const ABI = HackerNoon.abi;
const hackerNoonInstance = new web3.eth.Contract(ABI, HackerNoon.networks.default.address, { from: writerUserAddress });

export async function submitStory(title, text) {
  return await hackerNoonInstance.methods.submitStory(title, text).send({
    from: writerUserAddress,
  })
}
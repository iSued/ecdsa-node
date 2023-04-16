// const secp =
const secp = require("ethereum-cryptography/secp256k1");
//this is how we usually see addresses, in hexadecimal format
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

const privateKey = secp.utils.randomPrivateKey();

console.log("privateKey", toHex(privateKey));

const publicKey = secp.getPublicKey(privateKey);

//this is how we see ethereums addresses
const formattedPubKey = publicKey.slice(1);
const hashedPubKey = keccak256(formattedPubKey);
const address = hashedPubKey.slice(hashedPubKey.length - 20);
const formattedAddress = toHex(address);
console.log("Public Key", formattedAddress);

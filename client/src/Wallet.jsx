import server from "./server";
// const secp =
import * as secp from "ethereum-cryptography/secp256k1";
//this is how we usually see addresses, in hexadecimal format
//change to ES6 import
import toHex from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";

function Wallet({
  address,
  setAddress,
  privateKey,
  setPrivateKey,
  balance,
  setBalance,
}) {
  async function onChange(evt) {
    try {
      console.log(evt.target.value);
      const privateKey = evt.target.value;
      if (!privateKey) return;
      setPrivateKey(privateKey);

      //this is how we see ethereums addresses
      //we are generating the address from the private key
      let address = secp.getPublicKey(privateKey);
      address = address.slice(1);
      address = keccak256(address);
      address = hashedPubKey.slice(address.length - 20);
      address = toHex(address);
      console.log(address);

      setAddress(address);
      if (address) {
        const {
          data: { balance },
        } = await server.get(`balance/${address}`);
        setBalance(balance);
      } else {
        setBalance(0);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>
      {/* In a real application, you would not want to store the private key in
      the browser. what we do is take the signature from a wallet as metamask
      and send it to the server to verify the transaction. */}
      <label>
        Private Key
        <input
          placeholder="Type an address, for example: 0x1"
          value={address}
          onChange={onChange}
        ></input>
      </label>
      <div>Address:{address}</div>
      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;

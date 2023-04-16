import server from "./server";
// const secp =
import * as secp from "ethereum-cryptography/secp256k1";
//this is how we usually see addresses, in hexadecimal format
//change to ES6 import
import { toHex } from "ethereum-cryptography/utils";
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
      setAddress("");
      const privateKey = evt.target.value;
      setPrivateKey(privateKey);

      //this is how we see ethereums addresses
      //we are generating the pubblic address from the private key
      //in real world applications, we would not want to store the private key in any client
      const publicKey = secp.getPublicKey(privateKey);

      //this is how we see ethereums addresses
      const formattedPubKey = publicKey.slice(1);
      const hashedPubKey = keccak256(formattedPubKey);
      const address = hashedPubKey.slice(hashedPubKey.length - 20);
      const formattedAddress = toHex(address);
      console.log("Public Key", formattedAddress);

      setAddress(formattedAddress);
      if (formattedAddress) {
        const {
          data: { balance },
        } = await server.get(`balance/${formattedAddress}`);
        console.log(balance, "this is the balance");
        setBalance(balance);
      } else {
        setBalance(0);
      }
    } catch (error) {}
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
          value={privateKey}
          onChange={onChange}
        ></input>
      </label>
      <div>Address:{address}</div>
      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;

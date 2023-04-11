const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "0447483c216ee17417ecdc92b5a4f5ac3b40018f5b38649533beabf1e336ef6acd9f3a01124014bfd16b452185abbd7190e8652e12fb2b07ef3f1a03a2442400a2": 100,
  "0400745dd5fa02aa19eca2cfdb617c1ae997a4b62c27b12f6eebd5a818e96deb00bf6e0bd010eb9f48efc259d136f93f93d3d3849735c0cbcce92865077b804da2": 50,
  "0478423be2b57a24f746220224439cae21d76fad9650e2a765818305ab4f17f5dac3f9b684a728b89b5761eecc0a2b2bb603940960e9128af7a6a0e9d1fce57870": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}

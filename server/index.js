const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  c496dbcb98b663b217de9b3250a9f22f39d9dd18: 100,
  "99a1e18337ef3e4adbe0a1527ba84c135fb81635": 50,
  "08439db2360d4e01724c6cd09bebf0def6c208d4": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  console.log("address", address);
  const balance = balances[address] || 0;
  console.log("balance", balance);
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

const express = require("express");
const cors = require("cors");
const { generateRandomString, encrypt } = require("./encAndDecFun.js");

const dotenv = require("dotenv");
const app = express();

app.use(cors());
dotenv.config();

const jsonData = require("./data.json");

app.get("/api/data", (req, res) => {
  const algorithm = "aes-256-cbc";
  const privateKey = process.env.KEY;
  const ivStr = generateRandomString();

  const jsonStr = JSON.stringify(jsonData);
  const encryptedData = encrypt(jsonStr, privateKey, ivStr, algorithm);

  res.json({ data: encryptedData + ivStr });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

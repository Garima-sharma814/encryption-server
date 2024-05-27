const crypto = require("crypto");

function generateRandomString() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";
  for (let i = 0; i < 16; i++) {
    randomString += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return randomString;
}

function encrypt(text, password, ivStr, algorithm) {
  const key = Buffer.alloc(32);
  key.write(password, "utf8");

  const iv = Buffer.alloc(16);
  iv.write(ivStr, "utf8");

  let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return encrypted.toString("hex");
}

function decrypt(encryptedData, password, ivStr, algorithm) {
  const key = Buffer.alloc(32);
  key.write(password, "utf8");

  const iv = Buffer.alloc(16);
  iv.write(ivStr, "utf8");

  let encryptedText = Buffer.from(encryptedData, "hex");
  let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
}

module.exports = { generateRandomString, encrypt, decrypt };

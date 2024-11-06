const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const multer = require("multer");
const fs = require("fs");
const pdf = require("pdf-parse");
const axios = require("axios");
const authRouter = require("./routes/auth.route");
const db = require("./db/db.js");
dotenv.config();

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyCRRVNFU2dpnpsCQsXBShgxdZAJyzfdLnQ");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Function to detect headers
const detectHeaders = (lines) => {
  let headers = { date: null, details: null, type: null, amount: null };
  const headerKeys = {
    date: /date/i,
    details: /transaction details|details/i,
    type: /type/i,
    amount: /amount|₹/i,
  };

  lines.some((line, index) => {
    const columns = line.split(/\s{2,}/).map((col) => col.trim());
    console.log(`Line ${index + 1}:`, columns);

    if (columns.length > 1) {
      Object.keys(headerKeys).forEach((key) => {
        columns.forEach((col, i) => {
          if (headerKeys[key].test(col) && headers[key] === null) {
            headers[key] = i;
          }
        });
      });

      if (Object.values(headers).every((val) => val !== null)) {
        return true;
      }
    }
    return false;
  });

  console.log("Detected Headers:", headers); // Log detected headers
  return headers;
};

const parsePDF = async (filePath) => {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdf(dataBuffer);

  const lines = data.text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  const headers = detectHeaders(lines);

  if (Object.values(headers).some((val) => val === null)) {
    console.log("Error: Headers not detected correctly");
    return [];
  }

  const transactions = [];
  let currentTransaction = {};

  lines.forEach((line, index) => {
    const columns = line.split(/\s{2,}/);

    if (
      columns.length > 1 &&
      /[a-zA-Z]/.test(line) === false &&
      /\d{2,4}/.test(columns[0])
    ) {
      if (Object.keys(currentTransaction).length > 0) {
        transactions.push(currentTransaction);
      }
      currentTransaction = {
        date: columns[headers.date] || null,
        details: columns[headers.details] || null,
        type: columns[headers.type] || null,
        amount:
          headers.amount !== null && columns[headers.amount] !== undefined
            ? parseFloat(columns[headers.amount].replace(/[^\d.-]/g, ""))
            : null,
      };
    } else if (currentTransaction.details && columns.length === 1) {
      currentTransaction.details += ` ${columns[0]}`;
    }
  });

  if (Object.keys(currentTransaction).length > 0) {
    transactions.push(currentTransaction);
  }

  return transactions;
};

const categorizeTransaction = async (transactionDetails) => {
  try {
    const prompt = `Read and categorize these transactions: "${transactionDetails}"`;
    const result = await model.generateContent(prompt);

    return result.response.text();
  } catch (error) {
    console.error("Error categorizing transaction:", error);
    return "Uncategorized";
  }
};

const categorizeTransactions = async (transactions) => {
  for (let transaction of transactions) {
    transaction.category = await categorizeTransaction(transaction.details);
  }
  return transactions;
};

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const transactions = await parsePDF(req.file.path);
    const categorizedTransactions = await categorizeTransactions(transactions);

    console.log(categorizedTransactions);
    await db("transactions").insert(categorizedTransactions);
    res.status(200).json({
      message: "Transactions stored successfully",
      transactions: categorizedTransactions,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error parsing PDF or storing transactions" });
  } finally {
    fs.unlinkSync(req.file.path);
  }
});

app.listen(3000, () => console.log("Server started on port 3000"));

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  const success = false;
  return res.status(statusCode).json({
    success,
    statusCode,
    message,
  });
});

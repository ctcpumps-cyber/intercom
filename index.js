/**
 * Proof of Hold™ – Enterprise Edition
 * ------------------------------------
 * Real-time crypto scoring engine
 * Built with Node.js + Express
 */

require("dotenv").config();

const express = require("express");
const axios = require("axios");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();

/* =========================
   CONFIGURATION
========================= */

const PORT = process.env.PORT || 3000;
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 60;

/* =========================
   MIDDLEWARE
========================= */

app.use(helmet());
app.use(express.json());
app.use(morgan("combined"));
app.use(express.static("public"));

/* =========================
   SIMPLE RATE LIMITER
========================= */

const requestLog = {};

app.use((req, res, next) => {
  const ip = req.ip;
  const currentTime = Date.now();

  if (!requestLog[ip]) {
    requestLog[ip] = [];
  }

  requestLog[ip] = requestLog[ip].filter(
    (timestamp) => currentTime - timestamp < RATE_LIMIT_WINDOW
  );

  if (requestLog[ip].length >= MAX_REQUESTS_PER_WINDOW) {
    return res.status(429).json({
      status: "error",
      message: "Too many requests"
    });
  }

  requestLog[ip].push(currentTime);
  next();
});

/* =========================
   IN-MEMORY HOLD STORAGE
========================= */

const holdState = {};

/* =========================
   UTILITY: FETCH PRICE
========================= */

async function fetchPrice(coin) {
  const response = await axios.get(
    `https://api.coingecko.com/api/v3/simple/price`,
    {
      params: {
        ids: coin,
        vs_currencies: "usd"
      }
    }
  );

  if (!response.data[coin]) {
    throw new Error("Invalid coin ID");
  }

  return response.data[coin].usd;
}

/* =========================
   API: START / CHECK HOLD
========================= */

app.post("/api/hold", async (req, res) => {
  try {
    const { address, coin } = req.body;

    if (!address || !coin) {
      return res.status(400).json({
        status: "error",
        message: "Address and coin are required"
      });
    }

    const currentPrice = await fetchPrice(coin);

    if (!holdState[address]) {
      holdState[address] = {
        coin,
        startPrice: currentPrice,
        startTime: Date.now()
      };
    }

    const duration =
      (Date.now() - holdState[address].startTime) / 1000;

    const score =
      (currentPrice - holdState[address].startPrice) * duration;

    return res.json({
      status: "success",
      data: {
        coin,
        currentPrice,
        holdDurationSeconds: Math.floor(duration),
        holdScore: Number(score.toFixed(2))
      }
    });

  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message
    });
  }
});

/* =========================
   HEALTH CHECK
========================= */

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "Proof of Hold™ Engine",
    uptime: process.uptime()
  });
});

/* =========================
   SERVER START
========================= */

app.listen(PORT, () => {
  console.log(`
  🚀 Proof of Hold™ Engine Running
  Environment : ${process.env.NODE_ENV || "development"}
  Port        : ${PORT}
  `);
});

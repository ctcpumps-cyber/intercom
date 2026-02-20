---
name: proof-of-hold
description: Enterprise-grade crypto engagement engine. Real-time price tracking, behavioral scoring (Proof-of-Hold™), gamified retention logic, and Web3-ready architecture.
---

# Proof of Hold – Skill Specification

## Description

Proof of Hold is an enterprise-ready crypto engagement skill designed to gamify token holding behavior through a proprietary scoring mechanism.

The system routes **real-time crypto price monitoring** into a dynamic behavioral scoring engine that calculates user performance based on:

- Price delta
- Holding duration
- Market movement timing

It is built as a modular Node.js service that can evolve into:

- Web3-integrated infrastructure
- DAO-based scoring governance
- NFT reward issuance
- Tokenized engagement platforms

---

## Support

References:
- CoinGecko Public API
- Node.js + Express Architecture
- REST-based modular backend design

---

## Core Capability

### Proof-of-Hold™ Engine

**Formula:**


Hold Score = (Current Price - Entry Price) × Holding Duration

**Why it matters:**

- Encourages long-term holding behavior
- Introduces gamification layer to crypto dashboards
- Creates leaderboard-ready scoring infrastructure
- Can be extended to on-chain validation logic

---

## System Architecture

### High-Level Flow


Client (Browser) │ ▼ Express API Layer │ ▼ Scoring Engine Module │ ▼ Market Data API (CoinGecko)

---

## Repository & Version Pins

Recommended environment:

- Node.js (LTS)
- Express (stable)
- Axios (latest stable)
- TailwindCSS (CDN or build pipeline)

For production:
- MongoDB / PostgreSQL
- Redis (caching layer)
- PM2 (process manager)
- Nginx (reverse proxy)

---

## Operating Modes

Proof of Hold supports multiple operational modes:

### 1. Demo Mode (Stateless)
- In-memory hold tracking
- Resets on server restart
- Ideal for MVP & testing

### 2. Persistent Mode
- Database-backed wallet state
- Leaderboard capability
- Suitable for production

### 3. Web3 Mode (Future Expansion)
- Wallet signature verification
- Smart contract score validation
- NFT reward minting logic

---

## Indexer & Scaling Guidance

For high-traffic environments:

- Implement API rate limiting
- Introduce Redis caching
- Deploy behind load balancer
- Enable horizontal scaling
- Use environment variable configuration

For financial-grade usage:
- Redundant API fallback providers
- Logging + monitoring stack
- DDoS protection layer

---

## Contracts & On-Chain Expansion (Future)

If migrating to smart contract scoring:

- Lock contract version after deployment
- Ensure deterministic scoring logic
- Prevent signature mismatch
- Maintain version control across contract upgrades

---

## First-Run Decisions (Must Be Explicit)

Before deployment, define:

1. Stateless vs Persistent mode
2. Database engine (if persistent)
3. Authentication layer (JWT or none)
4. Rate limiting configuration
5. Public vs internal API exposure
6. Leaderboard visibility (public/private)
7. Web3 integration enabled/disabled

---

## Agent / Service Control Surface

Minimum enterprise recommendations:

- Input validation middleware
- Error boundary handling
- Structured JSON responses
- Centralized logging
- Environment-based configuration
- Secure header enforcement (Helmet-ready)

For Web3 expansion:
- Wallet verification gate
- Signature-based request validation
- Contract version synchronization

---

## Security Notice

Current baseline:

- No private key storage
- No real wallet custody
- Public market data only
- In-memory state by default

Enterprise hardening recommended before production deployment.

---

## Engineering Maturity

| Layer | Current | Enterprise Target |
|--------|---------|------------------|
| Backend API | MVP | Hardened |
| Persistence | None | Database-backed |
| Security | Basic | Hardened |
| Scaling | Local | Horizontal |
| Web3 | Conceptual | On-chain Verified |

---

## Summary

Proof of Hold is not just a crypto tracker.

It is a behavioral crypto engagement engine designed to evolve into:

- Web3 gamification infrastructure  
- DAO scoring protocol  
- Tokenized loyalty system  
- Enterprise crypto analytics backend  

---

License: MIT  
Status: Enterprise Prototype



# LedgerGram — Architecture & Design Overview

LedgerGram is a lightweight social feed application where posts and likes are **anchored on-chain** while the user experience remains fast and familiar. The system uses **FireFly as a blockchain abstraction layer**, enabling reliable event-driven synchronization between smart contracts and the application backend.

---

## Setting up your FireFly on your machine

1. Install the [FireFly CLI here](https://github.com/hyperledger/firefly-cli?tab=readme-ov-file#install-the-cli)
2. Create a FireFly stack by running:
   ```bash
   ff init dev --block-period 2 -p 5505 -n besu # Please set this. We expect you to use 2 second block period for this project (as real world blockchains are not instantaneous)
   ```
3. Start the FireFly stack by running:
   ```bash
   ff start dev
   ```
4. When you're done, you will have FireFly and all its microservices, including your very own private blockchain, running on your machine.

> If you are on Windows or Linux, please **make sure you read the** the hints and tips on [this page](https://hyperledger.github.io/firefly/latest/gettingstarted/firefly_cli/)

If you run into issues, use the following resources to help:

1. [FireFly Getting Started Guide](https://hyperledger.github.io/firefly/latest/gettingstarted/firefly_cli/)
2. [FireFly CLI README](https://github.com/hyperledger/firefly-cli)

## Getting this repo up and running

This repo has three directories in it:

- `solidity`: Two example solidity contracts that can be compiled, tested, and deployed with Hardhat. [Go to the Readme](./solidity/)
- `backend`: A very simple TypeScript Node.js app that uses the FireFly SDK to interact with a custom smart contract. [Go to the Readme](./backend/)
- `frontend`: A TypeScript React UI bootstrapped with [vite](https://vitejs.dev/guide/) that calls the API in the backend. [Go to the Readme](./frontend/)

You will need to first deploy the smart contracts with Hardhat to FireFly. Once the backend/frontend are started, the buttons on the Web UI will call the backend API endpoints to interact with the contracts through FireFly.

---

## 🧱 High-Level Architecture

### Components

**Frontend (React + MUI)**

* Displays feed, profile, posts, and likes
* Supports periodic polling
* Communicates with backend via REST APIs

**Backend (Node.js + TypeORM)**

* Exposes REST APIs for posts, likes, and feeds
* Persists posts in PostgreSQL
* Submits blockchain transactions via FireFly

**FireFly**

* Abstracts blockchain interactions
* Submits smart contract transactions
* Listens for blockchain events
* Delivers normalized event data to backend

**Blockchain (EVM)**

* Stores canonical record of posts and likes
* Emits events for post creation and likes
* Provides immutability and auditability

**Database (PostgreSQL)**

* Caches feed state for fast reads
* Stores transaction hashes and block references
* 

---

## 🔁 Data Flow

### Creating an Account
1. User fill out registration form
2. User submits form
3. Backend persist user information
4. User information will be stored in the browser

### Creating a Post

1. User submits a post from the UI
2. Backend sends a transaction request to FireFly
3. Smart contract emits `PostCreated` event
4. FireFly captures and forwards the event
5. Backend persists the post with:
   * postId
   * transactionHash
   * blockNumber
6. UI reconciles on refresh

### Liking a Post

1. User taps “Like”
3. Backend submits like transaction via FireFly
4. Smart contract emits `PostLiked` event
5. Backend updates like count
6. UI updates immediately through refresh

---

## 🔐 Blockchain Referencing Strategy

The application **does not reference blocks directly**.

Instead, each on-chain action is anchored using:

* **Transaction hash**
* **Block number (optional but stored)**
* **Event metadata**

This provides:

* Verifiable on-chain proof
* Easy debugging and auditing
* Blockchain-agnostic extensibility

---

## 🗄️ Data Model (Simplified)

**Post**

* postId
* accountId
* content
* likeCount
* transactionHash
* blockNumber
* createdAt

**Account**

* accountId
* firstName
* lastName
* username
* hashPassword
* createdAt

## 🌐 API Design

### Accounts

**Create Account**

* POST `/register`
* Create new account

**Login**

* POST `/login`
* Login using username and password

---

### Posts

**Create Post**

* POST `/posts`
* Submits a blockchain transaction
* Returns immediately for optimistic UI

**Get Feed**

* GET `/posts`
* Returns cached posts ordered by creation time
* Supports periodic polling and pull-to-refresh

---

**Like Post**

* PUT `/posts/{postId}`
* Increase the like count of a post

---

## ⚡ Performance & UX Decisions

### Eventual Consistency

* UI updates on refresh
* Polling every 5 seconds for new data

---

## 🧠 Key Design Choices

### Why FireFly?

* Abstracts blockchain complexity
* Provides reliable event delivery
* Simplifies transaction lifecycle management

### Why Not Read Directly From Chain?

* Blockchain reads are slow and expensive
* Poor UX for feeds and pagination
* Database enables scalable reads

### Why Store Transaction Hashes?

* Enables on-chain verification
* Provides auditability
* Decouples UI from blockchain specifics

---

## 🛡️ Consistency & Safety

* Backend enforces idempotency
* Blockchain remains the source of truth
* Events drive state reconciliation

---

## 🚀 Future Improvements

* WebSocket-based feed updates
* Optimistic UI update
* Supports pull-to-refresh
* Enables pagination, sorting, and filtering
* Prevents double likes per user


# Backend: Kaleido Developer Challenge

A very simple TypeScript Node.js app that uses the FireFly SDK to interact with the [example solidty smart contracts](../solidity/contracts/).

## Configuration

You are provided a basic [config.json](./config.json) file to help with setting up your app. The provided values will guide you to get the existing app up and running.

You will need the address from: `ff accounts list <StackName>`

You will need the output from when you installed your Hardhat contracts.

Store the values in the config.json

Understanding how that translates through FireFly into signing transactions on the blockchain will be useful to you.

## Run

```bash
npm install
npm start
docker compose up
```

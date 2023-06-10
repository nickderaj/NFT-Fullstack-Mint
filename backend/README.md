## Table of Contents

1. [Introduction](#introduction)
2. [Project Setup](#project-setup)

## Introduction

This is a very simple api with a postgres db integrated in the docker compose file. Included are:

- crypto: A package that provides cryptographic functionality, such as generating secure random numbers, creating hashes, and encrypting and decrypting data. It includes various cryptographic algorithms and utilities.
- ethers: A library that allows interaction with the Ethereum blockchain and smart contracts. It provides a high-level API for working with Ethereum accounts, signing transactions, querying blockchain data, and deploying and interacting with smart contracts.
- express: A popular web application framework for Node.js that simplifies the process of building web servers and APIs. Express provides a robust set of features for handling HTTP requests, routing, middleware, and view rendering. It is widely used for creating backend applications and RESTful APIs.
- pg: A PostgreSQL database client for Node.js. It enables interaction with PostgreSQL databases from a Node.js application. The pg package provides methods for executing SQL queries, managing transactions, and working with data returned from the database. It is commonly used when developing applications that need to connect to and interact with PostgreSQL databases.

## Project Setup

1. Run `npm i`
2. Run `docker-compose up`
3. Call a GET request at `http://localhost:5431/migrate` to spin up the database.

Note: The .env file was committed for simplicity but in a real project it would be gitignored.

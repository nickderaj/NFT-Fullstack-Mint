## Table of Contents

1. [Introduction](#introduction)
2. [Project Setup](#project-setup)
3. [Functions](#functions)
4. [Screenshots](#screenshots)

## Introduction

This is a very simple api with a postgres db integrated in the docker compose file. Included are:

- crypto: A package that provides cryptographic functionality, such as generating secure random numbers, creating hashes, and encrypting and decrypting data. It includes various cryptographic algorithms and utilities.
- ethers: A library that allows interaction with the Ethereum blockchain and smart contracts. It provides a high-level API for working with Ethereum accounts, signing transactions, querying blockchain data, and deploying and interacting with smart contracts.
- express: A popular web application framework for Node.js that simplifies the process of building web servers and APIs. Express provides a robust set of features for handling HTTP requests, routing, middleware, and view rendering. It is widely used for creating backend applications and RESTful APIs.
- pg: A PostgreSQL database client for Node.js. It enables interaction with PostgreSQL databases from a Node.js application. The pg package provides methods for executing SQL queries, managing transactions, and working with data returned from the database. It is commonly used when developing applications that need to connect to and interact with PostgreSQL databases.

## Project Setup

1. Run `npm i`
2. Configure the .env variables if necessary
3. Run `docker-compose up`
4. Send a GET request to `http://localhost:5431/migrate` to spin up the database.

Note: The .env file was committed for simplicity but in a real project it would be gitignored.

## Functions

1. healthCheck:

- Description: This function is used to perform a health check on the server. It returns a status code of 200 and the message "OK" to indicate that the server is running and functioning properly.
- Method: GET
- URL: /health
- Request Parameters: None
- Request Body: None
- Response Body:
  - Status: 200
  - Body: "OK"

2. migrateDb:

- Description: This function is used to migrate the database by creating a new "users" table. It first drops the existing "users" table if it exists, and then creates a new "users" table with columns for "wallet" and "nric". The "wallet" column is set as the primary key, and the "nric" column is set as unique and not nullable.
- Method: POST
- URL: /migrate
- Request Parameters: None
- Request Body: None
- Response Body:
  - Status: 200
  - Body: { "message": "Migrated!" }

3. generateReceipt:

- Description: This function is used to generate a receipt for a given request. It takes the "nric" and "wallet" from the request body, encrypts the receipt using AES-256-CBC encryption with a randomly generated initialization vector (IV) and the encryption key, and then hashes the receipt using the Ethereum hashing algorithm. The encrypted receipt and hashed receipt are returned in the response body.
- Method: POST
- URL: /receipts/generate
- Request Parameters: None
- Request Body:
  - nric: string (required) - The NRIC (National Registration Identity Card) of the user.
  - wallet: string (required) - The wallet address of the user.
- Response Body:
  - Status: 200
  - Body: { "encryptedReceipt": string, "hashedReceipt": string }

4. fetchUser:

- Description: This function is used to fetch a user from the database based on their wallet address. It retrieves the user's "nric" and "wallet" from the database and returns them in the response body. If the user is not found, it returns a message indicating the same.
- Method: GET
- URL: /users/:wallet
- Request Parameters:
- wallet: string (required) - The wallet address of the user.
- Request Body: None
- Response Body:
  - Status: 200
  - Body (if user is found): { "message": "fetched user!", "user": { "nric": string, "wallet": string } }
  - Body (if user is not found): { "message": "User not found!" }

5. createUser:

- Description: This function is used to create a new user in the database. It takes the "wallet" and "nric" from the request body, inserts them into the "users" table in the database, and returns a success message along with the created user details in the response body.
- Method: POST
- URL: /users
- Request Parameters: None
- Request Body:
  - wallet: string (required) - The wallet address of the user.
  - nric: string (required) - The NRIC (National Registration Identity Card) of the user.
- Response Body:
  - Status: 200
  - Body: { "message": "Created user!", "user": { "nric": string, "wallet": string }}

## Screenshots

| <img src="screenshots\1.png" width="500"> |
| :---------------------------------------: |
|  **Figure 1.** _Configure Env Variables_  |

| <img src="screenshots\2.png" width="500"> |
| :---------------------------------------: |
|   **Figure 2.** _Run docker-compose up_   |

| <img src="screenshots\3.png" width="500"> |
| :---------------------------------------: |
|     **Figure 3.** _Server is running_     |

| <img src="screenshots\4.png" width="500"> |
| :---------------------------------------: |
|     **Figure 4.** _Migrate Database_      |

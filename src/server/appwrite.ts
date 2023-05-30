import { Client, Account, ID } from "appwrite";

export const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
  .setProject("[PROJECT_ID]"); // Your project ID

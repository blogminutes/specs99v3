import { ApiError, Client, Environment } from "square";

export const client = new Client({
  environment: Environment.Sandbox,
  accessToken: process.env.NEXT_PUBLIC_SQUARE_ACCESS_TOKEN,
});

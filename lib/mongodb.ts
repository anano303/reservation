import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI as string;
if (!uri) throw new Error("MONGO_URI is not defined");

const client = new MongoClient(uri);
export async function connectToDatabase() {
  if (!client.connect) await client.connect();
  return client.db("reservation");
}

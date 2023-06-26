import { MongoClient, Db } from "mongodb";

const uri: any = process.env.DB_HOST;

let client: MongoClient;
let database: Db;

async function connect(): Promise<void> {
  client = await MongoClient.connect(uri);
  database = client.db();
}

function getDatabase(): Db {
  return database;
}

function getClient(): MongoClient {
  return client;
}

export { connect, getDatabase, getClient };

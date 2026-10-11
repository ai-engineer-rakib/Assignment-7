import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

let clientPromise;
if (!global._bazarMongo) {
  const client = new MongoClient(uri || "mongodb://127.0.0.1:27017");
  global._bazarMongo = client.connect();
}
clientPromise = global._bazarMongo;

export default clientPromise;
export const dbName = process.env.MONGODB_DB || "bazardor";

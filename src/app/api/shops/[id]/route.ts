import clientPromise from "@/utils/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const shop = new ObjectId(req.url.slice(req.url.lastIndexOf("/") + 1));

  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection("products");
  const result = await collection.find({ shop }).toArray();

  return NextResponse.json(result);
}

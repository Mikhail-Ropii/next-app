import clientPromise from "@/utils/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection("shops");

  const result = await collection.find().toArray();

  return NextResponse.json(result);
}

import { getDatabase } from "@/utils/mongodb";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  const db = getDatabase();
  const collection = db.collection("shops");

  const result = await collection.find().toArray();

  return NextResponse.json(result);
}

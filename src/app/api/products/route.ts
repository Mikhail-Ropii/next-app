import clientPromise from "@/utils/mongodb";
import { time } from "console";
import { NextResponse } from "next/server";

interface ExtendedRequest extends Request {
  params: {
    [key: string]: string | string[];
  };
}

export async function POST(req: ExtendedRequest, res: Response) {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection("products");

  const { shopId: shop } = req.params;
  const result = await collection.find({ shop }).toArray();

  return NextResponse.json(result);
}

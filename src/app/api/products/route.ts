import { getDatabase } from "@/utils/mongodb";
import { NextResponse } from "next/server";

interface ExtendedRequest extends Request {
  params: {
    [key: string]: string | string[];
  };
}

export async function POST(req: ExtendedRequest, res: Response) {
  const db = getDatabase();
  const collection = db.collection("orders");

  const { shopId: shop } = req.params;
  const result = await collection.find({ shop }).toArray();

  return NextResponse.json(result);
}

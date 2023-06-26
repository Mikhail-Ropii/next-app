import { getDatabase } from "@/utils/mongodb";
import { NextResponse } from "next/server";
import { ordersSchema } from "@/validations/ordersValidation";

export async function POST(req: Request, res: Response) {
  const body = await req.json();

  const { error } = ordersSchema.validate(body);
  if (error) {
    console.error("Invalid order data:", error.details);
    return;
  }

  const db = getDatabase();
  const collection = db.collection("orders");

  const result = await collection.insertOne(body);

  return NextResponse.json(result);
}

interface ExtendedRequest extends Request {
  query: {
    [key: string]: string | string[];
  };
}

export async function GET(req: ExtendedRequest, res: Response) {
  const db = getDatabase();
  const collection = db.collection("orders");

  const { email, phone } = req.query;

  const result = await collection
    .find({
      "userData.email": email,
      "userData.phone": phone,
    })
    .toArray();

  return NextResponse.json(result);
}

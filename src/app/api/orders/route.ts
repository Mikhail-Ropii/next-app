import clientPromise from "@/utils/mongodb";
import { NextResponse } from "next/server";
import { ordersSchema } from "@/validations/ordersValidation";

export async function POST(req: Request, res: Response) {
  const body = await req.json();

  const { error } = ordersSchema.validate(body);
  if (error) {
    console.error("Invalid order data:", error.details);
    return;
  }
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection("orders");

  const result = await collection.insertOne(body);

  return NextResponse.json(result);
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection("orders");

  const email = searchParams.get("email");
  const phone = searchParams.get("phone");

  const result = await collection
    .find({
      "userData.email": email,
      "userData.phone": phone,
    })
    .toArray();

  return NextResponse.json(result);
}

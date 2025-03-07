import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  const db = await connectToDatabase();
  const reservations = await db.collection("reservations").find().toArray();
  return NextResponse.json(reservations);
}

export async function POST(req: Request) {
  const db = await connectToDatabase();
  const { productId, date, user } = await req.json();

  // ვამოწმებთ, უკვე ხომ არ არის დაჯავშნილი
  const existingReservation = await db
    .collection("reservations")
    .findOne({ productId, date });

  if (existingReservation) {
    return NextResponse.json(
      { error: "ეს თარიღი უკვე დაჯავშნილია!" },
      { status: 400 }
    );
  }

  // თუ თავისუფალია, ვინახავთ
  const result = await db
    .collection("reservations")
    .insertOne({ productId, date, user });
  return NextResponse.json(result);
}

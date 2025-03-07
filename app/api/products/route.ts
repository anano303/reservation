import { connectToDatabase } from "@/lib/mongodb";
export async function GET() {
  const db = await connectToDatabase();
  const products = await db.collection("products").find().toArray();
  return Response.json(products);
}
export async function POST(req: Request) {
  const db = await connectToDatabase();
  const { name, price } = await req.json();
  const result = await db.collection("products").insertOne({ name, price });
  return Response.json(result);
}

import { connectToDatabase } from "@/lib/mongodb";
import * as bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const db = await connectToDatabase();
  const { email, password } = await req.json();

  // შეამოწმე, არსებობს თუ არა უკვე ეს მომხმარებელი
  const existingUser = await db.collection("users").findOne({ email });
  if (existingUser) {
    return Response.json(
      { error: "მომხმარებელი უკვე არსებობს" },
      { status: 400 }
    );
  }

  // პაროლის დაშიფვრა
  const hashedPassword = await bcrypt.hash(password, 10);

  // მომხმარებლის შექმნა
  const result = await db.collection("users").insertOne({
    email,
    password: hashedPassword,
  });

  return Response.json({ message: "რეგისტრაცია წარმატებულია" });
}

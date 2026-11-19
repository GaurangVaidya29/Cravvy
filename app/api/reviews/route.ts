import { sql } from "@/lib/db";
export async function POST(request: Request) {
  let body: unknown;
  try { body = await request.json(); } catch { return Response.json({ error: "Please send valid JSON." }, { status: 400 }); }
  const { restaurantId, rating, comment } = body as Record<string, unknown>;
  if (!Number.isInteger(rating) || (rating as number) < 1 || (rating as number) > 5) return Response.json({ error: "Rating must be a whole number from 1 to 5." }, { status: 400 });
  if (typeof comment !== "string" || !comment.trim()) return Response.json({ error: "Comment cannot be empty." }, { status: 400 });
  const restaurants = await sql`SELECT id FROM restaurants WHERE id = ${restaurantId as number}`;
  if (!restaurants.length) return Response.json({ error: "That restaurant does not exist." }, { status: 400 });
  const [review] = await sql`INSERT INTO reviews (restaurant_id, rating, comment) VALUES (${restaurantId as number}, ${rating as number}, ${comment.trim()}) RETURNING id`;
  return Response.json({ success: true, reviewId: review.id }, { status: 201 });
}

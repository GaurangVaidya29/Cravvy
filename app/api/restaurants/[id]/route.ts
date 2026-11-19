import { sql } from "@/lib/db";
export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id: idText } = await params; const id = Number(idText);
  if (!Number.isInteger(id)) return Response.json({ error: "Restaurant not found." }, { status: 404 });
  const [restaurant] = await sql`SELECT id, name, cuisine, area FROM restaurants WHERE id = ${id}`;
  if (!restaurant) return Response.json({ error: "Restaurant not found." }, { status: 404 });
  const [summary] = await sql`SELECT AVG(rating) AS average_rating, COUNT(*)::int AS total_reviews FROM reviews WHERE restaurant_id = ${id}`;
  const rows = await sql`SELECT id, rating, comment, created_at FROM reviews WHERE restaurant_id = ${id} ORDER BY created_at DESC, id DESC`;
  const toReview = (review: Record<string, unknown>) => ({ id: review.id as number, rating: review.rating as number, comment: review.comment as string, createdAt: review.created_at as string });
  const [latest, ...older] = rows;
  return Response.json({ name: restaurant.name, cuisine: restaurant.cuisine, area: restaurant.area, averageRating: summary.average_rating === null ? null : Number(Number(summary.average_rating).toFixed(1)), totalReviews: summary.total_reviews, latestReview: latest ? toReview(latest) : null, reviews: older.map(toReview) });
}

"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

type Review = { id: number; rating: number; comment: string; createdAt: string };
type Restaurant = { name: string; cuisine: string; area: string; averageRating: number | null; totalReviews: number; latestReview: Review | null; reviews: Review[] };
const date = (value: string) => new Date(value).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
export default function RestaurantPage({ params }: { params: Promise<{ id: string }> }) {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null); const [error, setError] = useState(""); const [id, setId] = useState("");
  useEffect(() => { params.then(({ id: restaurantId }) => { setId(restaurantId); fetch(`/api/restaurants/${restaurantId}`).then(async response => response.ok ? setRestaurant(await response.json()) : setError("Restaurant not found.")).catch(() => setError("Unable to load the restaurant.")); }); }, [params]);
  if (error) return <main><p className="error">{error}</p></main>;
  if (!restaurant) return <main><p className="muted">Loading restaurant…</p></main>;
  const reviewCard = (review: Review) => <><p className="review-meta">{review.rating} / 5 · {date(review.createdAt)}</p><p>{review.comment}</p></>;
  return <main><p className="eyebrow">Restaurant</p><h1>{restaurant.name}</h1><p className="muted">{restaurant.cuisine} · {restaurant.area}</p>
    <section className="rating"><strong>{restaurant.averageRating ?? "—"}</strong><span>{restaurant.totalReviews} {restaurant.totalReviews === 1 ? "review" : "reviews"}</span></section>
    {restaurant.latestReview ? <><p className="section-label">Latest review</p><article className="review-feature">{reviewCard(restaurant.latestReview)}</article><p className="section-label">Earlier reviews</p><ul className="review-list">{restaurant.reviews.map(review => <li key={review.id}>{reviewCard(review)}</li>)}</ul></> : <p className="empty">No reviews yet. Be the first to share your experience.</p>}
    <Link className="write-link" href={`/review/${id}`}>Write a review</Link>
  </main>;
}

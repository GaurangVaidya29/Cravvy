# Cravvy

<p align="center">
  <img src="public/cravvy-logo.svg" alt="Cravvy" width="220" />
</p>

<p align="center">A focused restaurant-discovery and review experience for Mumbai.</p>

<p align="center"><a href="https://zomato-lite-silk-psi.vercel.app/"><strong>View live app →</strong></a></p>

## What is Cravvy?

Cravvy helps people decide where to eat by combining restaurant discovery with clear, useful reviews. Users can browse Mumbai restaurants, narrow results by cuisine and dietary preference, compare ratings and price, read recent feedback, and add a review of their own.

The product is deliberately simple: the interface presents information, while the backend stores the facts and calculates answers such as average ratings and review counts.

## Features

- Browse restaurants in Mumbai
- Search by restaurant name, cuisine, or area
- Filter by cuisine, vegetarian, and non-vegetarian options
- Sort by top rated, most reviewed, or price for two
- View restaurant details, rating breakdowns, latest reviews, and older reviews
- Submit a review with an overall rating, comment, name, and optional food, service, and atmosphere scores
- Mark a review as helpful
- Switch between light and dark themes
- Mobile-first, responsive interface with Cravvy branding

## Product principles

- **Store facts, compute answers.** Individual ratings and reviews are stored; averages and totals are calculated from them.
- **Keep logic on the server.** The frontend renders API responses rather than calculating averages or sorting review data itself.
- **Validate at the backend.** Review ratings, comments, and restaurant IDs are checked before anything is written to the database.
- **Design for quick decisions.** Location, cuisine, price, rating, dietary information, and recency are visible where people need them.

## Tech stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 15 with App Router and TypeScript |
| UI | React, Tailwind CSS, custom CSS |
| Database | Neon Postgres |
| Database access | `@neondatabase/serverless` with raw SQL |
| Deployment | Vercel |

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Restaurant discovery, search, filters, and sort controls |
| `/restaurant/[id]` | Restaurant details, ratings, reviews, and helpful votes |
| `/review/[restaurantId]` | Write and submit a restaurant review |

## API

| Endpoint | Method | Description |
| --- | --- | --- |
| `/api/restaurants` | `GET` | Lists restaurants with search, filter, and sort support |
| `/api/restaurants/[id]` | `GET` | Returns a restaurant, computed rating data, and reviews |
| `/api/cuisines` | `GET` | Returns available cuisines |
| `/api/reviews` | `POST` | Validates and creates a review |
| `/api/reviews/[id]/helpful` | `POST` | Toggles the current visitor’s helpful vote for a review |

### Example: create a review

```json
{
  "restaurantId": 1,
  "rating": 5,
  "comment": "Excellent food and a relaxed atmosphere.",
  "authorName": "Gaurang",
  "foodRating": 5,
  "serviceRating": 4,
  "atmosphereRating": 4
}
```

## Database design

Cravvy uses Postgres tables for restaurants, restaurant images, reviews, extra review details, and helpful votes.

The important design decision is what is *not* stored: there is no `average_rating` or `latest_review` column. Those are computed fresh from saved reviews, so the product does not risk showing stale information.

```text
restaurants ──< restaurant_images
     │
     └──< reviews ──< review_votes
              │
              └── review_details
```

## Run locally

### 1. Clone the project

```bash
git clone https://github.com/GaurangVaidya29/Cravvy.git
cd Cravvy
```

### 2. Install dependencies

```bash
npm install
```

### 3. Add environment variables

Create a `.env.local` file in the project root:

```env
DATABASE_URL=postgresql://your-neon-connection-string
```

Never commit `.env.local` or a real database connection string to GitHub.

### 4. Set up the database

```bash
npm run db:setup
```

This applies the schema and seeds the initial restaurant data.

### 5. Start the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the development server |
| `npm run build` | Builds the production app |
| `npm run start` | Runs the production build locally |
| `npm run lint` | Runs linting checks |
| `npm run db:setup` | Applies the database schema and seed data |

## Deployment

Cravvy is deployed on Vercel. To deploy your own copy:

1. Push the repository to GitHub.
2. Import the repository into Vercel.
3. Add `DATABASE_URL` in **Project Settings → Environment Variables**.
4. Deploy.

> The build can succeed without `DATABASE_URL`, but database-backed routes will fail when visitors use the app. Always add the environment variable before deploying.

## Repository structure

```text
app/
  api/                  # Backend API routes
  restaurant/[id]/       # Restaurant detail page
  review/[restaurantId]/ # Review form
  page.tsx               # Discovery home page
components/
  ThemeToggle.tsx        # Light/dark theme toggle
db/
  schema.sql             # Postgres schema
  setup.mjs              # Database setup and seed script
public/
  cravvy-logo*.svg       # Brand assets
```

## Future improvements

- Restaurant photos managed from the database instead of static presentation art
- More review dimensions such as value for money and accessibility
- Restaurant opening hours and map links
- Saved restaurants and personalised lists
- Pagination or infinite scrolling as the catalogue grows

---

Built as a product-management learning project to demonstrate how a real frontend, backend, API, database, GitHub repository, and deployment work together.

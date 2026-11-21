import { sql } from "@/lib/db";
export async function GET(){return Response.json((await sql`SELECT DISTINCT cuisine FROM restaurants ORDER BY cuisine`).map(r=>r.cuisine));}

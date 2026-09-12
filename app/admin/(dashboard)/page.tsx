import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function AdminPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-6xl">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>

          <p className="mt-2 text-gray-600">Welcome, {user?.email}</p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/admin/properties"
            className="rounded-xl border bg-background p-6 transition hover:bg-muted"
          >
            <h2 className="text-xl font-semibold">Properties</h2>

            <p className="mt-2 text-sm text-muted-foreground">
              View, edit and delete your property listings.
            </p>

            <span className="mt-6 inline-block text-sm font-medium">
              Manage Properties →
            </span>
          </Link>

          <Link
            href="/admin/properties/new"
            className="rounded-xl border bg-background p-6 transition hover:bg-muted"
          >
            <h2 className="text-xl font-semibold">Add Property</h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Create a new property listing.
            </p>

            <span className="mt-6 inline-block text-sm font-medium">
              Add Property →
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}

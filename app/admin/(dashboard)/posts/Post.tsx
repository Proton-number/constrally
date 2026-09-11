import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function AdminPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <main className="p-8 min-h-screen">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <p className="mt-4">Welcome, {user.email}</p>

      <div className="mt-8">
        <a
          href="/admin/posts"
          className="rounded bg-black px-4 py-2 text-white"
        >
          Manage Posts
        </a>
      </div>
    </main>
  );
}

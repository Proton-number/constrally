import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  // Optional: Add admin role check here once your roles table exists

  return (
    <div className="admin-shell">
      {/* Shared admin sidebar/nav can go here */}
      <main>{children}</main>
    </div>
  );
}

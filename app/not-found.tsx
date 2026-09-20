import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen">
      <h2>404 - Page Not Found</h2>
      <p>Could not find the requested resource.</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}

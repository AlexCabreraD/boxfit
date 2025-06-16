import Link from "next/link";

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="font-accent text-6xl mb-4 text-boxing-red">404</h1>
        <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you&#39;re looking for doesn&#39;t exist.
        </p>
        <Link
          href="/"
          className="bg-boxing-red text-white px-6 py-3 rounded-button font-bold hover:bg-opacity-90 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}

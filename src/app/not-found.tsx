import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto p-6">
        <h1 className="font-accent text-6xl mb-4 text-boxing-red">404</h1>
        <h2 className="text-2xl font-bold mb-4 text-boxing-black">
          Page Not Found
        </h2>
        <p className="text-caption-text mb-8">
          The page you&#39;re looking for doesn&#39;t exist or has been moved.
        </p>
        <div className="space-y-4">
          <Link
            href="/"
            className="block bg-boxing-red text-white px-6 py-3 rounded-button font-bold hover:bg-opacity-90 transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/programs"
            className="block bg-boxing-black text-white px-6 py-3 rounded-button font-bold hover:bg-steel-gray transition-colors"
          >
            View Programs
          </Link>
        </div>
      </div>
    </div>
  );
}

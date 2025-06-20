"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center max-w-md mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4 text-boxing-black">
              Something went wrong!
            </h2>
            <p className="text-caption-text mb-6">
              We apologize for the inconvenience. Please try refreshing the
              page.
            </p>
            <button
              onClick={() => reset()}
              className="bg-boxing-red text-white px-6 py-3 rounded-button font-bold hover:bg-opacity-90 transition-colors"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}

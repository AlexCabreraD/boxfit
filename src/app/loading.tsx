export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-boxing-red mx-auto mb-4"></div>
        <p className="text-caption-text text-lg">Loading BoxFit Utah...</p>
      </div>
    </div>
  );
}

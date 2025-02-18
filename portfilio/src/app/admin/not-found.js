export default function NotFound() {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="text-2xl mt-4">Oops! Page Not Found.</p>
        <a href="/" className="mt-6 text-blue-500 underline">Go back home</a>
      </div>
    );
  }
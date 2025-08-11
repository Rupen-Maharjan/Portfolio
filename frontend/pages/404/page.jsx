import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f1018] text-white p-6">
      <div className="bg-[#141521] px-10 py-12 rounded-2xl shadow-xl max-w-md text-center">
        <h1 className="text-6xl font-bold mb-4 text-purple-500">404</h1>
        <p className="text-lg text-gray-300 mb-6">
          Oops! The page you’re looking for doesn’t exist.
        </p>
        <Link
          to="/"
          className="inline-block bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white px-6 py-2 rounded-full font-semibold transition"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

import React from "react";
import { Link } from "react-router-dom";

const App = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center">
          Welcome to our App!
        </h2>
        <p className="text-lg text-gray-700 text-center">
          We're glad to have you here.
        </p>
        <div className="mt-8 flex justify-center">
          <Link
            to="/login"
            className="text-indigo-600 font-semibold hover:text-indigo-800"
          >
            <button className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Continue
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default App;

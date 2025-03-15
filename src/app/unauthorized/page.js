import React from "react";

const unauthorized = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-900 text-white">
      <h1 className="text-6xl font-bold mb-4">401</h1>
      <h2 className="text-2xl font-semibold mb-8">Unauthorized Access</h2>
      <p className="text-lg mb-8">
        Sorry, you do not have permission to access this page.
      </p>
      <a
        href="/"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
      >
        Return Home
      </a>
    </div>
  );
};

export default unauthorized;

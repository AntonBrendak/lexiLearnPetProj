import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-green-600 tracking-tight">LexiLearn</h1>
        {/* Навигация */}
      </header>
      <main className="flex-1 px-4 md:px-8 py-8">{children}</main>
      <footer className="bg-white py-4 text-center text-sm text-gray-400 mt-auto">
        &copy; 2025 LexiLearn. All rights reserved.
      </footer>
    </div>
  );
}
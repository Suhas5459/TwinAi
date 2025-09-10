// src/components/Layout.jsx
export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-[90%] max-w-md">
        {children}
      </div>
    </div>
  );
}

import React from "react";
// import "./App.css";
import "./build/tailwind.css";
import Central from "./components/Central.js";

function App() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-900">
      <Central />
    </div>
  );
}

export default App;

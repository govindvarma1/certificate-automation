import React from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();
    return (
        <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-4 flex justify-between items-center z-10 shadow-lg">
            <h1 className="text-xl font-bold">Your Logo/Title</h1>
            <nav>
                <button onClick={() => {navigate("/")}} className="text-white hover:text-gray-200 transition duration-300 ease-in-out mr-4 mb-1">
                    Create Cretificate
                </button>
                <button onClick={() => {navigate("/view")}} className="text-white hover:text-gray-200 transition duration-300 ease-in-out mb-1">
                    View Certificates
                </button>
            </nav>
        </header>
    );
}

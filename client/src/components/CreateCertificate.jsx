import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CreateCertificate() {
    const [name, setName] = useState("");
    const [courseName, setCourseName] = useState("");
    const [date, setDate] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // State to manage loading

    const formatDate = (date) => {
        if (!date) return ""; // Return empty string if date is null or undefined
        const options = { day: "2-digit", month: "2-digit", year: "numeric" };
        return date.toLocaleDateString("en-GB", options);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Set loading state to true

        console.log(date);

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_KEY}/certificates/create`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name, course: courseName, date: formatDate(date) }),
                }
            );

            const data = await response.json();

            if (response.ok) {
                console.log(data);
            } else {
                console.error(data); 
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="certificate-form">
            <h2 className="text-2xl font-bold mb-4">Create Certificate</h2>
            <div className="mb-6">
                <label
                    htmlFor="name"
                    className="block text-gray-700 font-bold mb-2">
                    Name:
                </label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border rounded-md p-2 w-full focus:outline-none focus:ring focus:border-blue-300"
                    required
                />
            </div>
            <div className="mb-6">
                <label
                    htmlFor="courseName"
                    className="block text-gray-700 font-bold mb-2">
                    Course Name:
                </label>
                <input
                    type="text"
                    id="courseName"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                    className="border rounded-md p-2 w-full focus:outline-none focus:ring focus:border-blue-300"
                    required
                />
            </div>
            <div className="mb-6">
                <label
                    htmlFor="date"
                    className="block text-gray-700 font-bold mb-2">
                    Date:
                </label>
                <DatePicker
                    id="date"
                    selected={date}
                    onChange={(date) => setDate(date)}
                    className="border rounded-md p-2 w-full focus:outline-none focus:ring focus:border-blue-300"
                    dateFormat="MM/dd/yyyy"
                />
            </div>
            <button
                type="submit"
                className={`bg-blue-500 w-full text-white px-4 py-2 rounded-md hover:bg-blue-600 ${
                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isLoading}>
                {isLoading ? "Creating Certificate..." : "Create Certificate"}
            </button>
        </form>
    );
}

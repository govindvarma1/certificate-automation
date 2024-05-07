import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast, { Toaster } from "react-hot-toast";
const notify = () => toast("Here is your toast.");

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
                `https://certificate-automation.onrender.com/certificates/create`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name,
                        course: courseName,
                        date: formatDate(date),
                    }),
                }
            );

            const data = await response.json();
            setName("");
            setCourseName("");
            setDate("");
            if (response.ok) {
                console.log(data);
                toast.success("Created cerificate Sucessfully");
            } else {
                console.error(data);
                toast.error("some error occured");
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="certificate-form">
                <h2 className="mb-4 text-2xl font-bold">Create Certificate</h2>
                <div className="mb-6">
                    <label
                        htmlFor="name"
                        className="block mb-2 font-bold text-gray-700">
                        Name:
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="courseName"
                        className="block mb-2 font-bold text-gray-700">
                        Course Name:
                    </label>
                    <input
                        type="text"
                        id="courseName"
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="date"
                        className="block mb-2 font-bold text-gray-700">
                        Date:
                    </label>
                    <DatePicker
                        id="date"
                        selected={date}
                        onChange={(date) => setDate(date)}
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        dateFormat="MM/dd/yyyy"
                        wrapperClassName="w-full" // Add this line to set the width equal to other inputs
                    />
                </div>
                <button
                    type="submit"
                    className={`bg-blue-500 w-full text-white px-4 py-2 rounded-md hover:bg-blue-600 ${
                        isLoading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={isLoading}>
                    {isLoading
                        ? "Creating Certificate..."
                        : "Create Certificate"}
                </button>
            </form>
            <Toaster />
        </>
    );
}

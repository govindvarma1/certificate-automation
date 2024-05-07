import React, { useEffect, useState } from 'react';

export default function ViewCertificates() {
  const [certificates, setCertificates] = useState([]);
  const [error, setError] = useState([]);

  // Fetch certificates from the backend API
  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_KEY}/certificates/fetch-all`);
        if (response.ok) {
          const data = await response.json();
          setCertificates(data.certificates);
          setError(null); // Reset error state if fetching is successful
        } else {
          setError('Failed to fetch certificates');
        }
      } catch (error) {
        setError('Error:', error);
      }
    };

    fetchCertificates();
  }, []);

  // Function to handle deletion of a certificate
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_KEY}/certificate/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setCertificates(certificates.filter(certificate => certificate._id.$oid !== id));
        console.log('Certificate deleted successfully');
      } else {
        console.error('Failed to delete certificate');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mx-auto py-8 mt-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Certificates</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((certificate, ind) => (
          <div key={ind} className="border rounded-md overflow-hidden shadow-md bg-white">
            <div className="p-6">
              <h2 className="text-lg font-semibold mb-2">{certificate.name}</h2>
              <p className="text-gray-600 mb-2">Course: {certificate.course}</p>
              <p className="text-gray-600 mb-4">Date: {certificate.date}</p>
              <div className="flex justify-between">
                <a href={certificate.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View Certificate</a>
                <button onClick={() => handleDelete(certificate._id.$oid)} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

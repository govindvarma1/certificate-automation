import React, { useEffect, useState } from 'react';

export default function ViewCertificates() {
  const [certificates, setCertificates] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_KEY}/certificates/fetch-all`);
        if (response.ok) {
          const data = await response.json();
          setCertificates(data.certificates);
          setError(null);
        } else {
          setError('Failed to fetch certificates');
        }
      } catch (error) {
        setError('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_KEY}/certificates/delete/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setCertificates(certificates.filter(certificate => certificate._id !== id));
        console.log('Certificate deleted successfully');
      } else {
        console.error('Failed to delete certificate');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
        Loading...
      </div>
    );
  }

  return (
    <div className="container py-8 mx-auto mt-8">
      <h1 className="mb-6 text-3xl font-bold text-center">Certificates</h1>
      {error && <p className="text-center text-red-500">{error}</p>}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {certificates.map((certificate, ind) => (
          <div key={ind} className="overflow-hidden bg-white border rounded-md shadow-md">
            <div className="p-6">
              <h2 className="mb-2 text-lg font-semibold">{certificate.name}</h2>
              <p className="mb-2 text-gray-600">Course: {certificate.course}</p>
              <p className="mb-4 text-gray-600">Date: {certificate.date}</p>
              <div className="flex justify-between">
                <a href={certificate.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View Certificate</a>
                <button onClick={() => handleDelete(certificate._id)} className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 ">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import "./globals.css"

const ethnicityOptions = [
  "American Indian or Alaska Native",
  "Asian",
  "Black or African American",
  "Hispanic or Latino",
  "Native Hawaiian or Other Pacific Islander",
  "White",
  "Two or More Races",
  "Prefer not to say",
];

export default function Home()
{
  const [formData, setFormData] = useState({
    dateOfBirth: "",
    ethnicity: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent)
  {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try
    {
      const response = await fetch("http://localhost:3000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });

      if (!response.ok)
      {
        throw new Error("Failed to submit");
      }

      setMessage("Information submitted successfully.");
      setFormData({
        dateOfBirth: "",
        ethnicity: "",
      });
    }
    catch(error) 
    {
      setMessage("There was an error submitting the form.");
      console.log(error);
    }
    finally
    {
      setLoading(false);
    }
  }

  return (
    <html>
      <body>
        <div className="min-h-screen bg-gray-50">
          {/* Top Government-Style Header */}
          <header className="bg-blue-900 text-white py-4">
            <div className="max-w-5xl mx-auto px-6">
              <h1 className="text-lg font-semibold tracking-wide">
                Vaccine Eligibility
              </h1>
            </div>
          </header>

          {/* Main Content */}
          <main className="max-w-3xl mx-auto px-6 py-12">
            <div className="bg-white border border-gray-200 p-10">
              <h2 className="text-3xl font-semibold text-gray-900 mb-2">
                Personal Information Form
              </h2>

              <p className="text-gray-600 mb-8">
                Please provide some personal details below.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">

                {/* DOB */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Date of Birth
                  </label>
                  <input
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-800"
                  />
                </div>

                {/* Ethnicity Dropdown */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700">
                    Ethnicity
                  </label>
                  <select
                    name="ethnicity"
                    value={formData.ethnicity}
                    onChange={handleChange}
                    required
                    className="mt-2 w-full border border-gray-300 p-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-800"
                  >
                    <option value="">Select one option</option>
                    {ethnicityOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-900 text-white px-6 py-3 font-semibold hover:bg-blue-800 transition disabled:opacity-60"
                  >
                    {loading ? "Submitting..." : "Submit Information"}
                  </button>
                </div>
              </form>

              {message && (
                <div className="mt-6 text-sm text-gray-700">
                  {message}
                </div>
              )}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
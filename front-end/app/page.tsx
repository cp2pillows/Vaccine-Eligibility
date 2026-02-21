'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [formData, setFormData] = useState({
    dateOfBirth: "",
  });

  const router = useRouter();

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

    try
    {
      const response = await fetch("http://localhost:3000/", {
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

      setFormData({
        dateOfBirth: "",
      });

      router.push("/questions");
    }
    catch(error) 
    {
      console.log(error);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <h1 className="page-title text-3xl sm:text-4xl">
        <span className="title">Vaccine Eligibility</span>
      </h1>
       <main className="floating-card">
        <h1 className="text-3xl font-bold text-black">Enter your date of birth</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="w-full flex flex-col gap-4 mt-8">
            <input
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
              className="bg-white text-black"
            />
            <div className="w-full flex justify-center">
              <button
                type="submit"
                className="bubble-button"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}

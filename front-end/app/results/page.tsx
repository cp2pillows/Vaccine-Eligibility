'use client';

import { useState } from "react";

export default function Home() {
  const [results, setResults] = useState<string[]>([]);

  async function getResults()
  {
    try
        {
          const response = await fetch("http://localhost:3000/vaccine/results", {
              method: "Get"
          });
  
          if (!response.ok)
          {
              throw new Error("Failed to submit");
          }
  
          const result: string[] = await response.json();
          setResults(result);
        }
        catch(error) 
        {
        console.log(error);
        }
  }

  getResults();

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <h1 className="page-title text-3xl sm:text-4xl">
        <span className="title">Vaccine Eligibility</span>
      </h1>
       <main className="floating-card">
        <h1 className="text-3xl font-bold text-black">Results</h1>
        <div className="w-full flex flex-col gap-4 mt-8">
          
        </div>
      </main>
    </div>
  );
}

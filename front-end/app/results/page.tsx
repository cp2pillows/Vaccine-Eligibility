'use client';

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Results() {
  const [results, setResults] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    getResults();
  }, []);

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

  async function reset()
  {
    try
    {
      const response = await fetch("http://localhost:3000/vaccine/reset", {
          method: "Get"
      });

      if (!response.ok)
      {
          throw new Error("Failed to submit");
      }

      setResults([]);
      router.push("/");
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
        <h1 className="text-3xl font-bold text-black">Results</h1>
        <div className="w-full flex flex-col gap-4 mt-8 font-bold text-black">
          {results}
        </div>
        <button onClick={() => reset()}>Reset</button>
      </main>
    </div>
  );
}

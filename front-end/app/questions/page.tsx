"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Question() {
  const [questions, setQuestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [inc, setInc] = useState(0);
  const router = useRouter();

  async function AnswerQuestion(stringID:string, answer:boolean)
  {
      let json = {'stringID': stringID, 'answer':answer}

      try
      {
          const response = await fetch("http://localhost:3000/vaccine", {
              method: "POST",
              headers: {
              "Content-Type": "application/json",
              },
              body: JSON.stringify(json),
              credentials: 'include',
          });

          if (!response.ok)
          {
              throw new Error("Failed to submit");
          }

          setInc(inc => inc + 1);
      }
      catch(error) 
      {
      console.log(error);
      }
  }

  useEffect(() => {
    async function getQuestions() {
      try {
        const response = await fetch("http://localhost:3000/vaccine");
        const result: string[] = await response.json();

        console.log(result);
        setQuestions(result);

        if(result.length == 0)
        {
          router.push("/results")
        }
        
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    
    getQuestions();
    
  }, [inc]);

  const currQuestion = questions[0];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <h1 className="page-title text-3xl sm:text-4xl">
        <span className="title">Patient Profile</span>
      </h1>

      <Image
        src="/doctor-clipart.png"
        alt="Doctor"
        width={700}
        height={700}
        className="absolute bottom-0 left-0"
      />

      <div className="form-card relative">
        <h1 className="text-3xl font-bold text-black absolute top-0 left-0 pl-6 pt-4">
          Question {inc}
        </h1>

        <p className="mt-4 text-lg text-black">
          {currQuestion}
        </p>


        <button
          className="bubble-button mt-6"
          onClick={() => AnswerQuestion(currQuestion, true)}
        >
          Yes
        </button>

        <button
          className="bubble-button mt-6"
          onClick={() => AnswerQuestion(currQuestion, false)}
        >
          No
        </button>
      </div>
    </div>
  );
}
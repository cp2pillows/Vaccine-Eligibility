'use client';

import { useState } from "react";

export default function VaccineAPI()
{

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
        }
        catch(error) 
        {
        console.log(error);
        }
    }
}
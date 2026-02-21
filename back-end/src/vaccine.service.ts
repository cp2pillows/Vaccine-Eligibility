import { Injectable } from "@nestjs/common";
import { DTaP_IPV_Hib } from "./VaccineDirectors/DTaP_IPV_Hib";
import { Vaccine } from "./Types/Vaccine";

@Injectable()
export class VacccineService {

    vaccine: Vaccine
    constructor(){
        this.vaccine = new DTaP_IPV_Hib().Build()
    }

    getQuestions(): string[]
    {
        let questionStrings:string[] = []
        let questions = this.vaccine.getQuestions();
        questions.forEach(question => {
            questionStrings.push(question.GetStringID());
        })
        return questionStrings;
    }
}
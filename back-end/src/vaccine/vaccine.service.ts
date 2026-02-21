import { Injectable } from "@nestjs/common";
import { CreateVaccineAnswer } from "./create-vaccine-answer.dto";
import { Vaccine } from "src/Types/Vaccine";
import { DTaP_IPV_Hib } from "src/VaccineDirectors/DTaP_IPV_Hib";
import { AnswerBool } from "src/Types/AnswerBool";

@Injectable()
export class VacccineService {

    vaccine: Vaccine
    constructor(){
        this.vaccine = new DTaP_IPV_Hib().Build()
    }

    getQuestions(): string[]{
        let questionStrings:string[] = []
        let questions = this.vaccine.getQuestions();
        questions.forEach(question => {
            questionStrings.push(question.GetStringID());
        })
        return questionStrings;
    }

    answerQuestion(dto: CreateVaccineAnswer){
        this.vaccine.AnswerQuestion(dto.stringID, new AnswerBool(dto.answer));
    }
    
    
}
import { Injectable } from "@nestjs/common";
import { CreateVaccineAnswer } from "./create-vaccine-answer.dto";
import { DTaP_IPV_Hib } from "src/VaccineDirectors/DTaP_IPV_Hib";
import { AnswerBool } from "src/Types/AnswerBool";
import { VaccineCollection } from "src/Types/VaccineCollection";

@Injectable()
export class VacccineService {

    vaccines: VaccineCollection = new VaccineCollection();
    constructor(){
        this.reset();
    }

    getQuestions(): string[]{
        let questionStrings:string[] = []
        let questions = this.vaccines.GetQuestions();
        questions.forEach(question => {
            questionStrings.push(question.GetStringID());
        })
        return questionStrings;
    }

    answerQuestion(dto: CreateVaccineAnswer){
        this.vaccines.AnswerQuestion(dto.stringID, new AnswerBool(dto.answer));
    }
    
    getVaccineStatus(): string[]{
        return this.vaccines.Validate();
    }
    
    reset(): void{
        this.vaccines.Clear();
        this.vaccines.AddVacine(new DTaP_IPV_Hib().Build());
    }
}
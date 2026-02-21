import { Answer } from "./Answer";
import { Question } from "./Question";
import { Vaccine } from "./Vaccine";
import { ValidateReturn } from "./ValidateReturn";

export class VaccineCollection{
    vaccinesNotEligible: Vaccine[]
    vaccinesEligible: Vaccine[]
    vaccinesNeedMoreInfo: Vaccine[]


    AddVacine(vaccine: Vaccine): this{
        this.vaccinesNeedMoreInfo.push(vaccine);
        return this;
    }

    AnswerQuestion(questionID: string, answer: Answer): void {
        
        //propagate answer
        this.vaccinesNeedMoreInfo.forEach(vaccineUnanswered => {
            vaccineUnanswered.AnswerQuestion(questionID, answer);
        });


        //compare questions to see if related
        let correct:Vaccine[] = []
        let failed:Vaccine[] = []
        this.vaccinesNeedMoreInfo.forEach(vaccineUnanswered => {
            let retval:ValidateReturn = vaccineUnanswered.Validate();
            if(retval === ValidateReturn.FAIL){
                failed.push(vaccineUnanswered);
            }
            if(retval === ValidateReturn.FAIL){
                correct.push(vaccineUnanswered);
            }
        });

        //fill up correct

        correct.forEach(vaccineEligible =>{
            this.vaccinesEligible.push(vaccineEligible);
            this.vaccinesNeedMoreInfo = this.vaccinesNeedMoreInfo.filter(vaccine => vaccine != vaccineEligible);
        })

        //fill up fail
        failed.forEach(vaccineNotEligible => {
            this.vaccinesNotEligible.push(vaccineNotEligible);
            this.vaccinesNeedMoreInfo = this.vaccinesNeedMoreInfo.filter(vaccine => vaccine != vaccineNotEligible);
        });
    }

    UnsureQuestion(questionID: string): void{
        //propagate answer
        this.vaccinesNeedMoreInfo.forEach(vaccineUnanswered => {
            vaccineUnanswered.UnsureQuestion(questionID);
        });
    }

    GetQuestions(): Question[]{
        let questions:Question[] = [];
        this.vaccinesNeedMoreInfo.forEach(vaccine => {
            questions.push(...vaccine.getQuestions())
        });
        return questions;
    }

    Validate(): string[]{
        let vaccines:string[] = [];
        this.vaccinesEligible.forEach(vaccine => {
            vaccine + ": Eligible"
        });
        this.vaccinesNotEligible.forEach(vaccine => {
            vaccine + ": Not Eligible"
        });
        this.vaccinesNeedMoreInfo.forEach(vaccine => {
            vaccine + ": " + vaccine.Validate().toString()
        });

        return vaccines;
    }


}
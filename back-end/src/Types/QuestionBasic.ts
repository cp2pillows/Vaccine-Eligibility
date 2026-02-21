import { Answer } from "./Answer"
import { Question } from "./Question";
import { QuestionReturn } from "./QuestionReturn";

export class QuestionBasic implements Question{
    constructor(private readonly questionID:string, private readonly answer:Answer) {}
    GetStringID(): string{
        return this.questionID;
    }

    AnswerQuestion (questionID: string, answer:Answer): QuestionReturn{
        if (this.questionID === questionID){
            if (this.answer.CompareAnswer(answer)){
                return QuestionReturn.ANSWER_SUCCESS;
            }
            else{
                return QuestionReturn.ANSWER_FAILED;
            }
        }
        return QuestionReturn.ANSWER_SKIPPED;
    }
}


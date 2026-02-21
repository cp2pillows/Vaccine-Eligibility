import { Answer } from "./Answer";
import { Question } from "./Question";
import { QuestionCollection } from "./QuestionCollection";
import { ValidateReturn } from "./ValidateReturn";

export class Vaccine{
    constructor(private readonly questions:QuestionCollection, name:string) {}

    getQuestions(): Question[]{
        return this.questions.GetUnansweredQuestions();
    }

    AnswerQuestion(questionID: string, answer: Answer): void{
        return this.questions.AnswerQuestion(questionID, answer);
    }

    UnsureQuestion(questionID: string): void{
        this.questions.UnsureQuestion(questionID);
    }

    Validate(): ValidateReturn{
        return this.questions.Validate();
    }
}
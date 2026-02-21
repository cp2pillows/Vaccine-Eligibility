import { Answer } from "./Answer";
import { Question } from "./Question";
import { QuestionCollection } from "./QuestionCollection";
import { QuestionCollectionBasic } from "./QuestionCollectionBasic";
import { ValidateReturn } from "./ValidateReturn";

//if any of its sub classes fail it doesnt actually initially fail
//Only fails if all subclasses fail
//succeeds when any one of its subclasses are true
//never return good enough though validation
export class QuestionCollectionGroup implements QuestionCollection{
    group:QuestionCollectionBasic = new QuestionCollectionBasic();
    
    //group collections are also treated as apart of group
    groupCollections:QuestionCollection[] = [];

    Validate(): ValidateReturn{
        if (this.group.correctQuestions.length > 0){
            return ValidateReturn.SUCCESS;
        }
        else if (this.group.unansweredQuestions.length > 0 || this.group.unsureQuestions.length > 0){
            return ValidateReturn.NOT_ENOUGH_INFO;
        }
        else{
            return ValidateReturn.FAIL
        }
    }

    AddQuestion(question: Question): this{
        this.group.AddQuestion(question);
        return this;
    }

    AddQuestionCollection (questionCollection: QuestionCollection): this{
        this.groupCollections.push(questionCollection)
        return this;
    }

    UnsureQuestion (questionID: string): void{
        this.group.UnsureQuestion(questionID);
    }

    AnswerQuestion (questionID: string, answer: Answer): void{
        this.group.AnswerQuestion(questionID, answer);

        //propagate answer
        this.groupCollections.forEach(questionCollection => {
            questionCollection.AnswerQuestion(questionID, answer)
        });
    };

}
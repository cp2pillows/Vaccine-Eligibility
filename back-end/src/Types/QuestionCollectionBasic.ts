import { Answer } from "./Answer"
import { Question } from "./Question"
import { QuestionCollection } from "./QuestionCollection"
import { QuestionReturn } from "./QuestionReturn"
import { ValidateReturn } from "./ValidateReturn"

export class QuestionCollectionBasic implements QuestionCollection{
    unansweredQuestions: Question[] = []
    unsureQuestions: Question[] = []
    correctQuestions: Question[] = []
    failedQuestions: Question[] = []
    questionCollections: QuestionCollection[] = []
    
    AnswerQuestion(questionID: string, answer: Answer): void{
        //compare questions to see if related
        let correct:Question[] = []
        let failed:Question[] = []
        this.unansweredQuestions.forEach(unansweredQuestion => {
            let retval:QuestionReturn = unansweredQuestion.AnswerQuestion(questionID, answer);
            if(retval === QuestionReturn.ANSWER_FAILED){
                failed.push(unansweredQuestion);
            }
            if(retval === QuestionReturn.ANSWER_SUCCESS){
                correct.push(unansweredQuestion);
            }
        });

        //fill up correct

        correct.forEach(correctQuestion =>{
            this.correctQuestions.push(correctQuestion);
            this.unansweredQuestions = this.unansweredQuestions.filter(question => question != correctQuestion);
        })

        //fill up fail
        failed.forEach(failedQuestion => {
            this.failedQuestions.push(failedQuestion);
            this.unansweredQuestions = this.unansweredQuestions.filter(question => question != failedQuestion);
        });
        
        //propagate the answer
        this.questionCollections.forEach(questionCollection => {
            questionCollection.AnswerQuestion(questionID, answer);
        });
    }
    
    Validate(): ValidateReturn{
        if(this.questionCollections.length === 0){
            return this.ValidateSelf();
        }
        return Math.max(this.ValidateSelf(), this.ValidateNext());
    }

    ValidateSelf(): ValidateReturn{
        if(this.failedQuestions.length > 0){
            return ValidateReturn.FAIL;
        }
        if(this.unansweredQuestions.length > 0){
            return ValidateReturn.NOT_ENOUGH_INFO;
        }else{
            if(this.unsureQuestions.length > 0){
                return ValidateReturn.GOOD_ENOUGH;
            }
            return ValidateReturn.SUCCESS;
        }
    }
    
    //validates the question collections list
    ValidateNext(){
        let validateValue = ValidateReturn.SUCCESS
        this.questionCollections.forEach(questionCollection => {
            let retval = questionCollection.Validate();
            if (retval > validateValue){
                validateValue = retval
            }
        })
        return validateValue;
    }

    AddQuestion(question: Question): this{
        this.unansweredQuestions.push(question);
        return this;
    }
    
    AddQuestionCollection(questionCollection: QuestionCollection): this{
        this.questionCollections.push(questionCollection)
        return this;
    }

    UnsureQuestion(questionID: string): void{
        //fill up fail
        let unsure:Question[] = []
        this.unansweredQuestions.forEach(unansweredQuestion => {
            if (unansweredQuestion.GetStringID() === questionID){
                unsure.push(unansweredQuestion);
            }
        })

        unsure.forEach(unsureQuestion => {
            this.unsureQuestions.push(unsureQuestion);
            this.unansweredQuestions = this.unansweredQuestions.filter(question => question != unsureQuestion);
        });
    }
}
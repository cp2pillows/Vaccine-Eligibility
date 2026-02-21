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
    
    AddQuestion(question: Question): void{
        this.unansweredQuestions.push(question);
    }
    
    AddQuestionCollection(questionCollection: QuestionCollection): void{
        this.questionCollections.push(questionCollection)
    }

    UnsureQuestion: (questionID: string, answer: Answer) => void
}
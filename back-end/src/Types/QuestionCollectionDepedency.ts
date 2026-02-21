import { Answer } from "./Answer";
import { Question } from "./Question";
import { QuestionCollection } from "./QuestionCollection";
import { QuestionCollectionBasic } from "./QuestionCollectionBasic";
import { ValidateReturn } from "./ValidateReturn";

//sends a fail if any of its depedencies are failing
export class questionCollectionDependency implements QuestionCollection{
    constructor(private readonly independentQuestion:Question) {
        this.mainQuestion.AddQuestion(this.independentQuestion); //keeps things consistent even though it holds one item
    }
    mainQuestion:QuestionCollectionBasic = new QuestionCollectionBasic();
    dependency:QuestionCollectionBasic = new QuestionCollectionBasic();

    Validate(): ValidateReturn{
        //check if main question fail
        if(this.mainQuestion.Validate() == ValidateReturn.FAIL || this.dependency.Validate() == ValidateReturn.FAIL){
            return ValidateReturn.FAIL
        }

        //check if either have not enough info
        else if(this.mainQuestion.Validate() == ValidateReturn.NOT_ENOUGH_INFO || this.dependency.Validate() == ValidateReturn.NOT_ENOUGH_INFO){
            return ValidateReturn.NOT_ENOUGH_INFO
        }
        
        //check if either are good enough 
        else if(this.mainQuestion.Validate() == ValidateReturn.GOOD_ENOUGH || this.dependency.Validate() == ValidateReturn.GOOD_ENOUGH){
            return ValidateReturn.GOOD_ENOUGH
        }

        else
        {
            return ValidateReturn.SUCCESS
        }
    }
    
    AddQuestion (question: Question){
        this.dependency.AddQuestion(question);
    }

    AddQuestionCollection(questionCollection: QuestionCollection): void{
        this.dependency.AddQuestionCollection(questionCollection);
    }

    UnsureQuestion(questionID: string): void{
        this.mainQuestion.UnsureQuestion(questionID);
        this.dependency.UnsureQuestion(questionID);
    }
    
    AnswerQuestion(questionID: string, answer: Answer): void{
        this.mainQuestion.AnswerQuestion(questionID, answer);
        this.dependency.AnswerQuestion(questionID, answer);
    }
}
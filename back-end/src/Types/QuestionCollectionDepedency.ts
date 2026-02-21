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
        return Math.max(this.mainQuestion.Validate(), this.dependency.Validate());
    }
    
    AddQuestion(question: Question): this{
        this.dependency.AddQuestion(question);
        return this;
    }

    AddQuestionCollection(questionCollection: QuestionCollection): this{
        this.dependency.AddQuestionCollection(questionCollection);
        return this;
    }

    UnsureQuestion(questionID: string): void{
        this.mainQuestion.UnsureQuestion(questionID);
        this.dependency.UnsureQuestion(questionID);
    }
    
    AnswerQuestion(questionID: string, answer: Answer): void{
        this.mainQuestion.AnswerQuestion(questionID, answer);
        this.dependency.AnswerQuestion(questionID, answer);
    }

    GetUnansweredQuestions(): Question[]{
        if(this.mainQuestion.Validate() === ValidateReturn.NOT_ENOUGH_INFO){
            return this.mainQuestion.GetUnansweredQuestions();
        }
        else
        {
            return this.dependency.GetUnansweredQuestions();
        }
    }
}
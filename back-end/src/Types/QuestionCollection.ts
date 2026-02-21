import { Answer } from "./Answer"
import { Question } from "./Question"
import { ValidateReturn } from "./ValidateReturn"

export interface QuestionCollection{
    Validate:() => ValidateReturn
    AddQuestion:(question: Question) => this
    AddQuestionCollection: (questionCollection: QuestionCollection) => this
    UnsureQuestion:(questionID: string) => void
    AnswerQuestion: (questionID: string, answer:Answer) => void
    GetUnansweredQuestions: () => Question[]
}
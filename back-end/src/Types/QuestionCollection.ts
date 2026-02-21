import { Answer } from "./Answer"
import { Question } from "./Question"
import { ValidateReturn } from "./ValidateReturn"

export interface QuestionCollection{
    Validate:() => ValidateReturn
    AddQuestion:(question: Question) => void
    AddQuestionCollection: (questionCollection: QuestionCollection) => void
    UnsureQuestion:(questionID: string, answer:Answer) => void
    AnswerQuestion: (questionID: string, answer:Answer) => void
}
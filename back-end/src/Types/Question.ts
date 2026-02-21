import { Answer } from "./Answer"
import { QuestionReturn } from "./QuestionReturn"

export interface Question{
    AnswerQuestion: (questionID: string, answer:Answer) => QuestionReturn
}


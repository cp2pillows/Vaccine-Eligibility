import { Answer } from "./Answer";

export class AnswerBool implements Answer{
    constructor(private readonly value:boolean) {}

    CompareAnswer (answer: Answer): Boolean{
        if (answer instanceof AnswerBool)
        {
            return this.value == answer.value;
        }
        throw new Error('Answer Bool Trying to parse a Answer that doesnt contain a bool.');
    }
}
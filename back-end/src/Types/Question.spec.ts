import { AnswerBool } from "./AnswerBool";
import { QuestionBasic } from "./QuestionBasic";
import { QuestionReturn } from "./QuestionReturn";

describe('QuestionBasic', () =>{
    let answerTrue: AnswerBool;
    let answerFalse: AnswerBool;

    beforeEach(() =>{
        answerTrue = new AnswerBool(true);
        answerFalse = new AnswerBool(false);
    })

    describe('Test Answer Question', () => {
        it('Should return ANSWER_SUCCESS if the answer is same', async () => {
            let stringID = 'answer is true';
            let questionTrue = new QuestionBasic(stringID, new AnswerBool(true));

            expect(questionTrue.AnswerQuestion(stringID, answerTrue)).toBe(QuestionReturn.ANSWER_SUCCESS);
        })
        it('Should return ANSWER_FAILED if the answer is different', async () => {
            let stringID = 'answer is true';
            let questionTrue = new QuestionBasic(stringID, new AnswerBool(true));

            expect(questionTrue.AnswerQuestion(stringID, answerTrue)).toBe(QuestionReturn.ANSWER_SUCCESS);
        })
        it('Should return ANSWER_SKIPPED if the stringID is different', async () => {
            let stringID = 'answer is true';
            let stringIDDifferent = 'answer is false';
            let questionTrue = new QuestionBasic(stringID, new AnswerBool(true));

            expect(questionTrue.AnswerQuestion(stringIDDifferent, answerTrue)).toBe(QuestionReturn.ANSWER_SKIPPED);
        })
        
    })

})
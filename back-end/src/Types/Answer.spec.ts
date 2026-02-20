import { AnswerBool } from "./AnswerBool"

describe('AnswerBool', () =>{
    let answerTrue: AnswerBool;
    let answerFalse: AnswerBool;

    beforeEach(() =>{
        answerTrue = new AnswerBool(true);
        answerFalse = new AnswerBool(false);
    })
    
    describe('Compare Answer', () => {
        it('Should return true if they are both true', async () =>{
            const answerAlsoTrue = new AnswerBool(true);
            expect(answerTrue.CompareAnswer(answerAlsoTrue)).toBe(true);
        })
        it('Should return false if one of them is false', async () =>{
            const answerAlsoTrue = new AnswerBool(true);
            expect(answerFalse.CompareAnswer(answerAlsoTrue)).toBe(false);
        })
        it('Should return true if they are both false', async () =>{
            const answerAlsoFalse = new AnswerBool(false);
            expect(answerFalse.CompareAnswer(answerAlsoFalse)).toBe(true);
        })
        it('Should return false if one of them is false', async () =>{
            const answerAlsoFalse = new AnswerBool(false);
            expect(answerTrue.CompareAnswer(answerAlsoFalse)).toBe(false);
        })
    })
})
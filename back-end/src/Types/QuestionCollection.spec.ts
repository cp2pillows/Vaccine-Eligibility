import { AnswerBool } from "./AnswerBool";
import { QuestionBasic } from "./QuestionBasic";
import { QuestionCollectionBasic } from "./QuestionCollectionBasic";
import { QuestionReturn } from "./QuestionReturn";
import { ValidateReturn } from "./ValidateReturn";

describe('QuestionCollection', () =>{
    let stringID: string; 
    let questionCollection: QuestionCollectionBasic;
    
    beforeEach(() =>{
        stringID = 'first';
        questionCollection = new QuestionCollectionBasic();
    })

    describe('AddQuestion', () => {
        it('unanswered question should grow', async () => {
            
            expect(questionCollection.unansweredQuestions.length).toBe(0);
            questionCollection.AddQuestion(new QuestionBasic('answer is true', new AnswerBool(true)))
            expect(questionCollection.unansweredQuestions.length).toBe(1);
        })
    })

    describe('AddQuestionCollection', () => {
        it('question collection should grow', async () => {
            let questionCollection2 = new QuestionCollectionBasic()
            
            expect(questionCollection.questionCollections.length).toBe(0);
            questionCollection.AddQuestionCollection(questionCollection2);
            expect(questionCollection.questionCollections.length).toBe(1);
        })
    })

    describe('Validate', () => {
        it('Should return SUCCESS if there is no questions', async () => {
            expect(questionCollection.Validate()).toBe(ValidateReturn.SUCCESS);
        })

        it('Should return NOT_ENOUGH_INFO if there is a unanswered question', async () => {
            questionCollection.AddQuestion(new QuestionBasic(stringID, new AnswerBool(true)));
            
            expect(questionCollection.Validate()).toBe(ValidateReturn.NOT_ENOUGH_INFO);
        })

        it('Should return SUCCESS if all questions are complete', async () => {
            questionCollection.AddQuestion(new QuestionBasic(stringID, new AnswerBool(true)));
            
            expect(questionCollection.Validate()).toBe(ValidateReturn.NOT_ENOUGH_INFO);
            questionCollection.AnswerQuestion(stringID, new AnswerBool(true));
            expect(questionCollection.Validate()).toBe(ValidateReturn.SUCCESS);
        })

        it('Should return FAIL if there is a question that fails', async () => {
            questionCollection.AddQuestion(new QuestionBasic(stringID, new AnswerBool(true)));
            
            expect(questionCollection.Validate()).toBe(ValidateReturn.NOT_ENOUGH_INFO);
            questionCollection.AnswerQuestion(stringID, new AnswerBool(false));
            expect(questionCollection.Validate()).toBe(ValidateReturn.FAIL);
        })        
    })

    describe('AnswerQuestion', () => {
        it('Should check to see if it able to propagate answers', async () => {
            let questionCollectionDeep = new QuestionCollectionBasic();
            questionCollectionDeep.AddQuestion(new QuestionBasic(stringID, new AnswerBool(true)));

            expect(questionCollection.questionCollections.length).toBe(0);
            questionCollection.AddQuestionCollection(questionCollectionDeep);
            expect(questionCollection.questionCollections.length).toBe(1);
            
            expect(questionCollectionDeep.correctQuestions.length).toBe(0);
            questionCollection.AnswerQuestion(stringID, new AnswerBool(true));
            expect(questionCollectionDeep.correctQuestions.length).toBe(1);
        })  
    })
})
import { AnswerBool } from "./AnswerBool";
import { QuestionBasic } from "./QuestionBasic";
import { QuestionCollectionBasic } from "./QuestionCollectionBasic";
import { QuestionReturn } from "./QuestionReturn";
import { ValidateReturn } from "./ValidateReturn";

describe('QuestionCollectionBasic', () =>{
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

    describe('Validate Simple', () => {
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

        it('Should return GOOD_ENOUGH if there is a question that is unsure', async () => {
            questionCollection.AddQuestion(new QuestionBasic(stringID, new AnswerBool(true)));

            expect(questionCollection.Validate()).toBe(ValidateReturn.NOT_ENOUGH_INFO);
            questionCollection.UnsureQuestion(stringID);
            expect(questionCollection.Validate()).toBe(ValidateReturn.GOOD_ENOUGH);
        })        
    })

    describe('Validate Dependency', () => {
        it('It should FAIL if first collection is NOT_ENOUGH_INFO but the deeper one failed', async () => {
            let questionCollectionDeep = new QuestionCollectionBasic()
            questionCollection.AddQuestion(new QuestionBasic(stringID, new AnswerBool(true)));
            jest.spyOn(questionCollectionDeep, 'Validate').mockImplementation(() => ValidateReturn.FAIL);
            
            expect(questionCollection.Validate()).toBe(ValidateReturn.NOT_ENOUGH_INFO);
            questionCollection.AddQuestionCollection(questionCollectionDeep)
            expect(questionCollection.Validate()).toBe(ValidateReturn.FAIL);
        })

        it('It should FAIL if first collection is SUCCESS but the deeper one failed', async () => {
            let questionCollectionDeep = new QuestionCollectionBasic()
            questionCollection.AddQuestion(new QuestionBasic(stringID, new AnswerBool(true)));
            questionCollection.AnswerQuestion(stringID, new AnswerBool(true));
            jest.spyOn(questionCollectionDeep, 'Validate').mockImplementation(() => ValidateReturn.FAIL);

            expect(questionCollection.Validate()).toBe(ValidateReturn.SUCCESS);
            questionCollection.AddQuestionCollection(questionCollectionDeep)
            expect(questionCollection.Validate()).toBe(ValidateReturn.FAIL);
        })

        it('It should FAIL if first collection is GOOD_ENOUGH but the deeper one failed', async () => {
            let questionCollectionDeep = new QuestionCollectionBasic()
            questionCollection.AddQuestion(new QuestionBasic(stringID, new AnswerBool(true)));
            questionCollection.UnsureQuestion(stringID);
            jest.spyOn(questionCollectionDeep, 'Validate').mockImplementation(() => ValidateReturn.FAIL);

            expect(questionCollection.Validate()).toBe(ValidateReturn.GOOD_ENOUGH);
            questionCollection.AddQuestionCollection(questionCollectionDeep);
            expect(questionCollection.Validate()).toBe(ValidateReturn.FAIL);
        })

        it('It should return NOT_ENOUGH_INFO if first collection is SUCCESS but the deeper one is NOT_ENOUGH_INFO', async () => {
            let questionCollectionDeep = new QuestionCollectionBasic()
            questionCollection.AddQuestion(new QuestionBasic(stringID, new AnswerBool(true)));
            questionCollection.AnswerQuestion(stringID, new AnswerBool(true));
            jest.spyOn(questionCollectionDeep, 'Validate').mockImplementation(() => ValidateReturn.NOT_ENOUGH_INFO);

            expect(questionCollection.Validate()).toBe(ValidateReturn.SUCCESS);
            questionCollection.AddQuestionCollection(questionCollectionDeep);
            expect(questionCollection.Validate()).toBe(ValidateReturn.NOT_ENOUGH_INFO);
        })

        it('It should return GOOD_ENOUGH if first collection is SUCCESS but the deeper one is GOOD_ENOUGH', async () => {
            let questionCollectionDeep = new QuestionCollectionBasic()
            questionCollection.AddQuestion(new QuestionBasic(stringID, new AnswerBool(true)));
            questionCollection.AnswerQuestion(stringID, new AnswerBool(true));
            jest.spyOn(questionCollectionDeep, 'Validate').mockImplementation(() => ValidateReturn.GOOD_ENOUGH);

            expect(questionCollection.Validate()).toBe(ValidateReturn.SUCCESS);
            questionCollection.AddQuestionCollection(questionCollectionDeep);
            expect(questionCollection.Validate()).toBe(ValidateReturn.GOOD_ENOUGH);
        })
        
        it('It should return FAIL if first collection is FAIL but the deeper one is SUCCESS', async () => {
            let questionCollectionDeep = new QuestionCollectionBasic()
            questionCollection.AddQuestion(new QuestionBasic(stringID, new AnswerBool(true)));
            questionCollection.AnswerQuestion(stringID, new AnswerBool(false));
            jest.spyOn(questionCollectionDeep, 'Validate').mockImplementation(() => ValidateReturn.SUCCESS);

            expect(questionCollection.Validate()).toBe(ValidateReturn.FAIL);
            questionCollection.AddQuestionCollection(questionCollectionDeep);
            expect(questionCollection.Validate()).toBe(ValidateReturn.FAIL);
        })

        it('It should return FAIL if first collection is FAIL but the deeper one is GOOD_ENOUGH', async () => {
            let questionCollectionDeep = new QuestionCollectionBasic()
            questionCollection.AddQuestion(new QuestionBasic(stringID, new AnswerBool(true)));
            questionCollection.AnswerQuestion(stringID, new AnswerBool(false));
            jest.spyOn(questionCollectionDeep, 'Validate').mockImplementation(() => ValidateReturn.GOOD_ENOUGH);

            expect(questionCollection.Validate()).toBe(ValidateReturn.FAIL);
            questionCollection.AddQuestionCollection(questionCollectionDeep);
            expect(questionCollection.Validate()).toBe(ValidateReturn.FAIL);
        })
        
        it('It should return FAIL if first collection is FAIL but the deeper one is NOT_ENOUGH_INFO', async () => {
            let questionCollectionDeep = new QuestionCollectionBasic()
            questionCollection.AddQuestion(new QuestionBasic(stringID, new AnswerBool(true)));
            questionCollection.AnswerQuestion(stringID, new AnswerBool(false));
            jest.spyOn(questionCollectionDeep, 'Validate').mockImplementation(() => ValidateReturn.NOT_ENOUGH_INFO);

            expect(questionCollection.Validate()).toBe(ValidateReturn.FAIL);
            questionCollection.AddQuestionCollection(questionCollectionDeep);
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

    describe('UnsureQuestion', () => {
        it('Should check if we are able to place question in unsure slots', async () =>{
            questionCollection.AddQuestion(new QuestionBasic(stringID, new AnswerBool(true)));
            
            expect(questionCollection.unansweredQuestions.length).toBe(1);
            expect(questionCollection.unsureQuestions.length).toBe(0);
            questionCollection.UnsureQuestion(stringID);
            expect(questionCollection.unansweredQuestions.length).toBe(0);
            expect(questionCollection.unsureQuestions.length).toBe(1);
        })
        
    })
})
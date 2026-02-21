import { AnswerBool } from "./AnswerBool"
import { Question } from "./Question";
import { QuestionBasic } from "./QuestionBasic";
import { QuestionCollection } from "./QuestionCollection";
import { QuestionCollectionBasic } from "./QuestionCollectionBasic";
import { questionCollectionDependency } from "./QuestionCollectionDepedency";
import { QuestionCollectionGroup } from "./QuestionCollectionGroup";
import { Vaccine } from "./Vaccine";
import { VaccineCollection } from "./VaccineCollection";

describe('Vaccine', () =>{
    let vaccineNormal: Vaccine;
    let vaccineDependent: Vaccine;
    let vaccineGroup: Vaccine;
    let vaccineCollection: VaccineCollection;
    let stringID1: string = 'first';
    let stringID2: string = 'second';
    let stringID3: string = 'third';
    

    beforeEach(() =>{
        //generic question
        let questions:QuestionCollection = new QuestionCollectionBasic()
            .AddQuestion(new QuestionBasic(stringID1, new AnswerBool(true)))
            .AddQuestion(new QuestionBasic(stringID2, new AnswerBool(true)))
            .AddQuestion(new QuestionBasic(stringID3, new AnswerBool(true)))
        
        //dependent question
        let questionsDepend:QuestionCollection = new questionCollectionDependency(new QuestionBasic(stringID1, new AnswerBool(true)))
            .AddQuestion(new QuestionBasic(stringID2, new AnswerBool(true)))
            .AddQuestion(new QuestionBasic(stringID3, new AnswerBool(true)))
        
        let questionsGroup:QuestionCollection = new QuestionCollectionGroup()
            .AddQuestion(new QuestionBasic(stringID1, new AnswerBool(true)))
            .AddQuestion(new QuestionBasic(stringID2, new AnswerBool(true)))
            .AddQuestion(new QuestionBasic(stringID3, new AnswerBool(true)))
        
        vaccineNormal = new Vaccine(questions, 'Normal');
        vaccineDependent = new Vaccine(questionsDepend, 'Dependent');
        vaccineGroup = new Vaccine(questionsGroup, 'Group');
        vaccineCollection = new VaccineCollection()
            .AddVacine(vaccineNormal)
            .AddVacine(vaccineDependent)
            .AddVacine(vaccineGroup)

    })
    
    describe('Vaccine Collections', () => {
        it('Only group should be true if given ID1 is true', async () =>{
            let vaccineBefore:string[] = ["Normal: NOT_ENOUGH_INFO", "Dependent: NOT_ENOUGH_INFO", "Group: NOT_ENOUGH_INFO"] 
            expect(vaccineCollection.Validate()).toEqual(vaccineBefore);
            
            vaccineCollection.AnswerQuestion(stringID1, new AnswerBool(true));

            let vaccineAfter:string[] = ["Normal: NOT_ENOUGH_INFO", "Dependent: NOT_ENOUGH_INFO", "Group: SUCCESS"]
            expect(vaccineCollection.Validate()).toEqual(vaccineAfter);
        })
    })
})
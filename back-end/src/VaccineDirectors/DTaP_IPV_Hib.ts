import { Vaccine } from "src/Types/Vaccine";
import { VaccineDirector } from "./VaccineDirector";
import { QuestionCollectionBasic } from "src/Types/QuestionCollectionBasic";
import { CAR_tCell_Recipient, Care_Of_Haematologist_Or_Oncologist, Have_Hypo_Or_asplenic, Have_Malignant_Neoplasms, Hematopoietic_Stem_Recipient } from "src/Questions/QuestionData";
import { AnswerBool } from "src/Types/AnswerBool";
import { QuestionBasic } from "src/Types/QuestionBasic";
import { questionCollectionDependency } from "src/Types/QuestionCollectionDepedency";
import { QuestionCollectionGroup } from "src/Types/QuestionCollectionGroup";

export class DTaP_IPV_Hib implements VaccineDirector{
    Build(): Vaccine {
        let questionCollection = new QuestionCollectionBasic();
        questionCollection
            .AddQuestion(new QuestionBasic(Hematopoietic_Stem_Recipient, new AnswerBool(true)))
            .AddQuestion(new QuestionBasic(CAR_tCell_Recipient, new AnswerBool(true)))
            .AddQuestionCollection(new questionCollectionDependency(new QuestionBasic(Care_Of_Haematologist_Or_Oncologist, new AnswerBool(true)))
                .AddQuestionCollection(new QuestionCollectionGroup()
                    .AddQuestion(new QuestionBasic(Have_Malignant_Neoplasms, new AnswerBool(true)))
                    .AddQuestion(new QuestionBasic(Have_Hypo_Or_asplenic, new AnswerBool(true)))
                )
            )
        return new Vaccine(questionCollection);
    }
}
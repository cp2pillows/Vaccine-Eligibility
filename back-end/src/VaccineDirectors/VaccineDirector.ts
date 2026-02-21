import { Vaccine } from "src/Types/Vaccine";

export interface VaccineDirector{
    Build: () => Vaccine
}
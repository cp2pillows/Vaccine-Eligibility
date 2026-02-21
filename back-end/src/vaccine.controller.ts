import { Controller, Get } from "@nestjs/common";
import { VacccineService } from "./vaccine.service";

@Controller('vaccine')
export class VacccineController {
    constructor(private readonly vaccineService: VacccineService) {}

    @Get()
    getQuestions(): string[]{
        return this.vaccineService.getQuestions();
    }

}
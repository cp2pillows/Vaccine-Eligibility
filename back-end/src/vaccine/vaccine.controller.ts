import { Body, Controller, Get, HttpStatus, Post, Res } from "@nestjs/common";
import { VacccineService } from "./vaccine.service";
import { type Response } from "express";
import { CreateVaccineAnswer } from "./create-vaccine-answer.dto";

@Controller('vaccine')
export class VacccineController {
    constructor(private readonly vaccineService: VacccineService) {}

    @Get()
    getQuestions(): string[]{
        return this.vaccineService.getQuestions();
    }

    @Post()
    AnswerQuestion(
        @Res() response: Response,
        @Body() CreateVaccineAnswer: CreateVaccineAnswer,
    )
    {
        response.status(HttpStatus.CREATED);
        response.send();
        return this.vaccineService.answerQuestion(CreateVaccineAnswer);
    }

    @Get("results")
    GetResult()
    {
        return this.vaccineService.getVaccineStatus();
    }
}
import { Request, Response } from "express";
import { AddTaskUseCase } from "./UseCase";

export class AddTaskController {
    constructor(private useCase: AddTaskUseCase) { }

    async handle(request: Request, response: Response) {
        const result = await this.useCase.execute(request.body);
        if (result.has_error) return response.status(400).json(result);
        return response.status(200).json(result);
    }
}
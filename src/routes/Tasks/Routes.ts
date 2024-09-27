import { Router } from "express";
import { Request, Response } from "express";
import { addTaskController } from "../../useCases/Task/add/InversionControl";
import { fetchTaskController } from "../../useCases/Task/fetch/InversionControl";
import { authMiddleware } from "../../middlewares/VerifyToken";
import { deleteTaskController } from "../../useCases/Task/delete/InversionControl";

const Task_routes = Router();

Task_routes.post("/task", authMiddleware, async (req: Request, res: Response) => {
    return await addTaskController.handle(req, res)
})

Task_routes.post("/task/list", authMiddleware, async (req: Request, res: Response) => {
    return await fetchTaskController.handle(req, res)
})
Task_routes.delete("/task/", authMiddleware, async (req: Request, res: Response) => {
    return await deleteTaskController.handle(req, res)
})


export { Task_routes };
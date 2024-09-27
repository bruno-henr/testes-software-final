import { Router } from "express";
import { Request, Response } from "express";
import { User_routes } from "./User/Routes";
import { Task_routes } from "./Tasks/Routes";

const routes = Router();

routes.use(User_routes)
routes.use(Task_routes)

routes.get("/", async (req: Request, res: Response) => {
    res.render('index', {});
})


export { routes };
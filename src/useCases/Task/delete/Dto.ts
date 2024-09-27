import zod from 'zod';

export const DeleTaskDTO = zod.object({
    taskId: zod.string().min(2, "Você precisa informar o id de usuário."),
});

export type DeleteTaskModel = zod.infer<typeof DeleTaskDTO>;
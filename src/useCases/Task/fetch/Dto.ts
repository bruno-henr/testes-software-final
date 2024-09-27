import zod from 'zod';

export const FetchTaskDTO = zod.object({
    userId: zod.string().min(2, "Você precisa informar o id de usuário."),
});

export type FetchTaskModel = zod.infer<typeof FetchTaskDTO>;
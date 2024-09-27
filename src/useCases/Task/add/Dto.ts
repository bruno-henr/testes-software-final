import zod from 'zod';

const isValidDate = (dateString) => {
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d\d$/;
    if (!regex.test(dateString)) return false;

    const [day, month, year] = dateString.split('/').map(Number);
    const date = new Date(year, month - 1, day);

    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

export const AddTaskDTO = zod.object({
    name: zod.string().min(2, "Você precisa informar o seu nome."),
    desc: zod.string().min(2, "Você precisa informar a descrição da tarefa."),
    userId: zod.string().min(2, "Você precisa informar o id de usuário."),
    data: zod.string()
        .min(10, "Você precisa informar uma data válida.")
        .refine(isValidDate, {
            message: "A data deve estar no formato dd/mm/yyyy e ser uma data válida.",
        }),
});

export type AddTaskModel = zod.infer<typeof AddTaskDTO>;
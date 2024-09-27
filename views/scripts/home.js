let btnRemoveTask = document.getElementById("btnRemoveTask")
let btnLogout = document.getElementById("btnLogout")
btnLogout.addEventListener("click", () => {

    localStorage.removeItem('userData');

    const urlBase = window.location.origin + '/';
    window.location.href = urlBase;
});


btnRemoveTask.addEventListener("click", async ()=>{

    const taskId = document.getElementById('btnRemoveTask').dataset.taskId;
    const urlBase = window.location.origin + '/';
    let dataToSend = {
        taskId:taskId
    }
    const userData = localStorage.getItem('userData');
    const parsedData = JSON.parse(userData);
    let response = await fetch(`${urlBase}task/`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json', 
            'token':parsedData.data.token
        },
        body: JSON.stringify(dataToSend), 
    });
    let responseData = await response.json(); 
    if (responseData.has_error) {
        let errorMessages = responseData.error.map(err => err.message).join('\n');
        return alert(errorMessages);
    }
    window.location.reload();
})


function fillContainerActualTasks(tasks) {
    const container = document.getElementById('containerActualTasks');
    const parseDate = (dateString) => {
        const [day, month, year] = dateString.split('/').map(Number);
        return new Date(year, month - 1, day); // Mês começa do zero em JavaScript
    };

    const currentDate = new Date();

    // Limpa o container antes de preencher
    container.innerHTML = '';
    const pastContainer = document.getElementById('containerPastTask');
    pastContainer.innerHTML = ''; // Limpa o container de tarefas passadas

    const filteredTasks = tasks.filter(task => parseDate(task.expiresIn) >= currentDate);
    filteredTasks.forEach(task => {
        const itemContainer = document.createElement('div');
        itemContainer.className = 'itemContainer';
        itemContainer.innerHTML = `
            <strong>${task.name}</strong>
            <p>${task.description}</p>
            <strong>${task.expiresIn}</strong>
        `;
        itemContainer.addEventListener('click', () => {
            // Preenche os detalhes da tarefa na modal
            document.getElementById('modalTaskName').textContent = task.name;
            document.getElementById('modalTaskDescription').textContent = task.description;
            document.getElementById('modalTaskExpiresIn').textContent = task.expiresIn;

            // Armazena o ID da tarefa no botão de remover
            document.getElementById('btnRemoveTask').dataset.taskId = task.id;

            // Exibe a modal
            const modal = new bootstrap.Modal(document.getElementById('taskModal'));
            modal.show();
        });
        container.appendChild(itemContainer);
    });

    const pastTasks = tasks.filter(task => parseDate(task.expiresIn) < currentDate);
    pastTasks.forEach(task => {
        const itemContainer = document.createElement('div');
        itemContainer.className = 'itemContainer';
        itemContainer.innerHTML = `
            <strong>${task.name}</strong>
            <p>${task.description}</p>
            <strong>${task.expiresIn}</strong>
        `;
        itemContainer.addEventListener('click', () => {
            // Preenche os detalhes da tarefa na modal
            document.getElementById('modalTaskName').textContent = task.name;
            document.getElementById('modalTaskDescription').textContent = task.description;
            document.getElementById('modalTaskExpiresIn').textContent = task.expiresIn;

            // Armazena o ID da tarefa no botão de remover
            document.getElementById('btnRemoveTask').dataset.taskId = task.id;

            // Exibe a modal
            const modal = new bootstrap.Modal(document.getElementById('taskModal'));
            modal.show();
        });
        pastContainer.appendChild(itemContainer);
    });
}

async function getTasks(){
    const urlBase = window.location.origin + '/';
    const userData = localStorage.getItem('userData');
    const parsedData = JSON.parse(userData);
    let dataToSend = {
        userId: parsedData.data.id
    }
        let response = await fetch(`${urlBase}task/list/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                'token':parsedData.data.token
            },
            body: JSON.stringify(dataToSend),
        });
        let responseData = await response.json(); 
        fillContainerActualTasks(responseData.data)
        if (responseData.has_error) {
            console.log(responseData)
            let errorMessages = responseData.error.map(err => err.message).join('\n');
            return alert(errorMessages);
        }
        
}





document.addEventListener("DOMContentLoaded", function() {
    getTasks()
});
let btnAddTask = document.getElementById("btnAddTask")




btnAddTask.addEventListener("click", async ()=>{
    if(validateForm()){
        const userData = localStorage.getItem('userData');
        const parsedData = JSON.parse(userData);
        let dataToSend = {
            name : document.getElementById("inputRegisterName").value,
            desc : document.getElementById("inputRegisterDesc").value,
            data : converterData(document.getElementById("data").value),
            userId: parsedData.data.id
        }
        const urlBase = window.location.origin + '/';


        let response = await fetch(`${urlBase}task/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
                'token':parsedData.data.token
            },
            body: JSON.stringify(dataToSend), 
        });
        let responseData = await response.json(); 
        if (responseData.has_error) {
            let errorMessages = responseData.error.map(err => err.message).join('\n');
            return alert(errorMessages);
        }

        document.getElementById("inputRegisterName").value = ''
        document.getElementById("inputRegisterDesc").value = ''
        document.getElementById("data").value = ''
        document.getElementById("btnFechar").click()
        window.location.reload();
    }
    
})
function converterData(dataOriginal) {
    const partes = dataOriginal.split("-");
    const ano = partes[0].slice(-4); 
    const mes = partes[1];
    const dia = partes[2];
    return `${dia}/${mes}/${ano}`;
}


function validateForm() {
    let name = document.getElementById("inputRegisterName").value;
    let desc = document.getElementById("inputRegisterDesc").value;
    let data = document.getElementById("data").value;

    // Verifica se os campos estão vazios
    if (!name) {
        alert("O campo Nome está vazio.");
        return false;
    }
    
    if (!desc) {
        alert("O campo descrição está vazio.");
        return false;
    }
    
    if (!data) {
        alert("O campo data está vazio.");
        return false;
    }

    // Verifica se a data é anterior à data atual
    const inputDate = new Date(data);
    const currentDate = new Date();
    // Reseta a hora do currentDate para comparar apenas a data
    currentDate.setHours(0, 0, 0, 0);

    if (inputDate < currentDate) {
        alert("A data não pode ser anterior à data atual.");
        return false;
    }

    return true;
}

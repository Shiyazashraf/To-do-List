const projectContainer = document.querySelector('[data-projects]');
const newProjectForm = document.querySelector('[data-new-project-form]');
const newProjectInput = document.querySelector('[data-new-project-input]');

const LOCAL_STORAGE_PROJECT_KEY = 'item.projects';
const LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY = 'item.selectedProjectId';
let projects = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECT_KEY)) || [];
let selectedProjectId = localStorage.getItem(LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY);


projectContainer.addEventListener('click',e => {
    if(e.target.tagName.toLowerCase() === 'li') {
        selectedProjectId = e.target.dataset.projectid;
        console.log(selectedProjectId);
        saveAndRender();
    }
})


function deleteProject(e) {
    let id = e.currentTarget.dataset.projectid;
    console.log(id)
    const index = projects.findIndex(project => project.id === id)

    if(index !== -1) {
        projects.splice(index,1);
        saveAndRender();
    }
}

function saveAndRender() {
    save();
    render();
}

function save() {
    localStorage.setItem(LOCAL_STORAGE_PROJECT_KEY, JSON.stringify(projects));
    localStorage.setItem(LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY,selectedProjectId)
}

function renderall() {
    saveAndRender()
}

newProjectForm.addEventListener('submit', e => {
    e.preventDefault();
    const projectName = newProjectInput.value;
    if(projectName == null || projectName == '') return
    const project = createProject(projectName)
    newProjectInput.value = null;
    projects.push(project);
    saveAndRender(); 
})

function createProject(name) {
    return {id: Date.now().toString(), name: name, tasks: []}
}

function clearElement(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild)
    }
}


function render() {
    clearElement(projectContainer)
    projects.forEach(project => {
        const projectElement = document.createElement('li');
        projectElement.dataset.projectid = project.id
        projectElement.classList.add("project");
        projectElement.innerText = project.name;
        if(project.id === selectedProjectId) {
            projectElement.classList.add('active-project');
        }
        const projectDeleteButton = document.createElement('button');
        projectDeleteButton.classList.add('project-delete-button');
        projectDeleteButton.dataset.projectid = project.id;
        projectDeleteButton.innerHTML = `<i class='bx bxs-trash'></i>`;
        projectDeleteButton.addEventListener('click',deleteProject)
        projectElement.appendChild(projectDeleteButton);
        projectContainer.appendChild(projectElement);
    })
}


export {renderall}


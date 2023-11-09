const projectContainer = document.querySelector('[data-projects]');
const newProjectForm = document.querySelector('[data-new-project-form]');
const newProjectInput = document.querySelector('[data-new-project-input]');
const deleteProjectButton = document.querySelector('[data-delete-project-button]')
const itemDisplayContainer = document.querySelector('[data-item-display-container]');
const itemTitleElement = document.querySelector('[data-item-title]');
const itemCountElement = document.querySelector('[data-item-count]');
const itemsContainer = document.querySelector('[data-items]');
const itemTemplate = document.getElementById('item-template');
const newItemForm = document.querySelector('[data-new-item-form]');
const newItemInput = document.querySelector('[data-new-item-input]');
const clearCompletedItemsButton = document.querySelector('[data-clear-completed-items]');

const LOCAL_STORAGE_PROJECT_KEY = 'item.projects';
const LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY = 'item.selectedProjectId';
let projects = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECT_KEY)) || [];
let selectedProjectId = localStorage.getItem(LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY);


projectContainer.addEventListener('click',e => {
    if(e.target.tagName.toLowerCase() === 'li') {
        selectedProjectId = e.target.dataset.projectid;
        saveAndRender();
    }
})

itemsContainer.addEventListener('click', e => {
    if(e.target.tagName.toLowerCase() === 'input') {
        const selectedProject = projects.find(project => project.id === selectedProjectId);
        const selectedItem = selectedProject.items.find(item => item.id === e.target.id)
        selectedItem.complete = e.target.checked;
        save();
        renderItemCount(selectedProject)
    
    }
})

clearCompletedItemsButton.addEventListener('click', e => {
    const selectedProject = projects.find(project => project.id === selectedProjectId);
    selectedProject.items = selectedProject.items.filter(item => !item.complete);
    saveAndRender();
})

function deleteProject(e) {
    let id = e.currentTarget.dataset.projectid;
    const index = projects.findIndex(project => project.id === id)

    if(index !== -1) {
        projects.splice(index,1);
        selectedProjectId = null;
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

deleteProjectButton.addEventListener('click', e => {
    projects = projects.filter(project => project.id !== selectedProjectId);
    selectedProjectId = null;
    saveAndRender()
})

newProjectForm.addEventListener('submit', e => {
    e.preventDefault();
    const projectName = newProjectInput.value;
    if(projectName == null || projectName == '') return
    const project = createProject(projectName)
    newProjectInput.value = null;
    projects.push(project);
    saveAndRender(); 
})

newItemForm.addEventListener('submit', e => {
    e.preventDefault();
    const itemName = newItemInput.value;
    if(itemName == null || itemName == '') return
    const item = createItem(itemName)
    newItemInput.value = null;
    const selectedProject = projects.find(project => project.id === selectedProjectId);
    selectedProject.items.push(item);
    saveAndRender(); 
})


function createProject(name) {
    return {id: Date.now().toString(), name: name, items: []}
}

function createItem(name) {
    return {id: Date.now().toString(), name: name, complete: false}
}

function clearElement(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild)
    }
}


function render() {
    clearElement(projectContainer);
    renderProjects();
     const selectedProject = projects.find(project => project.id === selectedProjectId);
    if(selectedProjectId == null) {
        itemDisplayContainer.style.opacity = 0;

    } else {
        itemDisplayContainer.style.opacity = '';
        itemTitleElement.innerText = selectedProject.name;
        renderItemCount(selectedProject);
        clearElement(itemsContainer);
        renderItems(selectedProject)
    }
   
}

function renderItems(selectedProject) {
    selectedProject.items.forEach(item => {
        const itemElement = document.importNode(itemTemplate.content, true) // true will render everything insdie template
        const checkbox = itemElement.querySelector('input');
        checkbox.id = item.id;
        checkbox.checked = item.complete;
        const label = itemElement.querySelector('label');
        label.htmlFor = item.id;
        label.append(item.name);
        itemsContainer.appendChild(itemElement);
    })
}


function renderItemCount(selectedProject){
    const incompleteItemCount = selectedProject.items.filter(item => !item.complete).length;
    const itemString = incompleteItemCount === 1 ? 'item' : 'items';
    itemCountElement.innerText = `${incompleteItemCount} ${itemString} remaining`;
}

function renderProjects() {
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


/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todo */ \"./src/todo.js\");\n\n\n(0,_todo__WEBPACK_IMPORTED_MODULE_0__.renderall)()\n\n//# sourceURL=webpack://to-do-list/./src/index.js?");

/***/ }),

/***/ "./src/todo.js":
/*!*********************!*\
  !*** ./src/todo.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderall: () => (/* binding */ renderall)\n/* harmony export */ });\nconst projectContainer = document.querySelector('[data-projects]');\nconst newProjectForm = document.querySelector('[data-new-project-form]');\nconst newProjectInput = document.querySelector('[data-new-project-input]');\nconst deleteProjectButton = document.querySelector('[data-delete-project-button]')\nconst itemDisplayContainer = document.querySelector('[data-item-display-container]');\nconst itemTitleElement = document.querySelector('[data-item-title]');\nconst itemCountElement = document.querySelector('[data-item-count]');\nconst itemsContainer = document.querySelector('[data-items]');\nconst itemTemplate = document.getElementById('item-template');\nconst newItemForm = document.querySelector('[data-new-item-form]');\nconst newItemInput = document.querySelector('[data-new-item-input]');\nconst clearCompletedItemsButton = document.querySelector('[data-clear-completed-items]');\n\nconst LOCAL_STORAGE_PROJECT_KEY = 'item.projects';\nconst LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY = 'item.selectedProjectId';\nlet projects = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECT_KEY)) || [];\nlet selectedProjectId = localStorage.getItem(LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY);\n\n\nprojectContainer.addEventListener('click',e => {\n    if(e.target.tagName.toLowerCase() === 'li') {\n        selectedProjectId = e.target.dataset.projectid;\n        saveAndRender();\n    }\n})\n\nitemsContainer.addEventListener('click', e => {\n    if(e.target.tagName.toLowerCase() === 'input') {\n        const selectedProject = projects.find(project => project.id === selectedProjectId);\n        const selectedItem = selectedProject.items.find(item => item.id === e.target.id)\n        selectedItem.complete = e.target.checked;\n        save();\n        renderItemCount(selectedProject)\n    \n    }\n})\n\nclearCompletedItemsButton.addEventListener('click', e => {\n    const selectedProject = projects.find(project => project.id === selectedProjectId);\n    selectedProject.items = selectedProject.items.filter(item => !item.complete);\n    saveAndRender();\n})\n\nfunction deleteProject(e) {\n    let id = e.currentTarget.dataset.projectid;\n    const index = projects.findIndex(project => project.id === id)\n\n    if(index !== -1) {\n        projects.splice(index,1);\n        selectedProjectId = null;\n        saveAndRender();\n    }\n}\n\nfunction saveAndRender() {\n    save();\n    render();\n}\n\nfunction save() {\n    localStorage.setItem(LOCAL_STORAGE_PROJECT_KEY, JSON.stringify(projects));\n    localStorage.setItem(LOCAL_STORAGE_SELECTED_PROJECT_ID_KEY,selectedProjectId)\n}\n\nfunction renderall() {\n    saveAndRender()\n}\n\ndeleteProjectButton.addEventListener('click', e => {\n    projects = projects.filter(project => project.id !== selectedProjectId);\n    selectedProjectId = null;\n    saveAndRender()\n})\n\nnewProjectForm.addEventListener('submit', e => {\n    e.preventDefault();\n    const projectName = newProjectInput.value;\n    if(projectName == null || projectName == '') return\n    const project = createProject(projectName)\n    newProjectInput.value = null;\n    projects.push(project);\n    saveAndRender(); \n})\n\nnewItemForm.addEventListener('submit', e => {\n    e.preventDefault();\n    const itemName = newItemInput.value;\n    if(itemName == null || itemName == '') return\n    const item = createItem(itemName)\n    newItemInput.value = null;\n    const selectedProject = projects.find(project => project.id === selectedProjectId);\n    selectedProject.items.push(item);\n    saveAndRender(); \n})\n\n\nfunction createProject(name) {\n    return {id: Date.now().toString(), name: name, items: []}\n}\n\nfunction createItem(name) {\n    return {id: Date.now().toString(), name: name, complete: false}\n}\n\nfunction clearElement(element) {\n    while(element.firstChild) {\n        element.removeChild(element.firstChild)\n    }\n}\n\n\nfunction render() {\n    clearElement(projectContainer);\n    renderProjects();\n     const selectedProject = projects.find(project => project.id === selectedProjectId);\n    if(selectedProjectId == null) {\n        itemDisplayContainer.style.opacity = 0;\n\n    } else {\n        itemDisplayContainer.style.opacity = '';\n        itemTitleElement.innerText = selectedProject.name;\n        renderItemCount(selectedProject);\n        clearElement(itemsContainer);\n        renderItems(selectedProject)\n    }\n   \n}\n\nfunction renderItems(selectedProject) {\n    selectedProject.items.forEach(item => {\n        const itemElement = document.importNode(itemTemplate.content, true) // true will render everything insdie template\n        const checkbox = itemElement.querySelector('input');\n        checkbox.id = item.id;\n        checkbox.checked = item.complete;\n        const label = itemElement.querySelector('label');\n        label.htmlFor = item.id;\n        label.append(item.name);\n        itemsContainer.appendChild(itemElement);\n    })\n}\n\n\nfunction renderItemCount(selectedProject){\n    const incompleteItemCount = selectedProject.items.filter(item => !item.complete).length;\n    const itemString = incompleteItemCount === 1 ? 'item' : 'items';\n    itemCountElement.innerText = `${incompleteItemCount} ${itemString} remaining`;\n}\n\nfunction renderProjects() {\n    projects.forEach(project => {\n        const projectElement = document.createElement('li');\n        projectElement.dataset.projectid = project.id\n        projectElement.classList.add(\"project\");\n        projectElement.innerText = project.name;\n        if(project.id === selectedProjectId) {\n            projectElement.classList.add('active-project');\n        }\n        const projectDeleteButton = document.createElement('button');\n        projectDeleteButton.classList.add('project-delete-button');\n        projectDeleteButton.dataset.projectid = project.id;\n        projectDeleteButton.innerHTML = `<i class='bx bxs-trash'></i>`;\n        projectDeleteButton.addEventListener('click',deleteProject)\n        projectElement.appendChild(projectDeleteButton);\n        projectContainer.appendChild(projectElement);\n    })\n}\n\n\n\n\n\n\n//# sourceURL=webpack://to-do-list/./src/todo.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
import { Route } from "../router";
import { store } from "../store";
import completeButton from "./completeButton";
import removeButton from "./removeButton";
import prioritySvg from "./svg/prioritySvg";

// type Params = {
//     id: number;
// };
export function getTask(params: Route["params"]) {
    const state = store.getState();
    if (state.tasks.length <= Number(params.id)) {
        return `<div class="single-task-view">
            <p style="font-size:2em">Task Not found !!!!</p>
        </div>`;
    }
    const task = state.tasks[Number(params.id)];
    let i = 0;
    const completed = task.status == "Completed" ? "completed-task" : "";
    return `
        <div class="single-task-view ">
            <div
                class="card animate-card task ${completed}"
                data-id="${params.id}"
                style=" --i:${i++} "
            >
                <div class="task-head">
                    <span class="task-title">${task.title}</span>
                    <span class="task-priority ${task.priority.toLowerCase()}">
                        ${prioritySvg()}
                        <span>${task.priority}</span></span
                    >
                </div>
                <div class="task-details">
                    <div class="assigned">
                        <span class="assigned-span">ASSIGNED</span>
                        <span class="assigned-name">${task.assigned}</span>
                    </div>
                    <div class="due">
                        <span class="due-span">DUE</span>
                        <span class="due-date">${task.due}</span>
                    </div>
                    <div class="task-status">
                        <span class="status-span">STATUS</span>
                        <span class="status">${task.status}</span>
                    </div>
                </div>
                <div class="taskOperations">
                    ${completeButton()} ${removeButton()}
                </div>
            </div>
        </div>
    `;
}

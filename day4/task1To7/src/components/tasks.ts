import { store, getStats } from "../store";
import { type Task } from "../store";
import completeButton from "./completeButton";
import removeButton from "./removeButton";
import prioritySvg from "./svg/prioritySvg";

const html = String.raw;
export default function tasks() {
    const state = store.getState();
    const tasks: Task[] = state.tasks;
    const { total, completed, pending } = getStats(state.tasks);
    let i = 3;
    return html`<div class="tasks-container">
        <div class="sub-head">
            <span class="sub-head-desc">Your Tasks</span>
            <div id="task-count-span">${total} Tasks</div>
        </div>
        <div class="task-cards cards">
            ${Object.keys(tasks)
                .map((task_id) => {
                    const task = tasks[Number(task_id)];
                    const completed =
                        task.status == "Completed" ? "completed-task" : "";
                    return `
                            <div class="card animate-card task ${completed}" data-id='${tasks[Number(task_id)].id}' style=" --i:${i++} ">
                                <div class="task-head">
                                    <span class="task-title">${task.title}</span>
                                    <span class="task-priority ${task.priority.toLowerCase()}">
                                    ${prioritySvg()}
                                    <span>${task.priority}</span
                                    ></span>
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
                                    ${completeButton()} 
                                    ${removeButton()} 
                                </div>
                            </div>
                            `;
                })
                .join(" ")}
        </div>
    </div>`;
}

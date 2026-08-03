import { store } from "../store";

export default function clickEventListeners(): void {
    window.addEventListener("click", (event) => {
        if (!event) return;
        if (!(event.target instanceof HTMLElement)) return;
        const element = event.target.closest("[data-action]");
        console.log(element);
        if (!element || !(element instanceof HTMLElement)) return;

        const action = element.dataset.action;
        console.log(action);
        const task: HTMLElement = element.closest("[data-id]")!;

        let taskId = 0;
        if (task) {
            taskId = Number(task.dataset.id);
        }

        if (action === "open-modal") {
            const modal = document.querySelector(
                ".task-modal-container"
            ) as HTMLElement;
            console.log("clicked");

            modal.style.display = "flex";
        }
        if (action === "close-modal") {
            const modal = document.querySelector(".task-modal-container");
            if (!(modal instanceof HTMLElement)) return;
            modal.style.display = "none";
        }
        if (action === "complete") {
            const state = store.getState();
            let taskList = state.tasks;

            const status =
                taskList[taskId].status == "Pending" ? "Completed" : "Pending";

            store.dispatch({
                type: "UPDATE_TASK",
                payload: {
                    id: taskId,
                    updates: {
                        status: status,
                    },
                },
            });
        }

        if (action === "remove-task") {
            store.dispatch({
                type: "DELETE_TASK",
                payload: {
                    id: taskId,
                },
            });
        }
    });
}

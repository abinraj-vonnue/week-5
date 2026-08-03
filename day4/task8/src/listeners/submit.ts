import { store, Task } from "../store";
import FormValidator from "@utils/formValidator";

export default function submitEventListeners() {
    window.addEventListener("submit", (event) => {
        event.preventDefault();
        const element = event.submitter;
        if (!element) return;
        const action = element.dataset.action;
        if (action === "submit-task") {
            const form = document.getElementById("task-form");
            if (!(form instanceof HTMLFormElement)) return;
            const rules = {
                name: { required: true },
                priority: { required: true },
                assignee: { required: true },
                due: { required: true },
            };
            const formValidator = new FormValidator(form, rules);

            const isValid = formValidator.validateAll();
            if (!isValid) {
                return;
            }

            const data = new FormData(form);
            const title = String(data.get("name"));
            const priority = data.get("priority") as Task["priority"];

            const assignee = String(data.get("assignee"));
            const due = String(data.get("due"));

            store.dispatch({
                type: "ADD_TASK",
                payload: {
                    title: title,
                    assigned: assignee,
                    due: due,
                    status: "Pending",
                    priority: priority,
                },
            });
        }
    });
}

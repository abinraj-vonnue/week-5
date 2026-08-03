import { closeButton } from "./closeButton";
import addSvg from "./svg/addSvg";

export default function modal() {
    return `
        <div class="task-modal-container">
            <div class="task-modal">
                <div class="modal-head">
                    <span>New Task</span>
                    ${closeButton()}
                </div>
                <p class="notes">All fields are required</p>
                <div class="form-section">
                    <form action="" id="task-form" novalidate>
                        <div class="name-section input-section">
                            <div class="name-div">
                                <label for="name">TASK NAME</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="e.g.Create Login Page"
                                    required
                                    minlength="2"
                                />
                                <span class="error"></span>
                            </div>
                            <div class="priority-div">
                                <label for="priority">PRIORITY</label>
                                <select name="priority" id="priority">
                                    <option value="">Select Priority</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                    <option value="Low">Low</option>
                                </select>
                                <span class="error"></span>
                            </div>
                        </div>
                        <div class="assignee-section input-section">
                            <div class="assignee-div">
                                <label for="assignee">ASSIGNEE</label>
                                <input
                                    type="text"
                                    name="assignee"
                                    id="assignee"
                                    placeholder="e.g.Rahul"
                                    required
                                    minlength="3"
                                />
                                <span class="error"></span>
                            </div>
                            <div class="due-date-div">
                                <label for="due-date">DUE DATE</label>
                                <input type="date" name="due" id="due-date" />
                                <span class="error"></span>
                            </div>
                        </div>
                        <div class="add-button-div">
                            <button
                                class="add"
                                id="submitTask"
                                type="submit"
                                data-action="submit-task"
                            >
                                Add Task ${addSvg()}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
}

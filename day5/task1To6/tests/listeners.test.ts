beforeEach(() => {
    jest.resetModules();
    document.body.innerHTML = "";
});

describe("click events : ", () => {
    test("open modal when  add button clicked : ", async () => {
        const { default: clickEventListeners } =
            await import("../src/listeners/click");
        document.body.innerHTML = `<div
                class="task-modal-container"
                style="display:none"
            ></div>
            <button data-action="open-modal"></button> `;

        clickEventListeners();
        const button = document.querySelector("button") as HTMLButtonElement;
        button.click();

        const taskModal = document.querySelector(".task-modal-container");
        if (!(taskModal instanceof HTMLElement)) return;
        expect(taskModal.style.display).toBe("flex");
    });
    test("close modal when close button clicked : ", async () => {
        const { default: clickEventListeners } =
            await import("../src/listeners/click");
        document.body.innerHTML = `<div
                    class="task-modal-container"
                    style="display:none"
                ></div>
                <button data-action="close-modal"></button>`;
        clickEventListeners();
        document.querySelector("button")!.click();
        /** @type  { HTMLElement | null} */
        const taskModal = document.querySelector(
            ".task-modal-container"
        )! as HTMLElement;

        expect(taskModal.style.display).toBe("none");
    });
    test("dispatch UPDATE_TASK event when compelete button clicked", async () => {
        const dispatch = jest.fn();

        jest.doMock("../src/store", () => ({
            store: {
                getState: () => ({
                    tasks: [
                        {
                            status: "Pending",
                        },
                    ],
                }),
                dispatch,
            },
        }));
        const { default: clickEventListeners } =
            await import("../src/listeners/click");
        document.body.innerHTML = ` <div class="task" data-id="0">
                <button data-action="complete"></button>
            </div>`;
        clickEventListeners();
        document.querySelector("button")!.click();

        expect(dispatch).toHaveBeenCalledWith({
            type: "UPDATE_TASK",
            payload: {
                id: 0,
                updates: {
                    status: "Completed",
                },
            },
        });
    });
    test("dispatch DELETE_TASK event on data-action: remove-task", async () => {
        const dispatch = jest.fn();

        jest.doMock("../src/store", () => ({
            store: {
                getState: () => ({
                    tasks: [
                        {
                            id: 101,
                        },
                    ],
                }),
                dispatch,
            },
        }));
        const { default: clickEventListeners } =
            await import("../src/listeners/click");
        document.body.innerHTML = ` <div class="task" data-id="101">
                <button data-action="remove-task"></button>
            </div>`;
        clickEventListeners();
        document.querySelector("button")!.click();
        expect(dispatch).toHaveBeenCalledWith({
            type: "DELETE_TASK",
            payload: {
                id: 101,
            },
        });
    });
});

describe("keydown events", () => {
    test("Escape key : closes the modal ", async () => {
        const { default: keyBoardEventListener } =
            await import("../src/listeners/key");
        document.body.innerHTML = `<div
                class="task-modal-container"
                style="display:flex"
            >
                <div class="task-modal" style="display:flex"></div>
            </div> `;
        keyBoardEventListener();
        const escapeEvent = new KeyboardEvent("keydown", {
            key: "Escape",
            keyCode: 27,
        });
        window.dispatchEvent(escapeEvent);
        const taskModal = document.querySelector(".task-modal")! as HTMLElement;
        expect(taskModal.style.display).toBe("none");
    });
    test("Enter key : submit the form", async () => {
        const { default: keyBoardEventListener } =
            await import("../src/listeners/key");
        document.body.innerHTML = `<div
                class="task-modal-container"
                style="display:flex"
            >
                <div class="task-modal" style="display:flex"></div>
                <button id="submitTask"></button>
            </div> `;
        const clickSpy = jest.spyOn(
            document.getElementById("submitTask")!,
            "click"
        );
        keyBoardEventListener();
        const enterEvent = new KeyboardEvent("keydown", {
            key: "Enter",
        });
        window.dispatchEvent(enterEvent);
        expect(clickSpy).toHaveBeenCalledTimes(2);
    });
});
describe("submit events", () => {
    test("submiting form dispatch ADD_TASK", async () => {
        const dispatch = jest.fn();
        jest.doMock("../src/store", () => ({
            store: {
                getState: () => ({
                    tasks: [],
                }),
                dispatch,
            },
        }));
        jest.doMock("../src/utilities/formValidator", () => ({
            __esModule: true,
            default: jest.fn().mockImplementation(() => ({
                validateAll: () => true,
            })),
        }));
        const { default: modal } = await import("../src/components/modal");
        const { default: submitEventListeners } =
            await import("../src/listeners/submit");
        document.body.innerHTML = modal();
        submitEventListeners();
        const form = document.getElementById("task-form");
        if (!form) return;
        const name = form.querySelector("input#name") as HTMLInputElement;
        const priority = form.querySelector("#priority") as HTMLInputElement;
        const assignee = form.querySelector("#assignee") as HTMLInputElement;
        const due = form.querySelector("#due-date") as HTMLInputElement;
        name.value = "task";
        priority.value = "Medium";
        assignee.value = "Rahul";
        due.value = "2026-07-09";
        const submitButton = document.getElementById("submitTask")!;
        submitButton.click();
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith({
            type: "ADD_TASK",
            payload: {
                title: "task",
                assigned: "Rahul",
                due: "2026-07-09",
                status: "Pending",
                priority: "Medium",
            },
        });
    });
    test("submitting invalid form : ", async () => {
        const dispatch = jest.fn();
        jest.doMock("../src/store", () => ({
            store: {
                getState: () => ({
                    tasks: [],
                }),
                dispatch,
            },
        }));
        jest.doMock("../src/utilities/formValidator", () => ({
            __esModule: true,
            default: jest.fn().mockImplementation(() => ({
                validateAll: () => false,
            })),
        }));
        const { default: modal } = await import("../src/components/modal");
        const { default: submitEventListeners } =
            await import("../src/listeners/submit");
        document.body.innerHTML = modal();
        submitEventListeners();
        const form = document.getElementById("task-form");
        if (!form) return;
        const name = form.querySelector("input#name") as HTMLInputElement;
        const priority = form.querySelector("#priority") as HTMLInputElement;
        const assignee = form.querySelector("#assignee") as HTMLInputElement;
        const due = form.querySelector("#due-date") as HTMLInputElement;
        name.value = "task";
        priority.value = "Medium";
        assignee.value = "2026-07-09";
        due.value = "";
        const submitButton = document.getElementById("submitTask")!;
        submitButton.click();
        expect(dispatch).not.toHaveBeenCalled();
    });
});

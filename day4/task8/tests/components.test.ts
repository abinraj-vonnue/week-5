jest.mock("../src/store", () => ({
    store: {
        getState: () => ({
            tasks: [
                {
                    id: "0",
                    title: "task 1",
                    assigned: "Rahul",
                    due: "25-AUG-2026",
                    status: "Completed",
                    priority: "High",
                },
            ],
        }),
    },
}));

describe(" reusable components : returns html successfully", () => {
    test("addButton ", async () => {
        jest.resetModules();

        const { default: addButton } =
            await import("../src/components/addButton");

        const html = addButton();

        expect(html).toContain('id="addButton"');
        expect(html).toContain("Add Task");
    });
    test("closeButton", async () => {
        jest.resetModules();
        const { closeButton } = await import("../src/components/closeButton");

        const html = closeButton();

        expect(html).toContain('id="closeBtn"');
        expect(html).toContain("data-action='close-modal'");
    });
    test("completeButton", async () => {
        jest.resetModules();
        const { default: completeButton } =
            await import("../src/components/completeButton");

        const html = completeButton();

        expect(html).toContain('data-action="complete"');
    });
});

describe("getTask: ", () => {
    test("returns 'task not found'", async () => {
        jest.resetModules();
        // console.log(getState);
        const { getTask } = await import("../src/components/getTask");

        const html = getTask({ id: "199" });
        expect(html).toContain("Task Not found");
    });
    test("returns task when found", async () => {
        jest.resetModules();
        const { getTask } = await import("../src/components/getTask");

        const html = getTask({ id: "0" });
        expect(html).toContain("task 1");
        expect(html).toContain("Completed");
    });
});

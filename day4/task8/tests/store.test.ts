import { initialState, reducer } from "../src/store";

describe("store : routes", () => {
    test("route changed", () => {
        const state = reducer(initialState, {
            type: "ROUTE_CHANGED",
            payload: {
                route: { path: "/tasks/1", params: { id: "1" } },
            },
        });
        expect(state.route.path).toBe("/tasks/1");
        expect(state.route.params.id).toBe("1");
    });
});

describe("store : CRUD", () => {
    test("ADD TASK : ", () => {
        const state = reducer(initialState, {
            type: "ADD_TASK",
            payload: {
                task: {
                    title: "test",
                    assigned: "Rahul",
                    due: "25-AUG-2026",
                    status: "Pending",
                    priority: "High",
                },
            },
        });
        expect(state.tasks).toHaveLength(initialState.tasks.length + 1);
        expect(state.tasks).toContainEqual({
            title: "test",
            assigned: "Rahul",
            id: state.tasks.length - 1,
            due: "25-AUG-2026",
            status: "Pending",
            priority: "High",
        });
    });
    test("UPDATE_TASK", () => {
        const state = reducer(initialState, {
            type: "UPDATE_TASK",
            payload: {
                id: 1,
                title: "New test",
            },
        });
    });
});

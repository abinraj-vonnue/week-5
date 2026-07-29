type State = {
    tasks: Task[];
};
type Task = {
    id: number;
    name: string;
    column: "Todo" | "Completed" | "Inprogress";
};
type Action =
    | { type: "ADD_CARD"; payload: { task: Omit<Task, "id"> } }
    | { type: "REMOVE_CARD"; payload: { id: number } }
    | { type: "MOVE_CARD"; payload: { id: number; column: Task["column"] } };

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "ADD_CARD": {
            const maxId =
                state.tasks.length > 0
                    ? Math.max(...state.tasks.map((t) => t.id))
                    : -1;

            const updatedTasks = [
                ...state.tasks,
                {
                    name: action.payload.task?.name || "todo",
                    column: action.payload.task?.column || "Todo",
                    id: maxId + 1,
                },
            ];
            return { ...state, tasks: updatedTasks };
        }
        case "REMOVE_CARD": {
            const id = action.payload.id;
            if (id === undefined) return state;
            const updatedTasks = state.tasks.filter((task) => task.id !== id);

            return { ...state, tasks: updatedTasks };
        }
        case "MOVE_CARD": {
            const { id, column } = action.payload;
            if (id === undefined || !column) return state;

            const updatedTasks = state.tasks.map((task) =>
                task.id === id ? { ...task, column } : task
            );
            return { ...state, tasks: updatedTasks };
        }
        default:
            return state;
    }
}

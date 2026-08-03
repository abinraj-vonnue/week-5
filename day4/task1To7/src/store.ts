// store.js
// store.js
type Route = {
    path: string;
    params: Record<string, string>;
};
export type Task = {
    id: number;
    title: string;
    assigned: string;
    due: string;
    status: "Pending" | "Completed";
    priority: "High" | "Low" | "Medium";
};
type State = {
    route: Route;
    tasks: Task[];
};
type Payload = {
    title?: string;
    id?: number;
    due?: string;
    updates?: Partial<Task>;
    assigned?: string;
    route?: Route;
    task?: Omit<Task, "id">;
    status?: "Pending" | "Completed";
    priority?: "High" | "Low" | "Medium";
    path?: string;
    params?: Record<string, string>;
};

type Action = {
    type: "ROUTE_CHANGED" | "ADD_TASK" | "UPDATE_TASK" | "DELETE_TASK";
    payload: Payload;
};
export const initialState: State = {
    route: {
        path: "/",
        params: {},
    },

    tasks: [
        {
            id: 0,
            title: "Create Login Page",
            assigned: "Rahul",
            due: "25-AUG-2026",
            status: "Pending",
            priority: "High",
        },
        {
            id: 1,
            title: "Design Layout",
            assigned: "Priya",
            due: "30-Jul-2026",
            status: "Completed",
            priority: "Medium",
        },
        {
            id: 2,
            title: "API Integration",
            assigned: "Arjun",
            due: "10-Sep-2026",
            status: "Pending",
            priority: "High",
        },
        {
            id: 3,
            title: "Write Unit Tests",
            assigned: "Sneha",
            due: "5-Aug-2026",
            status: "Pending",
            priority: "Low",
        },
    ],
};
export function reducer(state: State, action: Action): State {
    switch (action.type) {
        case "ROUTE_CHANGED":
            return {
                ...state,
                route: action.payload.route || state.route,
            };
        case "ADD_TASK": {
            const maxId = state.tasks.reduce(
                (max, task) => (task.id > max ? task.id : max),
                -1
            );
            const updatedTasks = [
                ...state.tasks,
                {
                    id: maxId + 1,
                    title: action.payload.task?.title || "Untitled Task",
                    assigned: action.payload.task?.assigned || "Unassigned",
                    due: action.payload.task?.due || "",
                    status: action.payload.task?.status || "Pending",
                    priority: action.payload.task?.priority || "Medium",
                },
            ];
            return { ...state, tasks: updatedTasks };
        }
        case "UPDATE_TASK": {
            const { id, updates } = action.payload;

            const updatedTasks = state.tasks.map((task) =>
                task.id == id ? { ...task, ...updates } : task
            );

            return {
                ...state,
                tasks: updatedTasks,
            };
        }
        case "DELETE_TASK": {
            const { id } = action.payload;
            const updatedTasks = state.tasks.filter((task) => task.id !== id);
            return {
                ...state,
                tasks: updatedTasks,
            };
        }
        default:
            return state;
    }
}

export function createStore(initialState: State, reducer: Function) {
    const savedState = localStorage.getItem("state");
    let state: State = savedState ? JSON.parse(savedState) : initialState;
    const listeners: Function[] = [];
    return {
        getState() {
            return state;
        },
        dispatch(action: Action) {
            state = reducer(state, action);
            localStorage.setItem("state", JSON.stringify(state));
            listeners.forEach((listener) => listener(state));
        },
        subscribe(listener: Function) {
            listeners.push(listener);
            return () => {
                const index = listeners.indexOf(listener);
                if (index > -1) listeners.splice(index, 1);
            };
        },
    };
}

export const store = createStore(initialState, reducer);

export function getStats(tasks: Task[]): Record<string, number> {
    const total = tasks.length;
    const completed = tasks.filter(
        (task) => task.status === "Completed"
    ).length;
    return { total, completed, pending: total - completed };
}

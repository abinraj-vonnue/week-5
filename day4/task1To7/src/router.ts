// router
// router

import { getTask } from "./components/getTask";
import { navigate } from "./navigate";
import register, { routes } from "./register";
import Home from "./routes/home";
import login from "./routes/login";
import signup from "./routes/signUp";
import { store } from "./store";
export type Route = {
    path: string;
    params: Record<string, string>;
};
type Task = {
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
const app: HTMLElement = document.getElementById("app")!;

register("/", Home);
register("/login", login);
register("/signup", signup);
register("/tasks/:id", getTask);

let previousPath: Route["path"] | null = null;

const render = (state: State): void => {
    const currentPath: Route["path"] = state.route.path;

    let match: RegExpMatchArray | null = null;
    let matchedRoute = routes.find((route) => {
        if (!route.regex) return false;
        match = currentPath.match(route.regex);
        return match !== null;
    });
    if (!matchedRoute) {
        matchedRoute = routes.find((route) => route.path === "404")!;
    }

    const params: Route["params"] = {};
    if (match && matchedRoute.keys.length > 0) {
        for (const [index, key] of matchedRoute.keys.entries()) {
            params[key] = match[index + 1];
        }
    }
    state.route.params = params;

    if (previousPath === matchedRoute.path) {
        app.classList.add("skip-animations");
    } else {
        app.classList.remove("skip-animations");
    }
    previousPath = matchedRoute.path;

    app.innerHTML = matchedRoute.component(params);
};
export function getPath(): string {
    return window.location.pathname.toLowerCase();
}

store.subscribe(render);

window.addEventListener("load", () => navigate(getPath()));
window.addEventListener("popstate", () => navigate(getPath()));

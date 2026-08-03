import { routes } from "./register";

type HTMLString = string;
export type Route = {
    path: string;
    regex: RegExp | null;
    keys: string[];
    component: (params: Record<string, string>) => HTMLString;
};

export function navigate(
    url_path: string,
    params?: Record<string, string>
): void {
    const routeExists = routes.some(
        (route) => route.regex && route.regex.test(url_path)
    );
    const path = routeExists ? url_path : 404;
    if (window.location.pathname !== url_path && path !== "404") {
        window.history.pushState({}, "", url_path);
    }
}

type HTMLString = string;
export type Route = {
    path: string;
    regex: RegExp | null;
    keys: string[];
    component: (params: Record<string, string>) => HTMLString;
};

export let routes: Route[] = [
    {
        path: "404",
        regex: null,
        keys: [],
        component: () => `<h1>404 Page Not Found</h1>`,
    },
];
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

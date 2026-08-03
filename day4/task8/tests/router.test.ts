jest.mock("../src/store", () => ({
    store: {
        subscribe: jest.fn(),
    },
}));
jest.mock("../src/register", () => ({
    __esModule: true,
    default: jest.fn(),
    routes: [
        {
            path: "/",
            regex: /^\/$/,
            keys: [],
            component: () => "<h1>Home</h1>",
        },
        {
            path: "/tasks/:id",
            regex: /^\/tasks\/([^/]+)$/,
            keys: ["id"],
            component: ({ id }: Record<string, number>) => `<h1>${id}</h1>`,
        },
        {
            path: "404",
            component: () => "<h1>404</h1>",
        },
    ],
}));
jest.mock("../src/navigate", () => ({
    navigate: jest.fn(),
}));

describe("Router : ", () => {
    test("getPath : returns pathname in lowercase", async () => {
        window.history.pushState({}, "", "/LOGIN");
        const { getPath } = await import("../src/router");
        expect(getPath()).toBe("/login");
    });
    test("subscribe render to store", async () => {
        jest.resetModules();

        const subscribe = jest.fn();

        jest.doMock("../src/store", () => ({
            store: {
                subscribe,
            },
        }));
        await import("../src/router");
        expect(subscribe).toHaveBeenCalledTimes(1);
    });
    test("Register all routes ", async () => {
        jest.resetModules();
        await import("../src/router");
        const { default: register } = await import("../src/register");

        expect(register).toHaveBeenCalledTimes(4);
    });
    test("call navigate on window load", async () => {
        jest.resetModules();
        const navigate = jest.fn();
        jest.doMock("../src/navigate", () => ({
            navigate,
        }));
        await import("../src/router");

        window.history.pushState({}, "", "/LOGIN");
        window.dispatchEvent(new Event("load"));
        expect(navigate).toHaveBeenCalledWith("/login");
    });
    test("call navigate on popState", async () => {
        jest.resetModules();
        const navigate = jest.fn();
        jest.doMock("../src/navigate", () => ({
            navigate,
        }));
        await import("../src/router");
        window.history.pushState({}, "", "/tasks/10");
        window.dispatchEvent(new PopStateEvent("popstate"));
        expect(navigate).toHaveBeenCalledWith("/tasks/10");
    });
    test("render extracts route params", async () => {
        jest.resetModules();
        document.body.innerHTML = `<div id="app"></div>`;
        const subscribe = jest.fn();

        jest.doMock("../src/store", () => ({
            store: {
                subscribe,
            },
        }));
        await import("../src/router");
        const render = subscribe.mock.calls[0][0];
        const state = {
            route: {
                path: "/tasks/1",
                params: {},
            },
        };
        render(state);
        expect(state.route.params).toEqual({
            id: "1",
        });
        expect(document.getElementById("app")!.innerHTML).toContain("1");
    });
    test("remove  skip-animation class  for differenet/same  ", async () => {
        jest.resetModules();
        document.body.innerHTML = '<div id="app"></div>';
        const subscribe = jest.fn();
        jest.doMock("../src/store", () => ({
            store: {
                subscribe,
            },
        }));
        await import("../src/router");
        const render = subscribe.mock.calls[0][0];

        const state = {
            route: {
                path: "/",
                params: {},
            },
        };
        render(state);
        expect(
            document.getElementById("app")!.classList.contains("skip-animation")
        ).toBe(false);
    });
});

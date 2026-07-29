/*
632.Define ApiResponse<T> = { success: true; data: T } | { success: false; error: string; statusCode:
    number }
633.Write handleResponse<T>(response: ApiResponse<T>) that TypeScript narrows correctly in
    each branch
634.Define LoadingState<T>: idle | loading | { status: 'success'; data: T } | { status: 'error'; error:
    Error }
635.Use LoadingState<User[]> in a function that returns the correct HTML string for each state
*/

type ApiResponse<T> =
    | { success: true; data: T }
    | { success: false; error: string; statusCode: number };

function handleResponse<T>(response: ApiResponse<T>) {
    if (response.success) {
        return response.data;
    } else {
        throw new Error(
            `Response Error \n status: ${response.statusCode} \n error: ${response.error}`
        );
    }
}

type LoadingState<T> =
    | "idle"
    | "loading"
    | { status: "success"; data: T }
    | { status: "error"; error: Error };

type User = {
    id: string;
    name: string;
};

function renderState(data: LoadingState<User[]>) {
    if (data === "idle") return "";
    if (data === "loading") return `<h1>loading users</h1>`;

    switch (data.status) {
        case "success":
            return `<ul>
            ${data.data.map((user) => `<li>${user.name}</li>`).join("")}
            </ul>`;
        case "error":
            return `<p>Error : ${data.error.message}</p>`;
    }
}

/**
 644.Build ApiClient(baseUrl: string) with get<T>(path): Promise<T>, post<T, B>(path, body: B):
    Promise<T>, put<T, B>, delete<T>
645.All methods use fetchJSON and propagate generic types correctly
646.Add request/response interceptors with typed callbacks
647.Write a typed MockApiClient implementing the same interface for testing
 */
export type Payload = {
    method: "GET" | "PUT" | "POST" | "DELETE" | "PATCH";
    body?: string;
};
type RequestHook = (url: string, payload: Payload) => void;
type ResponseHook = (data: any) => void;

export default class ApiClient {
    private baseUrl: string;
    private reqHook: RequestHook | null = null;
    private resHook: ResponseHook | null = null;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }
    onRequest(callback: RequestHook) {
        this.reqHook = callback;
    }
    onResponse(callback: ResponseHook) {
        this.resHook = callback;
    }
    async fetchJSON<T>(url: string, payload: Payload): Promise<T> {
        if (this.reqHook) this.reqHook(url, payload);

        const resp = await fetch(url, payload);
        if (!resp.ok) throw new Error("request failed");
        const data = await resp.json();

        if (this.resHook) this.resHook(data);

        return data;
    }

    async get<T>(path: string): Promise<T> {
        return this.fetchJSON<T>(this.baseUrl + path, { method: "GET" });
    }
    async post<T, B>(path: string, body: B): Promise<T> {
        return this.fetchJSON<T>(this.baseUrl + path, {
            method: "POST",
            body: JSON.stringify(body),
        });
    }
    async put<T, B>(path: string, body: B): Promise<T> {
        return this.fetchJSON<T>(this.baseUrl + path, {
            method: "PUT",
            body: JSON.stringify(body),
        });
    }
    async delete<T>(path: string): Promise<T> {
        return this.fetchJSON<T>(this.baseUrl + path, {
            method: "DELETE",
        });
    }
}

const client = new ApiClient("https://jsonplaceholder.typicode.com");

client.onRequest((url, payload) => {
    console.log("Request interepted");
    console.log(`url: ${url}\nmethod: ${payload.method}\n`);
});
client.onResponse((data) => {
    console.log(`Response intercepted`);
});
const data: object[] = await client.get("/posts");
console.log(data[0]);

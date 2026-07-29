import ApiClient, { type Payload } from "./genericApiClient.js";

// mockApiClient

class MockApiClient<M> extends ApiClient {
    private mockStorage!: M;
    setMockData(data: M) {
        this.mockStorage = data;
    }
    override async fetchJSON<T>(url: string, payload: Payload): Promise<T> {
        return this.mockStorage as unknown as T;
    }
}

interface Post {
    id: number;
    title: string;
}
const mockClient = new MockApiClient<Post[]>("https://example.com");

mockClient.setMockData([{ id: 101, title: " Mock" }]);
const posts = await mockClient.get<Post[]>("/posts");
console.log(`Mocked response : ${JSON.stringify(posts)}`);

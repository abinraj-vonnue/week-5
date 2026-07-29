type User = {
    id: string;
    name: string;
    avatar?: string;
    email: string;
};
let users: User[] = [
    {
        id: "1",
        name: " user1",
        email: "user1@mail.com",
    },
];
async function updateUser(id: string, changes: Partial<User>): Promise<User> {
    const user = users.find((u) => u.id === id);
    if (!user) {
        throw new Error("user not found");
    }
    const updatedUser: User = { ...user, ...changes, id };
    users = users.map((u) => (u.id === id ? updatedUser : u));
    return updatedUser;
}
function createRequiredUser(data: Required<User>): User {
    users.push(data);
    return data;
}
type UserPreview = Pick<User, "id" | "name">;
type UserInput = Omit<User, "id" | "createdAt">;

type ConfigKey = "host" | "port" | "timeout";
type Config = Record<ConfigKey, string>;

const config: Config = {
    host: "localhost",
    timeout: "5000",
    port: "5000",
};

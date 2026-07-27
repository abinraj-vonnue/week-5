/* Task 3 (45 min) - Interfaces & Object Types
596. Define User interface: id, name, email, role ('admin' | 'viewer' | 'editor'), createdAt, optional
    avatar?: string
597.Create five objects satisfying the interface. Try adding an extra property - see the excess
    property check error.
598.Create ReadonlyUser = Readonly<User>. Show you cannot mutate its properties.
599.Write updateUser(user: User, changes: Partial<User>): User returning a new merged user
600.Show the difference between interface and type alias - mostly interchangeable but different
    extension syntax
*/

interface User {
    id: number;
    name: string;
    email: string;
    role: "admin" | "viewer" | "editor";
    createdAt: string;
    avatar?: string;
}

//readonly user
const admin: Readonly<User> = {
    id: 1,
    name: "admin",
    email: "admin@mail.com",
    role: "admin",
    createdAt: "2026-JUL-27",
};

const editor: User = {
    id: 2,
    name: "editor",
    email: "editor@mail.com",
    role: "editor",
    createdAt: "2026-JUL-27",
};

const viewer: User = {
    id: 3,
    name: "viewer",
    email: "viewer@mail.com",
    role: "viewer",
    createdAt: "2026-JUL-27",
};
const user1: User = {
    id: 4,
    name: "User 1",
    email: "user1@mail.com",
    role: "viewer",
    createdAt: "2026-JUL-27",
};
const user2: User = {
    id: 5,
    name: "User 2",
    email: "user2@mail.com",
    role: "viewer",
    createdAt: "2026-JUL-27",
};

// updateUser

function updateUser(user: User, changes: Partial<User>): User {
    return {
        ...user,
        ...changes,
    };
}

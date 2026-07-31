function sealed(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}

function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("\nLogging function details ....\n");
    const originalMethod = descriptor.value;
    console.log("class  : ", target.constructor.name);
    console.log(`function : ${propertyKey}()`);

    descriptor.value = function (...args: any[]) {
        console.log(`arguments : `, args);
        return originalMethod.apply(this, args);
    };
}

@sealed
class User {
    public a = [];
    private Users: string[] = [];

    @log
    addUser(userName: string) {
        this.Users.push(userName);
        return this.Users;
    }
    greet() {
        console.log("hello");
        return 1;
    }
}

const userManager = new User();

console.log(userManager.addUser("Abin"));

console.log(Object.isSealed(User));

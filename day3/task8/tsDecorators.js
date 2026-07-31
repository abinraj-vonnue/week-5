var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function sealed(constructor) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}
function log(target, propertyKey, descriptor) {
    console.log("\nLogging function details ....\n");
    const originalMethod = descriptor.value;
    console.log("class  : ", target.constructor.name);
    console.log(`function : ${propertyKey}()`);
    descriptor.value = function (...args) {
        console.log(`arguments : `, args);
        return originalMethod.apply(this, args);
    };
}
let User = class User {
    a = [];
    Users = [];
    addUser(userName) {
        this.Users.push(userName);
        return this.Users;
    }
    greet() {
        console.log("hello");
        return 1;
    }
};
__decorate([
    log
], User.prototype, "addUser", null);
User = __decorate([
    sealed
], User);
const userManager = new User();
console.log(userManager.addUser("Abin"));
console.log(Object.isSealed(User));
export {};

class Subject {
    observers = [];
    subscribe(observer) {
        this.observers.push(observer);
        const index = this.observers.indexOf(observer);
        return () => {
            this.observers.splice(index, 1);
        };
    }
    notify(data) {
        this.observers.forEach((observer) => observer.update(data));
    }
}
class User {
    update(notice) {
        console.log(`progress: ${notice.progress}`);
    }
}
const userStore = new Subject();
const user = new User();
let release = userStore.subscribe(user);
userStore.notify({ progress: 10 });
userStore.notify({ progress: 100 });
release();
const command1 = {
    execute() {
        console.log("command 1 executed");
    },
    undo() {
        console.log("command 1 undoed");
    },
};
const command2 = {
    execute() {
        console.log("command 2 executed");
    },
    undo() {
        console.log("command 2 undoed");
    },
};
class CommandHistory {
    commandHistory;
    undoStack;
    constructor() {
        this.commandHistory = [];
        this.undoStack = [];
    }
    addCommand(command) {
        command.execute();
        this.commandHistory.push(command);
    }
    undo() {
        const command = this.commandHistory.pop();
        if (!command)
            return;
        command.undo();
        this.undoStack.push(command);
    }
    redo() {
        const command = this.undoStack.pop();
        if (!command)
            return;
        command.execute();
        this.commandHistory.push(command);
    }
    getHistory() {
        console.log(this.commandHistory);
    }
}
const history = new CommandHistory();
history.addCommand(command1);
history.addCommand(command2);
history.getHistory();
history.undo();
history.getHistory();
history.redo();
history.getHistory();
export {};
// feat: Design pattern Interfaces
// - Defined Observable<T> interface with subscribe
// - Implemented observable<T> in a subject<T> class

interface Observerable<T> {
    subscribe(observer: Observer<T>): unsubscribe;
}

type unsubscribe = () => void;

interface Observer<T> {
    update(notice: T): void;
}

class Subject<T> implements Observerable<T> {
    private observers: Observer<T>[] = [];
    subscribe(observer: Observer<T>): unsubscribe {
        this.observers.push(observer);

        const index = this.observers.indexOf(observer);
        return () => {
            this.observers.splice(index, 1);
        };
    }
    notify(data: T): void {
        this.observers.forEach((observer) => observer.update(data));
    }
}
interface UserStatistics {
    progress: number;
}

class User implements Observer<UserStatistics> {
    update(notice: UserStatistics): void {
        console.log(`progress: ${notice.progress}`);
    }
}

const userStore = new Subject<UserStatistics>();

const user = new User();

let release = userStore.subscribe(user);
userStore.notify({ progress: 10 });
userStore.notify({ progress: 100 });
release();

interface Command {
    execute(): void;
    undo(): void;
}
const command1: Command = {
    execute() {
        console.log("command 1 executed");
    },
    undo() {
        console.log("command 1 undoed");
    },
};
const command2: Command = {
    execute() {
        console.log("command 2 executed");
    },
    undo() {
        console.log("command 2 undoed");
    },
};

class CommandHistory {
    private commandHistory: Command[];
    private undoStack: Command[];
    constructor() {
        this.commandHistory = [];
        this.undoStack = [];
    }
    addCommand(command: Command) {
        command.execute();
        this.commandHistory.push(command);
    }

    undo(): void {
        const command = this.commandHistory.pop();
        if (!command) return;
        command.undo();
        this.undoStack.push(command);
    }
    redo() {
        const command = this.undoStack.pop();
        if (!command) return;
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

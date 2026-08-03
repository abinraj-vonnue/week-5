interface Item {
    id: number;
    price: number;
    quantity: number;
}
interface cartInterface {
    items: Item[];
    addItem: (item: Item) => cartInterface;
    removeItem: (itemId: number) => cartInterface;
    updateQuantity: (itemId: number, quantity: number) => cartInterface;
}
interface Coupon {
    code: string;
    discount: number;
}

type observerType = Array<(state: cartInterface) => void>;
class Observer {
    observers: observerType;
    constructor() {
        this.observers = [];
    }
    addObserver(fn: (state: cartInterface) => void) {
        this.observers.push(fn);
    }
    notifyObserver(data: cartInterface) {
        this.observers.forEach((observer) => {
            observer(data);
        });
    }
}
const listener = new Observer();

class Cart implements cartInterface {
    items: Item[];
    constructor(...args: Item[]) {
        this.items = args;
    }

    addItem(item: Item): cartInterface {
        let newCartItems = structuredClone(this.items);
        newCartItems.push(item);
        let newCart = new Cart(...newCartItems);
        listener.notifyObserver(newCart);
        return newCart;
    }
    removeItem(itemId: number): cartInterface {
        let newCartItems = structuredClone(this.items);
        let newCart = new Cart(
            ...newCartItems.filter((item) => item.id != itemId)
        );
        listener.notifyObserver(newCart);
        return newCart;
    }
    updateQuantity(itemId: number, quantity: number): cartInterface {
        let newCartItems = this.items.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
        );
        let newCart = new Cart(...newCartItems);
        return newCart;
    }
    getItems(): Item[] {
        return this.items;
    }
    getTotal(): number {
        return this.items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );
    }

    clear(): void {
        this.items = [];
    }
    applyCoupon(coupon: Coupon): number {
        let total = this.getTotal();
        let newValue = total - (coupon.discount * total) / 100;
        return newValue;
    }
}

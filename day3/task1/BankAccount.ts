/*Task 1 (40 min) - Access Modifiers & Parameter Properties
656.Convert BankAccount to TypeScript: balance is private, accountNumber is readonly, owner is
public
657.Use parameter properties: constructor(private balance: number, public readonly owner: string) -
no separate property declarations
658.Add protected transfer(amount: number) that SavingsAccount can call but external code cannot
659.Add a #hashPrivate field - show the difference between TypeScript private and JS #private in
compiled output 
*/

class BankAccount {
    readonly accountNo: string;
    #hashPrivate: string = "secret";

    constructor(
        private balance: number,
        public readonly owner: string
    ) {
        this.balance = balance;
        this.owner = owner;
        this.accountNo = this.#generateAccountNo();
    }

    protected transfer(amount: number) {
        this.balance -= amount;
        return this.balance;
    }

    #generateAccountNo(length: number = 12): string {
        const randomBytes = new Uint8Array(length);
        crypto.getRandomValues(randomBytes);
        let accountNo = "";
        for (let i = 0; i < length; i++) {
            if (i === 0) {
                accountNo += (randomBytes[i] % 9) + 1;
            } else {
                accountNo += (randomBytes[i] % 10) + 1;
            }
        }
        return accountNo;
    }
}
class SavingsAccount extends BankAccount {
    private type = "SavingsAccount";
    constructor(
        balance: number,
        public readonly owner: string
    ) {
        super(balance, owner);
    }
    transferAmount(amount: number): { message: string; balance: number } {
        const balance = super.transfer(amount);
        return {
            message: `transaction success`,
            balance: balance,
        };
    }
}

const myaccount = new SavingsAccount(20000000, "Fadhil");

console.log(myaccount.transferAmount(1000));
console.log(myaccount.owner);

// console.log(myaccount.balance); //  property is private : only accessible within  class BankAccount
// console.log(myaccount.#hashPrivate); // property is private identifier : not accessible outside class BankAccount

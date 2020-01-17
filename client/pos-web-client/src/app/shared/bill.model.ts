export class Bill {
    public id: number
    constructor(
        public cashier: string,
        public soldItems: [],
        public total: number,
        public createdAt: Date
    ) { }
}

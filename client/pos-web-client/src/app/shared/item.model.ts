export class Item {
    public id: number
    constructor(
        public name: string,
        public price: number,
        public img: string,
        public available: boolean,
        public soldQuantity: number,
        public fakeQuantity: number
    ) { }
}

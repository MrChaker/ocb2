export type OrderType = {
    items: ItemType[];
    taxPrice: number;
    finalPrice: number;
} | null;

export type ItemType = {
    name: string;
    modifiers?: string[];
    price: number;
    quantity: number;
};

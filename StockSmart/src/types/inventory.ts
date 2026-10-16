
export type Item = {
  id: number;
  name: string;
  max: number;
  current: number;
  purchased: number;
};

export type ShoppingItem = Item & {
  needed: number;
  remaining: number;
};

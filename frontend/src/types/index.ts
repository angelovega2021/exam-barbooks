export type Summary = {
  totalRevenue: number;
  medianOrderPrice: number;
  topProductByQty: string;
  uniqueProductCount: number;
};

export type Product = {
    id: number;
    product: string;
    price: number;
    qty: number;
};
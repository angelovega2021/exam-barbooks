export type Product = {
  id: number;
  product: string;
  price: number;
  qty: number;
};

type NewProduct = {
    product: string;
    price: number;
    qty: number;
};

export const getOrders = async (): Promise<Product[]> => {
  const response = await fetch('http://localhost:3000/api/orders');
  if (!response.ok) {
    throw new Error('Failed to fetch orders');
  }
  const data = await response.json();
  return data.orders;
};

export const postOrder = async (newOrder : NewProduct) => {
    
      try {
        const response = await fetch('http://localhost:3000/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newOrder),
        });
        if (!response.ok) {
          throw new Error('Failed to post order');
        }
        const data = await response.json();
      } catch (error) {
        console.error('Error posting order:', error);
      }
    };


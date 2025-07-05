import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postOrder } from './api/orders'

const NewOrderForm = () => {
  const [quantity, setQuantity] = useState<number>(1);
  const [price, setPrice] = useState<number>(1);
  const [product, setProduct] = useState<string>('');

  const queryClient = useQueryClient()

    const mutation = useMutation({
    mutationFn: postOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['summary'] });
      setProduct('');
      setQuantity(1);
      setPrice(1);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      product,
      qty: quantity,
      price
    })
    setProduct('');
    setQuantity(1);
    setPrice(1);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-gray-300 rounded-lg p-6 m-2 shadow-md bg-white max-w-md"
    >
      <h3 className="mb-4 text-lg font-semibold">Create New Order</h3>
      <div className="mb-3 mx-4">
        <label className="block text-gray-600 text-sm mb-1">
          Product:
          <input
            value={product}
            onChange={e => setProduct(e.target.value)}
            required
            className="w-full px-3 py-2 rounded border border-gray-300 mt-1 text-base focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </label>
      </div>
      <div className="mb-3 mx-4">
        <label className="block text-gray-600 text-sm mb-1">
          Quantity:
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={e => setQuantity(Number(e.target.value))}
            required
            className="w-full px-3 py-2 rounded border border-gray-300 mt-1 text-base focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </label>
      </div>
      <div className="mb-4 mx-4">
        <label className="block text-gray-600 text-sm mb-1">
          Price:
          <input
            type="number"
            min={0}
            step="0.01"
            value={price}
            onChange={e => setPrice(Number(e.target.value))}
            required
            className="w-full px-3 py-2 rounded border border-gray-300 mt-1 text-base focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </label>
      </div>
      <button
        type="submit"
        className="bg-blue-700 hover:bg-blue-800 text-white rounded px-5 py-2 font-semibold shadow transition-colors duration-150"
      >
        Create Order
      </button>
    </form>
  );
};

export default NewOrderForm;
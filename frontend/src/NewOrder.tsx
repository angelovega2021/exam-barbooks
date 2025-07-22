import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { postOrder } from './api/orders'

type FormValues = {
  product: string;
  quantity: number;
  price: number;
};

const NewOrderForm = () => {
  const queryClient = useQueryClient()
  const { register, handleSubmit, reset} = useForm<FormValues>({
    defaultValues: {
      product: '',
      quantity: 1,
      price: 1,
    }
  });

    const mutation = useMutation({
    mutationFn: postOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['summary'] });
      reset();
    },
  });

  const onSubmit = ({product, quantity, price}: FormValues) => {
    mutation.mutate({
      product,
      qty: quantity,
      price,
    });
    reset();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border border-gray-300 rounded-lg p-6 m-2 shadow-md bg-white max-w-md"
    >
      <h3 className="mb-4 text-lg font-semibold">Create New Order</h3>
      <div className="mb-3 mx-4">
        <label className="block text-gray-600 text-sm mb-1">
          Product:
          <input
            {...register('product')}
            className="w-full px-3 py-2 rounded border border-gray-300 mt-1 text-base focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </label>
      </div>
      <div className="mb-3 mx-4">
        <label className="block text-gray-600 text-sm mb-1">
          Quantity:
          <input
            {...register('quantity', { valueAsNumber: true })}
            type="number"
            className="w-full px-3 py-2 rounded border border-gray-300 mt-1 text-base focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        </label>
      </div>
      <div className="mb-4 mx-4">
        <label className="block text-gray-600 text-sm mb-1">
          Price:
          <input
            {...register('price', { valueAsNumber: true })}
            type="number"
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
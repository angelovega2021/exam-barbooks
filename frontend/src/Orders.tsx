import { useQuery } from '@tanstack/react-query';
import { getOrders } from './api/orders'
import OrderList from './component/OrderList';

const Orders = () => {
    const { data: orders = [], isLoading, isError, error } = useQuery({
    queryKey: ['orders'],
    queryFn: getOrders,
  });

    if (isLoading) return <p>Loading orders...</p>;
    if (isError) return <p>Error: {error instanceof Error ? error.message : 'Unknown error'}</p>;

    return  <OrderList {...{orders}}/>
}


export default Orders
import { Product } from "../types";

type OrderListProps = {
    orders: Product[];
};

const OrderList = ({ orders }: OrderListProps) => {
    return (
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden mt-6 border-separate border-spacing-0">
            <thead>
                <tr>
                    <th className="bg-gray-100 font-semibold text-base text-left px-4 py-3">Product</th>
                    <th className="bg-gray-100 font-semibold text-base text-left px-4 py-3">Quantity</th>
                    <th className="bg-gray-100 font-semibold text-base text-left px-4 py-3">Price</th>
                </tr>
            </thead>
            <tbody>
                {orders.map(order => (
                    <tr key={order.id}>
                        <td className="border border-gray-300 px-4 py-3">{order.product}</td>
                        <td className="border border-gray-300 px-4 py-3">{order.qty}</td>
                        <td className="border border-gray-300 px-4 py-3">${order.price.toFixed(2)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default OrderList;
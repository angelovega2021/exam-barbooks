export const summarizeOrders = (orders) => {
  if (!orders.length) {
        return { totalRevenue: 0, medianOrderPrice: 0, topProductByQty: '', uniqueProductCount: 0 };
    }

    const uniqueProductCount =  new Set(orders.map(order => order.product)).size

    const qtyByProduct = orders.reduce((acc, order) => {
    acc[order.product] = (acc[order.product] || 0) + order.qty;
    return acc;
    }, {});

    const top = Object.entries(qtyByProduct).reduce(
        (max, [product, qty]) => qty > max.qty ? { product, qty } : max,
        { product: '', qty: 0 }
    );

    const topProductByQty = top.product;

    const totals = orders.map(o => o.qty * o.price);

    const totalRevenue = orders.reduce((sum, order) => sum + order.qty * order.price, 0);

    const sorted = [...totals].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    const medianOrderPrice =
    sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;

    return { totalRevenue, medianOrderPrice, topProductByQty, uniqueProductCount };
}




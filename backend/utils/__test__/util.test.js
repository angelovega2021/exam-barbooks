import { summarizeOrders } from "../utils";
describe("summarizeOrders", () => {
    
    it("should return an empty summary for empty orders", () => {
        const orders = [];
        const result = summarizeOrders(orders);
        expect(result).toEqual({totalRevenue: 0, medianOrderPrice: 0, topProductByQty: '', uniqueProductCount: 0});
    });

    it("should summarize multiple orders correctly", () => {
        const orders = [
        {
            "id": 366,
            "product": "5800X3D",
            "qty": 5,
            "price": 200
        },
        {
            "id": 365,
            "product": "B550M",
            "qty": 6,
            "price": 300
        },
        {
            "id": 364,
            "product": "1TB NVme",
            "qty": 7,
            "price": 400
        },
        {
            "id": 363,
            "product": "RTX 4080",
            "qty": 8,
            "price": 500
        },
        {
            "id": 362,
            "product": "Adata 32GB RAM",
            "qty": 9,
            "price": 600
        },
    ];
        const result = summarizeOrders(orders);
        expect(result).toEqual({totalRevenue: 15000, medianOrderPrice: 2800, topProductByQty: "Adata 32GB RAM", uniqueProductCount: 5});
    });

    it("should ignore zero quantity orders in calculations", () => {
        const orders = [
        {
            "id": 366,
            "product": "5800X3D",
            "qty": 5,
            "price": 200
        },
        {
            "id": 365,
            "product": "B550M",
            "qty": 0,
            "price": 300
        },
        {
            "id": 364,
            "product": "1TB NVme",
            "qty": 7,
            "price": 400
        }
    ];
        const result = summarizeOrders(orders);
        expect(result).toEqual({totalRevenue: 3800, medianOrderPrice: 1000, topProductByQty: "1TB NVme", uniqueProductCount: 3});
    });

    it("should handle all orders with the same product", () => {
        const orders = [
        {
            "id": 366,
            "product": "5800X3D",
            "qty": 5,
            "price": 200
        },
        {
            "id": 365,
            "product": "5800X3D",
            "qty": 3,
            "price": 300
        },
        {
            "id": 364,
            "product": "1TB NVme",
            "qty": 6,
            "price": 400
        }
    ];
        const result = summarizeOrders(orders);
        expect(result).toEqual({totalRevenue: 4300, medianOrderPrice: 1000, topProductByQty: "5800X3D", uniqueProductCount: 2});
    });
});
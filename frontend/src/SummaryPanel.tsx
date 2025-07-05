import { Summary } from "./types";

type SummaryPanelProps = {
    data: Summary
    isLoading: boolean,
    isError: boolean,
    error?: Error | null;
};

const SummaryPanel = ({ data,  isLoading, isError, error }: SummaryPanelProps) => {

    const { totalRevenue, medianOrderPrice, topProductByQty} = data
    if (isLoading) return <p>Loading summary...</p>;
    if (isError) return <p>Error: {error instanceof Error ? error.message : 'Unknown error'}</p>;

     return (
        <div className="border border-gray-300 rounded-lg p-4 m-2 shadow-md bg-white">
            <h3 className="text-lg font-semibold mb-4">Summary</h3>
            <div className="flex justify-between">
                <div className="flex-1 text-center">
                    <div className="text-gray-500 text-sm">Total Revenue</div>
                    <div className="text-blue-700 text-xl font-bold">${totalRevenue.toLocaleString()}</div>
                </div>
                <div className="flex-1 text-center">
                    <div className="text-gray-500 text-sm">Median Price</div>
                    <div className="text-blue-700 text-xl font-bold">${medianOrderPrice.toLocaleString()}</div>
                </div>
                <div className="flex-1 text-center">
                    <div className="text-gray-500 text-sm">Top Product</div>
                    <div className="text-blue-700 text-xl font-bold">{topProductByQty}</div>
                </div>
            </div>
        </div>
    );
}

export default SummaryPanel
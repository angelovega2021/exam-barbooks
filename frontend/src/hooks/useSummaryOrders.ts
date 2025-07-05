import { useQuery } from '@tanstack/react-query';

type Summary = {
  totalRevenue: number;
  medianOrderPrice: number;
  topProductByQty: string;
  uniqueProductCount: number;
};

const fetchSummarizeOrders = async (): Promise<Summary> => {
  const res = await fetch('http://localhost:3000/api/summary');
  if (!res.ok) {
    throw new Error('Failed to fetch summary');
  }
  return res.json();
};

export const useSummaryOrders = () => {
  return useQuery<Summary, Error>({
    queryKey: ['summary'],
    queryFn: fetchSummarizeOrders,
    staleTime: 1000 * 60, // 1 minute caching
  });
}

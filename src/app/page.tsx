'use client';
import { useQuery } from "@tanstack/react-query";

export default function HomePage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['transactions'],
    queryFn: () =>
        fetch("http://localhost:4000/transactions").then((res) => res.json()),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading transactions</div>;

  return (
      <div className="p-4">
        <h1 className="text-lg font-bold">Transactions (test)</h1>
        <pre className="bg-gray-100 p-4 rounded mt-4">{JSON.stringify(data, null, 2)}</pre>
      </div>
  );
}

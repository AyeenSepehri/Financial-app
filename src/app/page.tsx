// import TransactionsSection from "@/components/transactions/TransactionsSection";
import TransactionsContainer from "@/components/transactions/containers/TransactionsContainer";

export default function HomePage() {
    return (
        <main className="p-6">
            <h1 className="text-xl font-bold mb-4">Transactions</h1>
            {/*<TransactionsSection />*/}
            <TransactionsContainer/>
        </main>
    );
}

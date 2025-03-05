import DebtCalculator from "./DebtCalculator";

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center">Income to Debt Ratio Calculator</h1>
        <DebtCalculator />
      </div>
    </main>
  );
}

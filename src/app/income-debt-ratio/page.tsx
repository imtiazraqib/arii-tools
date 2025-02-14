import DebtCalculator from "./DebtCalculator";

export default function Home() {
  return (
    <main className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-4xl text-center font-bold mb-8">Debt To Income Ratio Calculator</h1>
      <DebtCalculator />
    </main>
  );
}

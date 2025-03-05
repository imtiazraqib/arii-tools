import { DownPaymentCalculator } from "./down-payment-calculator";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container px-4 mx-auto max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Down Payment Savings Calculator</h1>
        <DownPaymentCalculator />
      </div>
    </main>
  );
}

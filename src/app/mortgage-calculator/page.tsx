import { MortgageCalculator } from "./MortgageCalculator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mortgage Calculator | Arii Tools",
  description: "Mortgage calculator to estimate your monthly mortgage payments.",
};

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center">Mortgage Calculator</h1>
        <MortgageCalculator />
      </div>
    </main>
  );
}

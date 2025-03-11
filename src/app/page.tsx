import Link from "next/link";

export default function Home() {
  const tools = [
    { name: "Mortgage Calculator", path: "/mortgage-calculator" },
    { name: "Income Debt Ratio", path: "/income-debt-ratio" },
    { name: "Downpayment Savings Calculator", path: "/downpayment-savings-calculator" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-center">Hello, Welcome to Arii Tools!</h1>
      <p className="mt-[20px] text-center">
        Created by{" "}
        <a className="text-purple-500" href="https://imtiazraqib.com/">
          Imtiaz Raqib
        </a>
      </p>

      {/* 2-column list of tools */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {tools.map((tool, index) => (
          <Link key={index} href={tool.path}>
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
              <h2 className="text-md font-semibold text-center">{tool.name}</h2>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <footer className="absolute bottom-5 text-center text-gray-600">
        <p>Version 2.4.1</p>
      </footer>
    </div>
  );
}

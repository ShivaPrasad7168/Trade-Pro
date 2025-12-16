// Importing client components
import Header from "../../../components/Header";
import Breadcrumb from "../../../components/Breadcrumb";
import StockChart from "../../../components/StockChart";
import OptionsTable from "../../../components/OptionsTable";
import OpenInterest from "../../../components/OpenInterest";

export default async function GrowwNIFTY50Page({ params }) {
  const { id } = await params;

  return (
    <div className="bg-gray-900 min-h-screen text-gray-300">
      <Header />
      <main className="container mx-auto px-4">
        <Breadcrumb stock={id} />
        <StockChart stock={id} />
        <OptionsTable stock={id} />
        <OpenInterest />
      </main>
    </div>
  );
}


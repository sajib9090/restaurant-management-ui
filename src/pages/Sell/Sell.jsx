import { useEffect, useState } from "react";
import Table from "../../components/SellSection/Table/Table";
import { useGetAllTablesQuery } from "../../redux/features/table/tableApi";
import TableSkeleton from "../../components/Skeleton/TableSkeleton";
import { useGetCurrentBrandInfoQuery } from "../../redux/features/brand/brandApi";
import AccessError from "../../components/AccessError/AccessError";
import TitleComponent from "../../components/TitleComponent/TitleComponent";
import { useLocation } from "react-router-dom";
import LocationPath from "../../components/LocationPath/LocationPath";

const Sell = () => {
  const location = useLocation();
  const { data: tables, error, isLoading } = useGetAllTablesQuery();
  const { data: brand, error: brandError } = useGetCurrentBrandInfoQuery();

  const [filteredTable, setFilteredTable] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (tables?.data) {
      const filtered = tables?.data?.filter((table) =>
        table?.table_name?.toLowerCase().includes(searchValue?.toLowerCase())
      );
      setFilteredTable(filtered);
    }
  }, [searchValue, tables]);

  if (tables?.data?.length === 0) {
    return <div>No data found</div>;
  }

  if (error || brandError) {
    return (
      <AccessError
        errorMessage={error?.data?.message || brandError?.data?.message}
        paymentError={error?.data?.status === 402}
        selectedPlanId={brand?.data?.selected_plan?.id || ""}
      />
    );
  }

  return (
    <>
      <TitleComponent
        title={`${LocationPath(location)}-(${tables?.data_found || 0})`}
      />
      <div className="min-h-screen flex flex-col items-center py-8 px-4">
        <h1 className="text-center text-blue-600 text-2xl font-semibold mb-4">
          Select a Table First
        </h1>
        <div className="mb-6 w-full max-w-md">
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            type="search"
            placeholder="Search table..."
          />
        </div>
        {isLoading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
            {Array.from({ length: 20 }).map((_, i) => (
              <TableSkeleton key={i} />
            ))}
          </div>
        )}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
          {filteredTable?.map((table) => (
            <Table
              key={table?._id}
              link={table?.table_slug}
              title={table?.table_name}
              tableSlug={table?.table_slug}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Sell;

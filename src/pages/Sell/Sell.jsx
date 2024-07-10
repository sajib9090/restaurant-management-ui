import { useEffect, useState } from "react";
import Table from "../../components/SellSection/Table/Table";
import { useGetAllTablesQuery } from "../../redux/features/table/tableApi";
import TableSkeleton from "../../components/Skeleton/TableSkeleton";
import { useNavigate } from "react-router-dom";
import { useGetCurrentBrandInfoQuery } from "../../redux/features/brand/brandApi";

const Sell = () => {
  const { data: tables, error, isLoading } = useGetAllTablesQuery();
  const { data: brand } = useGetCurrentBrandInfoQuery();
  const navigate = useNavigate();

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

  if (tables?.data?.length == 0) {
    return <div>No data found</div>;
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div
          className="bg-red-100 text-red-700 px-16 py-16 rounded-lg shadow-lg flex flex-col items-center"
          role="alert"
        >
          <div className="flex items-center mb-4">
            <svg
              className="w-6 h-6 text-red-500 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M18.364 5.636l-12.728 12.728m0-12.728l12.728 12.728"
              ></path>
            </svg>
            <strong className="font-bold">Error: </strong>
          </div>
          <span className="block text-center mb-4">{error?.data?.message}</span>
          <button
            onClick={() =>
              navigate(
                `/user/pricing/plans?plan=${brand?.data?.selected_plan?.id}`
              )
            }
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out"
          >
            Go to Payment
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div>
        <h1 className="text-center text-blue-600 text-2xl font-semibold mb-4">
          Select a Table First
        </h1>
        <div className="mb-6">
          <div className="search-menu">
            <input
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              className="rounded"
              type="search"
              placeholder="Search table..."
            />
          </div>
        </div>
        {isLoading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 20 }).map((_, i) => (
              <TableSkeleton key={i} />
            ))}
          </div>
        )}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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

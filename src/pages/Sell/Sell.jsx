import { useEffect, useState } from "react";
import Table from "../../components/SellSection/Table/Table";
import { useGetAllTablesQuery } from "../../redux/features/table/tableApi";
import TableSkeleton from "../../components/Skeleton/TableSkeleton";

const Sell = () => {
  const { data: tables, error, isLoading } = useGetAllTablesQuery();

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
    return <div>Error: {error.message}</div>;
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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

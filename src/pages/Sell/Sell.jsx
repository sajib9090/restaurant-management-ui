import Table from "../../components/SellSection/Table/Table";
import { useGetAllTablesQuery } from "../../redux/features/table/tableApi";

const Sell = () => {
  const { data: tables, error, isLoading } = useGetAllTablesQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
        <div className="grid grid-cols-4 gap-6">
          {tables?.data?.map((table) => (
            <Table
              key={table?._id}
              link={table?.table_slug}
              title={table?.table_name}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Sell;

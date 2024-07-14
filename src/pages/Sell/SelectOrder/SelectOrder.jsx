import { useLocation, useParams } from "react-router-dom";
import { useGetAllStaffsQuery } from "../../../redux/features/staff/staffApi";
import { useState } from "react";
import StaffSelection from "../../../components/OrderLog/Staff/StaffSelection";
import { useSelector } from "react-redux";
import { selectedMenu } from "../../../redux/features/OrderLog/orderLogSlice";
import DisplayCategory from "../../../components/OrderLog/DisplayCategory/DisplayCategory";
import DisplayOrderInvoice from "../../../components/OrderLog/DisplayOrderInvoice/DisplayOrderInvoice";
import TitleComponent from "../../../components/TitleComponent/TitleComponent";
import LocationPath from "../../../components/LocationPath/LocationPath";

const SelectOrder = () => {
  const location = useLocation();
  const { name: table_name } = useParams();

  const [searchValue, setSearchValue] = useState("");
  const [selectedStaff, setSelectedStaff] = useState(null);

  const orderSelectedMenu = useSelector(selectedMenu);

  const tableWiseOrder = orderSelectedMenu?.filter(
    (item) => item?.table === table_name
  );

  const tableWiseOrderQuantity = tableWiseOrder?.reduce((sum, item) => {
    return sum + item?.item_quantity;
  }, 0);

  const { data: staffs, isLoading: staffLoading } = useGetAllStaffsQuery();

  return (
    <div className="p-4 md:p-8">
      <TitleComponent
        title={`${LocationPath(location)}-(${tableWiseOrderQuantity || 0})`}
      />
      <DisplayOrderInvoice
        tableWiseOrder={tableWiseOrder}
        tableWiseOrderQuantity={tableWiseOrderQuantity}
        table_name={table_name}
        selectedStaff={selectedStaff}
      />

      <h2 className="text-center text-xl font-semibold capitalize my-4">
        Order for {table_name}
      </h2>

      <StaffSelection
        table_name={table_name}
        staffLoading={staffLoading}
        staffs={staffs}
        selectedStaff={selectedStaff}
        setSelectedStaff={setSelectedStaff}
      />

      <div className="my-4">
        <div className="flex justify-center">
          <input
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            className="rounded border px-4 py-2 w-full md:w-1/2"
            type="search"
            placeholder="Search menu item..."
          />
        </div>
      </div>

      <DisplayCategory
        selectedStaff={selectedStaff}
        table_name={table_name}
        searchValue={searchValue}
        tableWiseOrder={tableWiseOrder}
      />
    </div>
  );
};

export default SelectOrder;

/* eslint-disable react/prop-types */
import { Select } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeStaff,
  selectedStaffs,
  setStaff,
} from "../../../redux/features/OrderLog/orderLogSlice";
import { CiCircleRemove } from "react-icons/ci";

const StaffSelection = ({ table_name, selectedStaff, setSelectedStaff, staffLoading, staffs }) => {

  const dispatch = useDispatch();
  const orderStaff = useSelector(selectedStaffs);

  const options =
    staffs?.data?.map((staff) => ({
      value: staff?.name,
      label: staff?.name,
    })) || [];

  const handleChange = (value) => {
    setSelectedStaff(value);

    const data = {
      table: table_name,
      staffName: value,
    };
    dispatch(setStaff(data));
  };

  const handleRemoveStaff = () => {
    dispatch(removeStaff({ table_name }));
  };

  useEffect(() => {
    const selectedStaffForTable = orderStaff.find(
      (staff) => staff.table === table_name
    );

    if (selectedStaffForTable) {
      setSelectedStaff(selectedStaffForTable.staffName);
    } else {
      setSelectedStaff(null);
    }
  }, [orderStaff, table_name]);

  return (
    <div className="h-[75px] relative flex items-center">
      {selectedStaff ? (
        <div className="flex items-center">
          <p className="capitalize">
            Order by:{" "}
            <span className="text-red-600 font-semibold ml-2">
              {selectedStaff}
            </span>
          </p>
          <button onClick={handleRemoveStaff}>
            <CiCircleRemove className="w-6 h-6 text-red-600 cursor-pointer ml-3" />
          </button>
        </div>
      ) : (
        <>
          <p className="absolute top-0">
            Select a Staff <span className="text-red-600">*</span>
          </p>
          <Select
            showSearch
            style={{
              width: 200,
            }}
            placeholder={staffLoading ? "Loading..." : "Select a Staff"}
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            options={options}
            onChange={handleChange}
            value={selectedStaff}
          />
        </>
      )}
    </div>
  );
};

export default StaffSelection;

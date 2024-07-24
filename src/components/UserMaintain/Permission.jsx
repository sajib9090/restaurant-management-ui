import { BgColorsOutlined } from "@ant-design/icons";
import { useState } from "react";
import CustomModal from "../Modal/Modal";

const Permission = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const handleCheckboxChange = (event, item) => {
    const { checked } = event.target;
    setCheckedItems((prev) => {
      if (checked) {
        return [...prev, item];
      } else {
        return prev.filter((i) => i !== item);
      }
    });
  };

  console.log(checkedItems);
  return (
    <div>
      <button onClick={() => setIsModalOpen(!isModalOpen)} title="Permission">
        <BgColorsOutlined className="text-green-600 hover:text-green-700 hover:scale-110 text-xl cursor-pointer" />
      </button>

      <CustomModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        closeSymbolFalse={true}
        width={650}
      >
        <form className="bg-gray-100 p-12 rounded">
          <div className="border-b border-gray-300 my-4">
            <label className="block text-gray-800 text-xl font-bold mb-2">
              Sell Access
            </label>
            <div className="grid grid-cols-3 gap-x-4">
              <div className="mb-2">
                <label className="block text-gray-700">View Sell Report</label>
                <input
                  type="checkbox"
                  className="h-5 w-5 cursor-pointer"
                  checked={checkedItems.includes("viewSellReport")}
                  onChange={(event) =>
                    handleCheckboxChange(event, "viewSellReport")
                  }
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">View Sell History</label>
                <input
                  type="checkbox"
                  className="h-5 w-5 cursor-pointer"
                  checked={checkedItems.includes("viewSellHistory")}
                  onChange={(event) =>
                    handleCheckboxChange(event, "viewSellHistory")
                  }
                />
              </div>
            </div>
          </div>
          <div className="border-b border-gray-300 my-4">
            <label className="block text-gray-800 text-xl font-bold mb-2">
              Table Access
            </label>
            <div className="grid grid-cols-3 gap-x-4 ">
              <div className="mb-2">
                <label className="block text-gray-700">Add New Table</label>
                <input
                  type="checkbox"
                  className="h-5 w-5 cursor-pointer"
                  checked={checkedItems.includes("addNewTable")}
                  onChange={(event) =>
                    handleCheckboxChange(event, "addNewTable")
                  }
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">Delete Table</label>
                <input
                  type="checkbox"
                  className="h-5 w-5 cursor-pointer"
                  checked={checkedItems.includes("deleteTable")}
                  onChange={(event) =>
                    handleCheckboxChange(event, "deleteTable")
                  }
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">Edit Table</label>
                <input
                  type="checkbox"
                  className="h-5 w-5 cursor-pointer"
                  checked={checkedItems.includes("editTable")}
                  onChange={(event) => handleCheckboxChange(event, "editTable")}
                />
              </div>
            </div>
          </div>
          <div className="border-b border-gray-300 my-4">
            <label className="block text-gray-800 text-xl font-bold mb-2">
              Category Access (sensitive)
            </label>
            <div className="grid grid-cols-3 gap-x-4">
              <div className="mb-2">
                <label className="block text-gray-700">Add New Category</label>
                <input
                  type="checkbox"
                  className="h-5 w-5 cursor-pointer"
                  checked={checkedItems.includes("addNewCategory")}
                  onChange={(event) =>
                    handleCheckboxChange(event, "addNewCategory")
                  }
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">Delete Category</label>
                <input
                  type="checkbox"
                  className="h-5 w-5 cursor-pointer"
                  checked={checkedItems.includes("deleteCategory")}
                  onChange={(event) =>
                    handleCheckboxChange(event, "deleteCategory")
                  }
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">Edit Category</label>
                <input
                  type="checkbox"
                  className="h-5 w-5 cursor-pointer"
                  checked={checkedItems.includes("editCategory")}
                  onChange={(event) =>
                    handleCheckboxChange(event, "editCategory")
                  }
                />
              </div>
            </div>
          </div>
          <div className="border-b border-gray-300 my-4">
            <label className="block text-gray-800 text-xl font-bold mb-2">
              Menu Item Access (sensitive)
            </label>
            <div className="grid grid-cols-3 gap-x-4">
              <div className="mb-2">
                <label className="block text-gray-700">Add New Menu Item</label>
                <input
                  type="checkbox"
                  className="h-5 w-5 cursor-pointer"
                  checked={checkedItems.includes("addNewMenuItem")}
                  onChange={(event) =>
                    handleCheckboxChange(event, "addNewMenuItem")
                  }
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">Delete Menu Item</label>
                <input
                  type="checkbox"
                  className="h-5 w-5 cursor-pointer"
                  checked={checkedItems.includes("deleteMenuItem")}
                  onChange={(event) =>
                    handleCheckboxChange(event, "deleteMenuItem")
                  }
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">Edit Menu Item</label>
                <input
                  type="checkbox"
                  className="h-5 w-5 cursor-pointer"
                  checked={checkedItems.includes("editMenuItem")}
                  onChange={(event) =>
                    handleCheckboxChange(event, "editMenuItem")
                  }
                />
              </div>
            </div>
          </div>
          <div className="border-b border-gray-300 my-4">
            <label className="block text-gray-800 text-xl font-bold mb-2">
              Member/Customer Access (sensitive)
            </label>
            <div className="grid grid-cols-3 gap-x-4">
              <div className="mb-2">
                <label className="block text-gray-700">Add New Member</label>
                <input
                  type="checkbox"
                  className="h-5 w-5 cursor-pointer"
                  checked={checkedItems.includes("addNewMember")}
                  onChange={(event) =>
                    handleCheckboxChange(event, "addNewMember")
                  }
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">Delete Member</label>
                <input
                  type="checkbox"
                  className="h-5 w-5 cursor-pointer"
                  checked={checkedItems.includes("deleteMember")}
                  onChange={(event) =>
                    handleCheckboxChange(event, "deleteMember")
                  }
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">Edit Member</label>
                <input
                  type="checkbox"
                  className="h-5 w-5 cursor-pointer"
                  checked={checkedItems.includes("editMember")}
                  onChange={(event) =>
                    handleCheckboxChange(event, "editMember")
                  }
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">View All Member</label>
                <input
                  type="checkbox"
                  className="h-5 w-5 cursor-pointer"
                  checked={checkedItems.includes("viewAllMember")}
                  onChange={(event) =>
                    handleCheckboxChange(event, "viewAllMember")
                  }
                />
              </div>
            </div>
          </div>
          <div className="border-b border-gray-300 my-4">
            <label className="block text-gray-800 text-xl font-bold mb-2">
              User Access (sensitive)
            </label>
            <div className="grid grid-cols-3 gap-x-4">
              <div className="mb-2">
                <label className="block text-gray-700">Add New User</label>
                <input
                  type="checkbox"
                  className="h-5 w-5 cursor-pointer"
                  checked={checkedItems.includes("addNewUser")}
                  onChange={(event) =>
                    handleCheckboxChange(event, "addNewUser")
                  }
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">Delete User</label>
                <input
                  type="checkbox"
                  className="h-5 w-5 cursor-pointer"
                  checked={checkedItems.includes("deleteUser")}
                  onChange={(event) =>
                    handleCheckboxChange(event, "deleteUser")
                  }
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">Edit User</label>
                <input
                  type="checkbox"
                  className="h-5 w-5 cursor-pointer"
                  checked={checkedItems.includes("editUser")}
                  onChange={(event) => handleCheckboxChange(event, "editUser")}
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">View All User</label>
                <input
                  type="checkbox"
                  className="h-5 w-5 cursor-pointer"
                  checked={checkedItems.includes("viewAllUser")}
                  onChange={(event) =>
                    handleCheckboxChange(event, "viewAllUser")
                  }
                />
              </div>
            </div>
          </div>
          <div className="border-b border-gray-300 my-4">
            <label className="block text-gray-800 text-xl font-bold mb-2">
              Staff Access
            </label>
            <div className="grid grid-cols-3 gap-x-4">
              <div className="mb-2">
                <label className="block text-gray-700">Add New Staff</label>
                <input
                  type="checkbox"
                  className="h-5 w-5 cursor-pointer"
                  checked={checkedItems.includes("addNewStaff")}
                  onChange={(event) =>
                    handleCheckboxChange(event, "addNewStaff")
                  }
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">Delete Staff</label>
                <input
                  type="checkbox"
                  className="h-5 w-5 cursor-pointer"
                  checked={checkedItems.includes("deleteStaff")}
                  onChange={(event) =>
                    handleCheckboxChange(event, "deleteStaff")
                  }
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">Edit Staff</label>
                <input
                  type="checkbox"
                  className="h-5 w-5 cursor-pointer"
                  checked={checkedItems.includes("editStaff")}
                  onChange={(event) => handleCheckboxChange(event, "editStaff")}
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">
                  View Staff Sell Record
                </label>
                <input
                  type="checkbox"
                  className="h-5 w-5 cursor-pointer"
                  checked={checkedItems.includes("viewStaffSellRecord")}
                  onChange={(event) =>
                    handleCheckboxChange(event, "viewStaffSellRecord")
                  }
                />
              </div>
            </div>
          </div>
          <div className="my-4">
            <label className="block text-gray-800 text-xl font-bold mb-2">
              Supplier Access
            </label>
            <div className="grid grid-cols-3 gap-x-4">
              <div className="mb-2">
                <label className="block text-gray-700">Add New Supplier</label>
                <input
                  type="checkbox"
                  className="h-5 w-5 cursor-pointer"
                  checked={checkedItems.includes("addNewSupplier")}
                  onChange={(event) =>
                    handleCheckboxChange(event, "addNewSupplier")
                  }
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">Delete Supplier</label>
                <input
                  type="checkbox"
                  className="h-5 w-5 cursor-pointer"
                  checked={checkedItems.includes("deleteSupplier")}
                  onChange={(event) =>
                    handleCheckboxChange(event, "deleteSupplier")
                  }
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">Edit Supplier</label>
                <input
                  type="checkbox"
                  className="h-5 w-5 cursor-pointer"
                  checked={checkedItems.includes("editSupplier")}
                  onChange={(event) =>
                    handleCheckboxChange(event, "editSupplier")
                  }
                />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700">
                  View Supplier Record
                </label>
                <input
                  type="checkbox"
                  className="h-5 w-5 cursor-pointer"
                  checked={checkedItems.includes("viewSupplierRecord")}
                  onChange={(event) =>
                    handleCheckboxChange(event, "viewSupplierRecord")
                  }
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className={`w-full flex justify-center items-center bg-[#001529] text-white p-3 rounded-lg hover:bg-[#E6F4FF] transition duration-500 hover:text-[#5977FF] `}
          >
            SAVE CHANGES
          </button>
        </form>
      </CustomModal>
    </div>
  );
};

export default Permission;

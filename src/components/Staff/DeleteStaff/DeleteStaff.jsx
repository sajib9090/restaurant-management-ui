/* eslint-disable react/prop-types */
import { toast } from "sonner";
import { useDeleteStaffMutation } from "../../../redux/features/staff/staffApi";
import PrimaryLoading from "../../Loading/PrimaryLoading/PrimaryLoading";
import { DeleteFilled } from "@ant-design/icons";
import { Popconfirm } from "antd";

const DeleteStaff = ({ selectedRowKeys, setSelectedRowKeys }) => {
  const [deleteStaff, { isLoading: deleteLoading }] = useDeleteStaffMutation();

  const handleDelete = async () => {
    const data = {
      ids: selectedRowKeys,
    };
    try {
      const res = await deleteStaff(data).unwrap();
      if (res) {
        toast.success(
          `${selectedRowKeys?.length} staff member(s) have been deleted`
        );
        setSelectedRowKeys([]);
      }
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <>
      {selectedRowKeys?.length > 0 && (
        <Popconfirm
          title="Delete Staff"
          description="Are you sure you want to delete the selected staff?"
          onConfirm={handleDelete}
          okText="Yes"
          cancelText="No"
          placement="topLeft"
        >
          <button
            disabled={deleteLoading}
            className="h-[40px] w-[220px] border border-gray-300 text-red-500 text-lg rounded flex items-center justify-center"
          >
            {deleteLoading ? (
              <>
                Deleting ...
                <PrimaryLoading />
              </>
            ) : (
              <>
                <DeleteFilled />
                Delete Selected - ({selectedRowKeys?.length})
              </>
            )}
          </button>
        </Popconfirm>
      )}
    </>
  );
};

export default DeleteStaff;

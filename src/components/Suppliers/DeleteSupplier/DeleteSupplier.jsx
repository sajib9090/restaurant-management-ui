import { Popconfirm } from "antd";
import PrimaryLoading from "../../Loading/PrimaryLoading/PrimaryLoading";
import { DeleteFilled } from "@ant-design/icons";
import { toast } from "sonner";

const DeleteSupplier = ({ selectedRowKeys, setSelectedRowKeys }) => {
  const handleDelete = () => {
    console.log("object");
  };

  const deleteLoading = false;
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

export default DeleteSupplier;

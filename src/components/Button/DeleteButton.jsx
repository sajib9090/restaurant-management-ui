/* eslint-disable react/prop-types */
import { Popconfirm } from "antd";
import PrimaryLoading from "../Loading/PrimaryLoading/PrimaryLoading";
import { DeleteFilled } from "@ant-design/icons";

const DeleteButton = ({
  deleteTitle,
  onConfirm,
  deleteLoading,
  selectedRowKeys,
}) => {
  return (
    <>
      <Popconfirm
        title={`Delete ${deleteTitle}`}
        description={`Are you sure you want to delete selected ${deleteTitle}?`}
        onConfirm={onConfirm}
        okText="Yes"
        cancelText="No"
        placement="topLeft"
      >
        <button
          disabled={deleteLoading}
          className="h-[40px] w-[220px] border border-gray-300 text-red-500 text-lg my-6 rounded flex items-center justify-center gap-2"
        >
          {deleteLoading ? (
            <>
              Deleting ...
              <PrimaryLoading />
            </>
          ) : (
            <>
              <DeleteFilled />
              Delete Selected-({selectedRowKeys?.length})
            </>
          )}
        </button>
      </Popconfirm>
    </>
  );
};

export default DeleteButton;

/* eslint-disable react/prop-types */
import { Popconfirm } from "antd";
import { DeleteFilled } from "@ant-design/icons";
import { useDeleteUserMutation } from "../../redux/features/user/userApi";
import { toast } from "sonner";

const DeleteUser = ({ user, userInfo }) => {
  const [deleteUser, { isLoading: deleteLoading }] = useDeleteUserMutation();
  const handleDelete = async () => {
    try {
      const res = await deleteUser(user?.user_id).unwrap();
      toast.success(res?.message || res?.data?.message);
    } catch (error) {
      toast.error(error?.message || error?.data?.message);
    }
  };
  return (
    <>
      {user?.user_id !== userInfo?.user_id && (
        <Popconfirm
          title="Delete User"
          description="Are you sure you want to delete this user?"
          onConfirm={handleDelete}
          okText="Yes"
          cancelText="No"
          placement="topLeft"
        >
          <button title="Delete" disabled={deleteLoading}>
            <DeleteFilled className="text-red-600 hover:scale-110 hover:text-red-700 text-lg" />
          </button>
        </Popconfirm>
      )}
    </>
  );
};

export default DeleteUser;

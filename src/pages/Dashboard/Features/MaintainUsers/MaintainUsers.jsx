import { Table } from "antd";
import { useGetAllUserQuery } from "../../../../redux/features/user/userApi";
import { useState } from "react";
import DateFormatter from "../../../../components/DateFormatter/DateFormatter";
import defaultAvatar from "../../../../../public/image/avatar/6791548_avatar_person_profile_profile icon_user_icon.png";

const MaintainUsers = () => {
  const [pageSize, setPageSize] = useState(10);
  const { data: users, isLoading: usersLoading, error } = useGetAllUserQuery();

  const columns = [
    Table.SELECTION_COLUMN,
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      className: "",
    },
    {
      title: "",
      dataIndex: "avatar",
      key: "avatar",
      className: "w-[10%]",
    },

    {
      title: "Role & Username",
      dataIndex: "role",
      key: "role",
      className: "w-[20%]",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      className: "text-gray-500 w-[25%]",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      className: "uppercase w-[7%]",
    },
  ];

  const data =
    users?.data?.map((user, i) => ({
      key: user?.user_id,

      name: (
        <div className="capitalize">
          <span className="mr-1">
            {i + 1 + users?.pagination?.currentPage * pageSize - pageSize}.
          </span>
          {user?.name}
        </div>
      ),
      avatar: (
        <div>
          <div className="w-12 h-12">
            <img
              className="w-full border rounded-full"
              src={user?.avatar ? user?.avatar : defaultAvatar}
              alt=""
            />
          </div>
        </div>
      ),
      role: (
        <div>
          <p>Role: {user?.role}</p>
          <p>Username: {user?.username}</p>
        </div>
      ),
      email: (
        <span className="flex flex-col">
          <span>{user?.email}</span>
          <span className="text-[13px] text-gray-500">
            <DateFormatter dateString={user?.createdAt} />
          </span>
        </span>
      ),

      // discount: member?.discount_value + "%",
      // actions: (
      //   <button
      //     onClick={() => {
      //       setMemberData(member);
      //       setIsModalOpen(!isModalOpen);
      //     }}
      //     title="Edit"
      //     className="text-blue-600 text-xl ml-4"
      //   >
      //     <EditFilled />
      //   </button>
      // ),
    })) || [];

  return (
    <div>
      <h1>Maintain users</h1>

      <Table
        columns={columns}
        // rowSelection={rowSelection}
        dataSource={data}
        pagination={false}
      />
    </div>
  );
};

export default MaintainUsers;

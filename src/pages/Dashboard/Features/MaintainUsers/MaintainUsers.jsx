import { Pagination, Popconfirm, Table } from "antd";
import { useGetAllUserQuery } from "../../../../redux/features/user/userApi";
import { useState } from "react";
import DateFormatter from "../../../../components/DateFormatter/DateFormatter";
import defaultAvatar from "../../../../../public/image/avatar/6791548_avatar_person_profile_profile icon_user_icon.png";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { currentUser } from "../../../../redux/features/auth/authSlice";
import PrimaryLoading from "../../../../components/Loading/PrimaryLoading/PrimaryLoading";

const MaintainUsers = () => {
  const loggedInUser = useSelector(currentUser);

  const [searchValue, setSearchValue] = useState("");
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const {
    data: users,
    isLoading: usersLoading,
    error,
  } = useGetAllUserQuery({
    pageValue: currentPage,
    limitValue: pageSize,
    searchValue: searchValue,
  });

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
      className: "w-[7%]",
    },
    {
      title: "Brand ID",
      dataIndex: "brand",
      key: "brand",
      className: "w-[17%]",
    },
    {
      title: "Role & Username",
      dataIndex: "role",
      key: "role",
      className: "w-[18%]",
    },
    {
      title: "Email & Mobile",
      dataIndex: "email",
      key: "email",
      className: "text-gray-500 w-[15%]",
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
        <div className="flex items-center text-pink-600 capitalize font-bold">
          <span className="mr-2 font-bold">
            {i + 1 + users?.pagination?.currentPage * pageSize - pageSize}.
          </span>
          {user?.name}
        </div>
      ),
      avatar: (
        <div className="flex justify-center items-center">
          <img
            className="w-12 h-12 rounded-full border-2 border-gray-300 shadow-sm"
            src={user?.avatar ? user?.avatar : defaultAvatar}
            alt=""
          />
        </div>
      ),
      brand: <span className="text-[10px]">{user?.brand_id}</span>,
      role: (
        <div>
          <p className="font-semibold text-blue-600 capitalize">
            <span className="text-gray-500">Role:</span> {user?.role}
          </p>
          <p className="text-sm text-gray-500">
            Username: <span className="text-orange-700">{user?.username}</span>
          </p>
        </div>
      ),
      email: (
        <div className="flex flex-col">
          <span className="text-green-600">{user?.email}</span>
          <span className="text-fuchsia-700">{user?.mobile}</span>
          <span className="text-sm text-gray-400">
            <DateFormatter dateString={user?.createdAt} />
          </span>
        </div>
      ),
      actions: (
        <div className="flex items-center justify-center">
          {user?.email !== loggedInUser?.email && (
            <button
              title="Edit"
              className="text-blue-500 text-xl hover:text-blue-700 transition-transform transform hover:scale-110"
            >
              <EditFilled />
            </button>
          )}
        </div>
      ),
    })) || [];

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys) => {
      setSelectedRowKeys(selectedRowKeys);
    },
  };

  const handlePaginationChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  let deleteLoading = true;
  const handleDelete = () => {
    console.log(selectedRowKeys);
  };

  return (
    <div>
      <div className="flex items-center justify-between mt-4 mb-10">
        <div className="search">
          <input
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            className="rounded"
            type="search"
            placeholder="Search..."
          />
        </div>
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
              className="h-[40px] w-[220px] border border-gray-300 text-red-500 text-lg rounded flex items-center justify-center gap-2"
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
        )}
      </div>
      <Table
        columns={columns}
        rowSelection={rowSelection}
        dataSource={data}
        pagination={false}
      />
      <div className="mt-2">
        <Pagination
          total={users?.data_found || 0}
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} of ${total} items`
          }
          pageSize={pageSize}
          current={currentPage}
          onChange={handlePaginationChange}
          showSizeChanger
        />
      </div>
    </div>
  );
};

export default MaintainUsers;

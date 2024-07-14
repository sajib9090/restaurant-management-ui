import { Pagination, Table } from "antd";
import { useGetAllUserQuery } from "../../../../redux/features/user/userApi";
import { useState } from "react";
import DateFormatter from "../../../../components/DateFormatter/DateFormatter";
import defaultAvatar from "../../../../assets/image/avatar/6791548_avatar_person_profile_profile icon_user_icon.png";
import { useSelector } from "react-redux";
import { currentUserInfo } from "../../../../redux/features/auth/authSlice";
import AddUser from "../../../../components/UserMaintain/AddUser";
import Edit from "../../../../components/UserMaintain/Edit";
import DeleteUser from "../../../../components/UserMaintain/DeleteUser";
import TitleComponent from "../../../../components/TitleComponent/TitleComponent";
import { useLocation } from "react-router-dom";
import LocationPath from "../../../../components/LocationPath/LocationPath";

const MaintainUsers = () => {
  const location = useLocation();

  const userInfo = useSelector(currentUserInfo);
  const [searchValue, setSearchValue] = useState("");
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data: users,
    isLoading: usersLoading,
  } = useGetAllUserQuery({
    pageValue: currentPage,
    limitValue: pageSize,
    searchValue: searchValue,
  });

  const columns = [
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
            src={user?.avatar?.url ? user?.avatar?.url : defaultAvatar}
            alt=""
          />
        </div>
      ),
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
        <div className="flex items-center justify-between">
          <Edit user={user} userInfo={userInfo} />
          <DeleteUser user={user} userInfo={userInfo} />
        </div>
      ),
    })) || [];

  const handlePaginationChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };


  return (
    <div>
      <TitleComponent
        title={`${LocationPath(location)}-(${users?.data_found || 0})`}
      />
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

        <div>
          <AddUser />
        </div>
      </div>
      <Table columns={columns} dataSource={data} pagination={false} />
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

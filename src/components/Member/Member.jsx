/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Pagination, Table } from "antd";
import {
  useDeleteMemberMutation,
  useGetAllMembersQuery,
} from "../../redux/features/member/memberApi";
import { EditFilled } from "@ant-design/icons";
import CurrencyFormatter from "../Currencyformatter/CurrencyFormatter";
import { toast } from "sonner";
import DateFormatter from "../DateFormatter/DateFormatter";
import ExpandDetails from "./ExpandDetails";
import CustomModal from "../Modal/Modal";
import EditMember from "./EditMember";
import IndividualLoading from "../Loading/IndividualLoading/IndividualLoading";
import DeleteButton from "../Button/DeleteButton";
import { useSelector } from "react-redux";
import { currentUser } from "../../redux/features/auth/authSlice";
import PriceFilter from "../Filter/PriceFilter";
import ResetFilter from "../Filter/ResetFilter";
import SearchInput from "../SearchInput/SearchInput";
import BrandFilter from "../Filter/BrandFilter";
import BrandInfo from "../Brand/BrandInfo/BrandInfo";

const Member = ({ setTotalMember }) => {
  const user = useSelector(currentUser);
  const [searchValue, setSearchValue] = useState("");
  const [spentValue, setSpentValue] = useState("");
  const [discountValue, setDiscountValue] = useState("");
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [memberData, setMemberData] = useState({});
  const [brandValue, setBrandValue] = useState("");

  const columns = [
    Table.SELECTION_COLUMN,
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      className: "capitalize",
    },
    Table.EXPAND_COLUMN,
    ...(user?.role === "super admin"
      ? [
          {
            title: "",
            dataIndex: "brand",
            key: "brand",
            className: "w-[12%]",
          },
        ]
      : []),
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
      className: "text-gray-500 w-[17%]",
    },

    {
      title: "Total Spent",
      dataIndex: "total_spent",
      key: "total_spent",
      className: "text-gray-500 w-[15%]",
    },
    {
      title: "Got Total Discount",
      dataIndex: "total_discount",
      key: "total_discount",
      className: "text-gray-500 w-[15%]",
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      className: "w-[10%] text-center",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      className: "w-[7%]",
    },
  ];

  const { data: members, isLoading: memberLoading } = useGetAllMembersQuery({
    searchValue,
    spentValue,
    discountValue,
    pageValue: currentPage,
    limitValue: pageSize,
    brandValue: brandValue,
  });

  useEffect(() => {
    if (members) {
      setTotalMember(members?.data_found || 0);
    }
  }, [setTotalMember, members]);

  const data =
    members?.data?.map((member, i) => ({
      key: member?.member_id,
      name: (
        <div>
          <span className="mr-1">
            {i + 1 + members?.pagination?.currentPage * pageSize - pageSize}.
          </span>
          {member?.name}
        </div>
      ),
      member: member,
      brand: (
        <BrandInfo
          logo={member?.brand_info?.brand_logo?.url}
          name={member?.brand_info?.brand_name}
        />
      ),
      mobile: (
        <div>
          <p className="text-blue-600 font-semibold">{member?.mobile}</p>
          <span className="text-xs">
            <DateFormatter dateString={member?.createdAt} />
          </span>
        </div>
      ),
      total_spent: member?.total_spent ? (
        <span className="text-green-600 font-bold">
          <CurrencyFormatter value={member?.total_spent} />
        </span>
      ) : (
        0
      ),
      total_discount: member?.total_discount ? (
        <span className="text-red-600 font-bold">
          <CurrencyFormatter value={member?.total_discount} />
        </span>
      ) : (
        0
      ),
      discount: member?.discount_value + "%",
      actions: (
        <button
          onClick={() => {
            setMemberData(member);
            setIsModalOpen(!isModalOpen);
          }}
          title="Edit"
          className="text-blue-600 text-xl ml-4"
        >
          <EditFilled />
        </button>
      ),
    })) || [];

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys) => {
      setSelectedRowKeys(selectedRowKeys);
    },
  };

  const expandedRowRender = (record) => {
    return (
      <>
        <ExpandDetails record={record} />
      </>
    );
  };

  const handlePaginationChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const [deleteMember, { isLoading: deleteLoading }] =
    useDeleteMemberMutation();

  const handleDelete = async () => {
    const data = {
      ids: selectedRowKeys,
    };

    try {
      const res = await deleteMember(data).unwrap();
      if (res) {
        toast.success(`${selectedRowKeys?.length} -Member has been deleted`);
        setSelectedRowKeys([]);
      }
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const isLoading = memberLoading || deleteLoading;
  return (
    <div>
      <div className="flex items-center justify-between mt-4 mb-10">
        <SearchInput
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
            setDiscountValue("");
            setSpentValue("");
          }}
        />

        {selectedRowKeys?.length > 0 && (
          <DeleteButton
            deleteTitle={"Members"}
            onConfirm={handleDelete}
            deleteLoading={deleteLoading}
            selectedRowKeys={selectedRowKeys}
          />
        )}

        {user?.role === "super admin" && (
          <BrandFilter
            user={user}
            brandValue={brandValue}
            setBrandValue={setBrandValue}
          />
        )}

        <div className="relative">
          <div className="space-y-2">
            <PriceFilter
              value={spentValue}
              onChange={(e) => {
                setSpentValue(e.target.value);
                setDiscountValue("");
              }}
              placeholder={"Filter with Spent Amount"}
            />

            <PriceFilter
              value={discountValue}
              onChange={(e) => {
                setDiscountValue(e.target.value);
                setSpentValue("");
              }}
              placeholder={"Filter with Discount"}
            />
          </div>

          {discountValue || spentValue ? (
            <ResetFilter
              onClick={() => {
                setSearchValue("");
                setDiscountValue("");
                setSpentValue("");
              }}
            />
          ) : null}
        </div>
      </div>

      {isLoading ? (
        <IndividualLoading contentLength={50} />
      ) : (
        <Table
          columns={columns}
          rowSelection={rowSelection}
          dataSource={data}
          pagination={false}
          expandable={{
            expandedRowRender,
          }}
        />
      )}
      <div className="mt-2">
        <Pagination
          disabled={isLoading}
          total={members?.data_found || 0}
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} of ${total} items`
          }
          pageSize={pageSize}
          current={currentPage}
          onChange={handlePaginationChange}
          showSizeChanger
        />
      </div>

      {/* modal */}
      <CustomModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        closeSymbolFalse={true}
      >
        <EditMember
          setIsModalOpen={setIsModalOpen}
          setSelectedRowKeys={setSelectedRowKeys}
          memberData={memberData}
        />
      </CustomModal>
    </div>
  );
};

export default Member;

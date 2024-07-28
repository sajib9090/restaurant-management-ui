import StatisticsCard from "../../../../components/StatisticsCard/StatisticsCard";
import { useGetAllCategoriesQuery } from "../../../../redux/features/category/categoryApi";
import Category from "../../../../components/Category/Category";
import { useState } from "react";
import TitleComponent from "../../../../components/TitleComponent/TitleComponent";
import { useLocation } from "react-router-dom";
import LocationPath from "../../../../components/LocationPath/LocationPath";
import { useSelector } from "react-redux";
import { currentUser } from "../../../../redux/features/auth/authSlice";

const MaintainCategories = () => {
  const user = useSelector(currentUser);
  const location = useLocation();
  const [searchValue, setSearchValue] = useState("");
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [brandValue, setBrandValue] = useState("");

  const { data: categories, isLoading: categoryLoading } =
    useGetAllCategoriesQuery({
      pageValue: currentPage,
      limitValue: pageSize,
      searchValue: searchValue,
      brandValue: brandValue,
    });

  return (
    <div>
      <TitleComponent
        title={`${LocationPath(location)}-(${categories?.data_found || 0})`}
      />

      <StatisticsCard
        bg="bg-gray-200"
        title="Total Categories"
        value={categories?.data_found}
      />

      <div className="w-full min-h-screen">
        <Category
          categories={categories}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          pageSize={pageSize}
          setPageSize={setPageSize}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          categoryLoading={categoryLoading}
          user={user}
          brandValue={brandValue}
          setBrandValue={setBrandValue}
        />
      </div>
    </div>
  );
};

export default MaintainCategories;

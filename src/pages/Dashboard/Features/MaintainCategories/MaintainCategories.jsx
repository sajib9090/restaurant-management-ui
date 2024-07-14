import StatisticsCard from "../../../../components/StatisticsCard/StatisticsCard";
import { useGetAllCategoriesQuery } from "../../../../redux/features/category/categoryApi";
import Category from "../../../../components/Category/Category";
import { useState } from "react";
import TitleComponent from "../../../../components/TitleComponent/TitleComponent";
import { useLocation } from "react-router-dom";
import LocationPath from "../../../../components/LocationPath/LocationPath";

const MaintainCategories = () => {
  const location = useLocation();
  const [searchValue, setSearchValue] = useState("");
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: categories,
    isLoading: categoryLoading,
  } = useGetAllCategoriesQuery({
    pageValue: currentPage,
    limitValue: pageSize,
    searchValue: searchValue,
  });



  return (
    <div>
      <TitleComponent
        title={`${LocationPath(location)}-(${categories?.data_found || 0})`}
      />
      <div className="grid grid-cols-5 gap-6">
        <StatisticsCard
          bg="bg-gray-200"
          title="Total Categories"
          value={categories?.data_found}
        />
      </div>

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
        />
      </div>
    </div>
  );
};

export default MaintainCategories;

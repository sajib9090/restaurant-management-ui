import StatisticsCard from "../../../../components/StatisticsCard/StatisticsCard";
import { useGetAllCategoriesQuery } from "../../../../redux/features/category/categoryApi";
import Category from "../../../../components/Category/Category";
import { useState } from "react";
import AccessError from "../../../../components/AccessError/AccessError";

const MaintainCategories = () => {
  const [searchValue, setSearchValue] = useState("");
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: categories, error: getError } = useGetAllCategoriesQuery({
    pageValue: currentPage,
    limitValue: pageSize,
    searchValue: searchValue,
  });

  const allError = getError;
  if (allError) {
    return (
      <AccessError
        errorMessage={allError?.data?.message || allError?.message}
      />
    );
  }

  return (
    <div>
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
        />
      </div>
    </div>
  );
};

export default MaintainCategories;

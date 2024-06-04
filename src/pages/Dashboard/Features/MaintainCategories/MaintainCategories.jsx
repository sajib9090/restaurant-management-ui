import StatisticsCard from "../../../../components/StatisticsCard/StatisticsCard";
import { useGetAllCategoriesQuery } from "../../../../redux/features/category/categoryApi";
import Category from "../../../../components/Category/Category";

const MaintainCategories = () => {
  const { data: categories } = useGetAllCategoriesQuery();

  return (
    <div>
      <div className="grid grid-cols-5 gap-6">
        <StatisticsCard
          bg="bg-gray-200"
          title="Total Categories"
          value={categories?.data?.length}
        />
      </div>

      <div className="w-full min-h-screen">
        <Category categories={categories} />
      </div>
    </div>
  );
};

export default MaintainCategories;

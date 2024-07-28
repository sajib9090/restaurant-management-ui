/* eslint-disable react/prop-types */

import { useGetAllBrandsQuery } from "../../redux/features/brand/brandApi";
import Filter from "./Filter";
import ResetFilter from "../../components/Filter/ResetFilter";

const BrandFilter = ({ user, brandValue, setBrandValue }) => {
  const { data: brands, isLoading: brandLoading } = useGetAllBrandsQuery(
    {},
    {
      skip: user?.role !== "super admin",
    }
  );

  return (
    <div className="flex flex-col relative">
      <Filter
        value={brandValue}
        onChange={(e) => setBrandValue(e.target.value)}
        loading={brandLoading}
        data={brands?.data?.map((ui) => (
          <option key={ui?._id} value={ui?.brand_id} className="capitalize">
            {ui?.brand_name}
          </option>
        ))}
        placeholder={"Filter with Brand"}
      />
      {brandValue && <ResetFilter onClick={() => setBrandValue("")} />}
    </div>
  );
};

export default BrandFilter;

/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useGetCurrentBrandInfoQuery } from "../../redux/features/brand/brandApi";
const PlanCard = ({ popular, plan, actionButton }) => {
  const { data: brand } = useGetCurrentBrandInfoQuery();

  return (
    <div className="max-w-sm relative">
      <div
        className={`bg-white shadow-lg rounded-lg overflow-hidden ${
          popular ? "border-[3px] border-blue-500" : "border border-gray-200"
        }`}
      >
        <div className="p-6 text-center">
          <h2 className="text-2xl font-semibold mb-4 capitalize">
            {plan?.plan_name}
          </h2>
          <p className="text-gray-600 mb-4 capitalize">{plan?.description}</p>
          <div className="text-4xl font-bold mb-4">
            {plan?.currency} {plan?.price}
          </div>
          <div className="text-gray-500 mb-4 capitalize">{plan?.duration}</div>
          {actionButton && (
            <Link
              to={`/user/pricing/plans?plan=${plan?.plan_id}`}
              className={`bg-blue-600 text-white py-2 px-12 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
                plan?.plan_id == brand?.data?.selected_plan?.id &&
                "bg-slate-200 hover:bg-slate-100 text-blue-600"
              }`}
            >
              {brand?.data?.selected_plan?.id == plan?.plan_id
                ? "Selected"
                : "Buy Now"}
            </Link>
          )}
        </div>
        <div className="border-t border-gray-200">
          <div className="p-6">
            <ul className="space-y-2">
              <li className="text-gray-600">
                <strong>Includes:</strong>
              </li>
              <li className="text-gray-600 list-disc">
                {plan?.user_limit} users
              </li>
              <li className="text-gray-600 list-disc normal-case">
                {plan?.features}
              </li>
              <li className="text-gray-600 list-disc normal-case">
                {plan?.limitations}
              </li>
            </ul>
          </div>
        </div>
      </div>
      {popular && (
        <div className="bg-blue-600 text-center py-1 px-8 absolute -top-3 right-[30%] rounded-full">
          <span className="text-sm font-semibold text-white">Most popular</span>
        </div>
      )}
    </div>
  );
};

export default PlanCard;

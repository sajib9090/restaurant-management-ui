import PlanCard from "../../components/Plans/PlanCard";
import { useGetAllPlansQuery } from "../../redux/features/plan/planApi";

const Pricing = () => {
  const { data: plans } = useGetAllPlansQuery();

  return (
    <div className="py-12">
      <div className="grid lg:grid-cols-3 gap-6">
        {plans?.data?.map((plan) => (
          <PlanCard
            key={plan?.plan_id}
            popular={plan?.plan_name == "pro"}
            actionButton={true}
            plan={plan}
          />
        ))}
      </div>
    </div>
  );
};

export default Pricing;

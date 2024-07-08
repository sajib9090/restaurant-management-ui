import { formatDistanceToNow } from "date-fns";
import { useGetCurrentBrandInfoQuery } from "../../../redux/features/brand/brandApi";

const SubscriptionAlert = () => {
  const { data: brand } = useGetCurrentBrandInfoQuery();

  const endTime = brand?.data?.subscription_info?.end_time;

  return (
    <div
      className={`font-semibold ${
        brand?.data?.subscription_info?.status
          ? "text-blue-600"
          : "text-red-600"
      }`}
    >
      {endTime ? (
        <>
          Subscription{" "}
          {brand?.data?.subscription_info?.status ? "Expires" : "Expired"}
          {" - "}
          {formatDistanceToNow(new Date(endTime), { addSuffix: true })}
        </>
      ) : (
        "N/A"
      )}
    </div>
  );
};

export default SubscriptionAlert;

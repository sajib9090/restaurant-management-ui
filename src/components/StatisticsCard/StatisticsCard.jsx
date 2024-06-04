/* eslint-disable react/prop-types */
const StatisticsCard = ({ bg, title, value }) => {
  return (
    <div
      className={`h-[100px] w-full rounded shadow ${bg} flex items-center justify-between px-4`}
    >
      <div className="space-y-2">
        <p className="text-4xl font-semibold">{value}</p>
        <p>{title}</p>
      </div>
    </div>
  );
};

export default StatisticsCard;

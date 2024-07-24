/* eslint-disable react/prop-types */
const StatisticsCard = ({ bg, title, value }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      <div
        className={`h-[100px] w-full rounded shadow ${bg} flex items-center justify-between px-4`}
      >
        <div className="space-y-2">
          <p className="text-4xl font-semibold">{value}</p>
          <p>{title}</p>
        </div>
      </div>
    </div>
  );
};

export default StatisticsCard;

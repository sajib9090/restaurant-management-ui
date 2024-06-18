

const TableSkeleton = () => {
  return (
    <div className="h-[200px] border border-gray-200 rounded-full shadow-xl flex flex-col justify-center items-center cursor-pointer bg-gradient-to-r from-white to-gray-200 animate-pulse">
      <div className="h-12 w-12 mb-2 bg-gray-300 rounded-full"></div>
      <div className="h-6 w-32 mb-2 bg-gray-300 rounded"></div>
      <div className="h-4 w-24 bg-gray-300 rounded mt-1"></div>
    </div>
  );
};

export default TableSkeleton;

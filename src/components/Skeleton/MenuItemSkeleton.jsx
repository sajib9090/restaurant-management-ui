const MenuItemSkeleton = () => {
  return (
    <div className="border border-gray-200 shadow-xl rounded-md p-4 animate-pulse">
      <div className="capitalize text-center rounded-md py-2 font-bold text-xl bg-gray-300 h-8 mb-4"></div>
      {Array.from({ length: 50 }).map((_, idx) => (
        <div
          key={idx}
          className="flex justify-between items-center py-4 shadow-md px-2 border-b border-gray-300 cursor-pointer"
        >
          <div className="flex font-bold text-black text-base">
            <div className="bg-gray-300 h-4 w-4 mr-2"></div>
            <div className="bg-gray-300 h-4 w-32 rounded"></div>
          </div>
          <div>
            <button className="bg-gray-300 h-6 w-12 rounded-md"></button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuItemSkeleton;

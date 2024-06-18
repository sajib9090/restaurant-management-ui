const SellReportSkeleton = () => {
  return (
    <div className="container mx-auto p-4">
      <table className="min-w-full bg-white">
        
        <tbody>
          {Array.from({ length: 20 }).map((_, i) => (
            <tr key={i} className="border-b animate-pulse w-[100%]">
              <td className="py-2 px-4 w-[40%]">
                <div className="bg-gray-300 h-4 rounded"></div>
              </td>
              <td className="py-2 px-4 w-[15%]">
                <div className="bg-gray-300 h-4 rounded"></div>
              </td>
              <td className="py-2 px-4 w-[20%]">
                <div className="bg-gray-300 h-4 rounded"></div>
              </td>
              <td className="py-2 px-4 w-[10%]">
                <div className="bg-gray-300 h-4 rounded"></div>
              </td>
              <td className="py-2 px-4 w-[15%]">
                <div className="bg-gray-300 h-4 rounded"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SellReportSkeleton;

const InvoiceSkeleton = () => {
  return (
    <div className="px-2 pt-4">
      <div className="w-full max-w-[310px] mx-auto animate-pulse">
        <div className="w-full max-w-[310px] min-h-[300px] pb-1">
          <div className="text-center mt-6">
            <div className="mx-auto w-full">
              <div className="h-[50px] w-[50px] bg-gray-200 mx-auto rounded-full"></div>
            </div>
            <div className="h-6 bg-gray-200 mt-4 rounded-md w-3/4 mx-auto"></div>
            <div className="h-4 bg-gray-200 mt-2 rounded-md w-2/3 mx-auto"></div>
            <div className="flex justify-center space-x-1 mt-2">
              <div className="h-3 bg-gray-200 rounded-md w-16"></div>
              <div className="h-3 bg-gray-200 rounded-md w-16"></div>
            </div>
            <div className="h-4 bg-gray-200 mt-2 rounded-md w-1/2 mx-auto"></div>
            <div className="h-4 bg-gray-200 mt-2 rounded-md w-1/3 mx-auto"></div>
          </div>
          <div className="h-3 bg-gray-200 mt-4 rounded-md w-1/2 ml-2"></div>
          <div className="mt-2">
            <div className="min-h-[30px] flex justify-between items-center px-3 text-[10px]">
              <div></div>
              <div className="flex">
                <div className="mr-8"></div>
                <div></div>
              </div>
            </div>
            {[...Array(10)].map((_, index) => (
              <div
                key={index}
                className="min-h-[27px] w-full flex items-center justify-between text-[10px] pr-1"
              >
                <div className="flex items-center w-[70%]">
                  <div className="h-3 bg-gray-200 rounded-md w-full"></div>
                </div>
                <div className="flex items-center justify-end w-[30%]">
                  <div className="flex items-center w-[30%]">
                    <div className="h-3 bg-gray-200 rounded-md w-full mr-3"></div>
                    <div className="h-3 bg-gray-200 rounded-md w-full"></div>
                  </div>
                  <div className="ml-1 w-[70%] text-end">
                    <div className="h-3 bg-gray-200 rounded-md w-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="w-[210px] flex flex-col justify-end ml-auto mt-2">
            <div className="flex justify-end text-sm font-medium min-w-full">
              <div className="h-4 bg-gray-200 rounded-md w-full"></div>
            </div>
            <div className="min-w-[50%] mt-2">
              <div className="flex justify-end text-sm font-medium w-full">
                <div className="h-4 bg-gray-200 rounded-md w-full"></div>
              </div>
              <div className="flex justify-end text-sm font-bold w-full mt-2">
                <div className="h-4 bg-gray-200 rounded-md w-full"></div>
              </div>
            </div>
          </div>
          <div className="text-[10px] text-center mt-3 font-medium">
            <div className="h-4 bg-gray-200 rounded-md w-3/4 mx-auto"></div>
          </div>
          <div className="text-[7px] text-start ml-2 mt-2 font-medium">
            <div className="h-3 bg-gray-200 rounded-md w-1/2"></div>
          </div>
        </div>
        <div className="flex justify-end space-x-4 mt-4">
          <div className="h-[35px] w-[80px] bg-gray-200 rounded-md"></div>
          <div className="h-[35px] w-[80px] bg-gray-200 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceSkeleton;

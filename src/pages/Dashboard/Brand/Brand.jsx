import defaultLogo from "../../../../public/image/brandlogo/5929158_cooking_food_hot_kitchen_restaurant_icon.png";
const Brand = () => {
  return (
    <div>
      <div className="h-[500px] w-full bg-gray-100 rounded grid grid-cols-12 py-6">
        <div className="col-span-3 flex justify-center">
          <div className="h-[300px] w-[300px]">
            <img
              className="w-[240px]  h-[240px] rounded-md  mx-auto p-2 bg-white hover:scale-105 duration-500 cursor-pointer"
              src={defaultLogo}
              alt=""
            />
          </div>
        </div>
        <div className="h-full col-span-9 space-y-4">
          <div className="flex items-center py-6 px-4 bg-white rounded text-lg">
            <p>Brand Name:</p>
            <p>Name</p>
          </div>
          <div className="flex items-center py-6 px-4 bg-white rounded text-lg">
            <p>Selected Plan:</p>
            <p>Name</p>
          </div>
          <div className="py-6 px-4 bg-white rounded text-lg">
            <div className="flex items-center ">
              <p>Last Payment:</p>
              <p>Date</p>
            </div>
            <div className="flex items-center ">
              <p>Subscription status:</p>
              <p>Date</p>
            </div>
            <div className="flex items-center ">
              <p>Will Expire:</p>
              <p>Date</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brand;

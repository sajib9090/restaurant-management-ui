import { useGetCurrentBrandInfoQuery } from "../../redux/features/brand/brandApi";
import brandLogo from "../../assets/image/brandlogo/5929158_cooking_food_hot_kitchen_restaurant_icon.png";
import TitleComponent from "../../components/TitleComponent/TitleComponent";
import IndividualLoading from "../../components/Loading/IndividualLoading/IndividualLoading";

const Home = () => {
  const { data, isLoading } = useGetCurrentBrandInfoQuery();

  return (
    <>
      <TitleComponent title={"Saif's Restaurant Management Software"} />
      <div className="min-h-screen flex items-center justify-center relative home">
        <div className="absolute inset-0 bg-slate-800 opacity-70"></div>
        <div className="relative w-full flex flex-col justify-center items-center">
          <div className="max-w-3xl w-full p-8 rounded-lg text-center bg-gray-100">
            {isLoading ? (
              <IndividualLoading contentLength={3} />
            ) : (
              <>
                <div className="flex justify-center">
                  <img
                    src={data?.data?.brand_logo?.url || brandLogo}
                    alt={data?.data?.brand_name}
                    className="w-full h-52 object-contain"
                  />
                </div>
                <h1 className="text-4xl font-bold text-gray-800 my-6 animate-bounce capitalize">
                  Welcome to{" "}
                  <span className="text-yellow-500">
                    {data?.data?.brand_name}
                  </span>
                </h1>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

import AccessError from "../../components/AccessError/AccessError";
import { useGetCurrentBrandInfoQuery } from "../../redux/features/brand/brandApi";

const Home = () => {
  const { data, error } = useGetCurrentBrandInfoQuery();
  if (error) {
    return <AccessError errorMessage={error?.data?.message} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative home">
      <div className="absolute inset-0 bg-slate-800 opacity-70"></div>
      <div className="relative w-full flex flex-col justify-center items-center">
        <div className="max-w-3xl w-full p-8 rounded-lg text-center bg-gray-100">
          <div className="flex justify-center">
            <img
              src={data?.data?.brand_logo?.url}
              alt={data?.data?.brand_name}
              className="w-full h-52 object-contain"
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 my-6 animate-bounce capitalize">
            Welcome to{" "}
            <span className="text-yellow-500">{data?.data?.brand_name}</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Home;

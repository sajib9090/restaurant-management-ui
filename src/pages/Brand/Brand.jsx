import defaultLogo from "../../assets/image/brandlogo/5929158_cooking_food_hot_kitchen_restaurant_icon.png";
import { CameraFilled } from "@ant-design/icons";
import { useRef } from "react";
import PrimaryLoading from "../../components/Loading/PrimaryLoading/PrimaryLoading";
import {
  useGetCurrentBrandInfoQuery,
  useUpdateBrandLogoMutation,
} from "../../redux/features/brand/brandApi";
import { toast } from "sonner";
import EditBrand from "../../components/Brand/EditBrand/EditBrand";
import LookInvoiceStyle from "../../components/Brand/LookInvoiceStyle/LookInvoiceStyle";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../redux/features/auth/authSlice";
import { useFetchCurrentUserMutation } from "../../redux/features/user/userApi";
import CurrencyFormatter from "../../components/Currencyformatter/CurrencyFormatter";
import { formatDistanceToNow } from "date-fns";
import LocationPath from "../../components/LocationPath/LocationPath";
import TitleComponent from "../../components/TitleComponent/TitleComponent";
import { useLocation } from "react-router-dom";
import IndividualLoading from "../../components/Loading/IndividualLoading/IndividualLoading";

const Brand = () => {
  const location = useLocation();
  const { data, isLoading: brandInfoLoading } = useGetCurrentBrandInfoQuery();
  const brand = data?.data;

  const fileInputRef = useRef(null);

  const [updateBrandLogo, { isLoading: updateLoading }] =
    useUpdateBrandLogoMutation();
  const [fetchCurrentUser, { isLoading }] = useFetchCurrentUserMutation();
  const dispatch = useDispatch();

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      try {
        const res = await updateBrandLogo({
          brandLogo: file,
        }).unwrap();

        const userInfo = await fetchCurrentUser().unwrap();
        dispatch(setUserInfo(userInfo?.data));
        toast.success(res?.message || "Logo uploaded successfully:");
      } catch (error) {
        toast.error(
          error?.data?.message || "An error occurred while uploading the logo"
        );
      }
    }
  };

  return (
    <div>
      <TitleComponent title={LocationPath(location)} />
      <div className="w-full bg-gray-100 rounded grid grid-cols-12 gap-2 py-16 px-4 relative">
        <div className="col-span-12 md:col-span-3 flex flex-col items-center">
          <div className="w-full flex justify-center">
            {updateLoading || isLoading ? (
              <div className="w-60 h-60 rounded-md mx-auto p-2 bg-white flex flex-col items-center justify-center">
                <PrimaryLoading />
                Updating...
              </div>
            ) : (
              <img
                className="w-60 h-60 rounded-md mx-auto p-2 bg-white hover:scale-105 duration-500 cursor-pointer"
                src={brand?.brand_logo?.url || defaultLogo}
                alt=""
              />
            )}
          </div>

          <button
            disabled={updateLoading || isLoading}
            onClick={() => fileInputRef.current.click()}
            className="text-center bg-gray-700 text-white py-2 mt-3 w-[40%] mx-auto rounded"
          >
            <CameraFilled />
            <span className="ml-1">Change Logo</span>
          </button>
          <input
            type="file"
            accept=".jpg, .jpeg, .png"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </div>
        <div className="h-full col-span-12 md:col-span-9 space-y-4 capitalize">
          {brandInfoLoading ? (
            <IndividualLoading contentLength={20} />
          ) : (
            <>
              <div className="flex items-center py-6 px-4 bg-white rounded-lg text-lg">
                <div className="flex items-center">
                  <lord-icon
                    src="https://cdn.lordicon.com/sdldsqlw.json"
                    trigger="in"
                    delay="1500"
                    state="in-reveal"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <p className="text-gray-500 text-sm">Brand Name:</p>
                </div>
                <p className="ml-4 text-blue-600 font-semibold">
                  {brand?.brand_name}
                </p>
              </div>
              <div className="flex items-center py-6 px-4 bg-white rounded-lg text-lg">
                <div className="flex items-center">
                  <lord-icon
                    src="https://cdn.lordicon.com/kpxbczav.json"
                    trigger="hover"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <p className="text-gray-500 text-sm">Selected Plan:</p>
                </div>
                <p className="ml-4">
                  {brand?.selected_plan?.name ? (
                    <span className="text-green-600 font-semibold">
                      {brand?.selected_plan?.name}
                    </span>
                  ) : (
                    <span className="text-orange-700 font-semibold">
                      No Plan Selected
                    </span>
                  )}
                </p>
              </div>
              <div className="py-6 px-4 bg-white rounded-lg text-lg space-y-2">
                <div className="flex items-center ">
                  <p className="text-gray-500 text-sm">Last Payment Date:</p>
                  <p className="ml-4">
                    {brand?.subscription_info?.previous_payment_time
                      ? formatDistanceToNow(
                          new Date(
                            brand?.subscription_info?.previous_payment_time
                          ),
                          { addSuffix: true }
                        )
                      : "N/A"}
                  </p>
                </div>
                <div className="flex items-center ">
                  <p className="text-gray-500 text-sm">Last Payment Amount:</p>
                  <p className="ml-4">
                    {brand?.subscription_info?.previous_payment_amount ? (
                      <CurrencyFormatter
                        value={
                          brand?.subscription_info?.previous_payment_amount
                        }
                      />
                    ) : (
                      "N/A"
                    )}
                  </p>
                </div>
                <div className="flex items-center ">
                  <p className="text-gray-500 text-sm">Subscription status:</p>
                  <p className="ml-4">
                    {brand?.subscription_info?.status ? (
                      <span className="text-green-600 font-semibold">
                        Active
                      </span>
                    ) : (
                      <span className="text-orange-700 font-semibold">
                        Expired
                      </span>
                    )}
                  </p>
                </div>
                <div className="flex items-center ">
                  <p className="text-gray-500 text-sm">
                    Subscription{" "}
                    {brand?.subscription_info?.status ? "Expires" : "Expired"}:
                  </p>
                  <span
                    className={`ml-4 ${
                      brand?.subscription_info?.status
                        ? "text-blue-600"
                        : "text-red-600"
                    }`}
                  >
                    {brand?.subscription_info?.end_time
                      ? formatDistanceToNow(
                          new Date(brand?.subscription_info?.end_time),
                          { addSuffix: true }
                        )
                      : "N/A"}
                  </span>
                </div>
              </div>
              <div className="py-6 px-4 bg-white rounded-lg text-lg space-y-2">
                <div className="text-gray-500 text-sm flex items-center">
                  <lord-icon
                    src="https://cdn.lordicon.com/qtykvslf.json"
                    trigger="hover"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <p>Contact:</p>
                </div>
                <div className="space-y-2 pl-[5rem]">
                  <div className="flex items-center">
                    <p className="text-gray-500 text-sm">Mobile:</p>
                    <p className="ml-4">{brand?.contact?.mobile1 || "N/A"}</p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-gray-500 text-sm">Mobile:</p>
                    <p className="ml-4 space-x-2">
                      <span>{brand?.contact?.mobile2 || "N/A"}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="py-6 px-4 bg-white rounded-lg text-lg space-y-2">
                <div className="text-gray-500 text-sm flex items-center">
                  <lord-icon
                    src="https://cdn.lordicon.com/surcxhka.json"
                    trigger="hover"
                    style={{ width: "30px", height: "30px" }}
                  />
                  <p>Address:</p>
                </div>
                <div className="space-y-2 pl-[5rem]">
                  <div className="flex items-center">
                    <p className="text-gray-500 text-sm">Location:</p>
                    <p className="ml-4">{brand?.address?.location || "N/A"}</p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-gray-500 text-sm">Sub-District:</p>
                    <p className="ml-4 space-x-2">
                      <span>{brand?.address?.sub_district || "N/A"}</span>
                    </p>
                  </div>
                  <div className="flex items-center">
                    <p className="text-gray-500 text-sm">District:</p>
                    <p className="ml-4 space-x-2">
                      <span>{brand?.address?.district || "N/A"}</span>
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
          <LookInvoiceStyle />
          <EditBrand brandInfo={brand} />
        </div>
      </div>
    </div>
  );
};

export default Brand;

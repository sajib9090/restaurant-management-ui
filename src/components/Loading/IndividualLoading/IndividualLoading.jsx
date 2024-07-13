/* eslint-disable react/prop-types */
import { Skeleton } from "antd";

const IndividualLoading = ({ contentLength }) => {
  return (
    <div>
      {Array.from({ length: contentLength }).map((_, index) => (
        <Skeleton key={index} active />
      ))}
    </div>
  );
};

export default IndividualLoading;

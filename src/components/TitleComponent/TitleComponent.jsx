/* eslint-disable react/prop-types */
import { Helmet } from "react-helmet-async";

const TitleComponent = ({ title }) => {
  return (
    <div>
      <Helmet>
        <title>{title}</title>
      </Helmet>
    </div>
  );
};

export default TitleComponent;

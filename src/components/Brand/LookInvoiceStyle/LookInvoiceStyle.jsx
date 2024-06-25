import { AimOutlined } from "@ant-design/icons";
import { useState } from "react";
import CustomModal from "../../Modal/Modal";

const LookInvoiceStyle = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsModalOpen(!isModalOpen)}
        title="View"
        className="absolute top-0.5 right-20 text-stone-700"
      >
        <AimOutlined className="text-2xl" />
      </button>

      <CustomModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        closeSymbolFalse={true}
      >

        
      </CustomModal>
    </>
  );
};

export default LookInvoiceStyle;

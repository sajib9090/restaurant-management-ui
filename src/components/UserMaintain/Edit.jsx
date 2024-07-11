/* eslint-disable react/prop-types */
import { EditFilled } from "@ant-design/icons";
import { useState } from "react";
import CustomModal from "../Modal/Modal";

const Edit = ({ user, userInfo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      {user?.username !== userInfo?.username && (
        <button
          onClick={() => setIsModalOpen(!isModalOpen)}
          title="Edit"
          className="text-blue-500 text-xl hover:text-blue-700 transition-transform transform hover:scale-110"
        >
          <EditFilled />
        </button>
      )}

      <CustomModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        closeSymbolFalse={true}
      >
        
      </CustomModal>
    </>
  );
};

export default Edit;

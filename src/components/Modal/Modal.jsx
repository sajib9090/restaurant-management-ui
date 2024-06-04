/* eslint-disable react/prop-types */
import { Modal } from "antd";

const CustomModal = ({ setIsModalOpen, isModalOpen, children }) => {
  return (
    <Modal
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
    >
      {children}
    </Modal>
  );
};

export default CustomModal;

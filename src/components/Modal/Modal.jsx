/* eslint-disable react/prop-types */
import { Modal } from "antd";

const CustomModal = ({ setIsModalOpen, isModalOpen, children, width }) => {
  return (
    <Modal
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
      width={width}
    >
      {children}
    </Modal>
  );
};

export default CustomModal;

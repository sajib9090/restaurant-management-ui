/* eslint-disable react/prop-types */
import { Modal } from "antd";

const CustomModal = ({
  setIsModalOpen,
  isModalOpen,
  children,
  width,
  center,
  closeSymbolFalse,
}) => {
  return (
    <Modal
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
      width={width}
      centered={center ? true : false}
      closable={closeSymbolFalse ? false : true}
    >
      {children}
    </Modal>
  );
};

export default CustomModal;

/* eslint-disable react/prop-types */

const CustomModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // Don't render modal if it's not open

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded-lg shadow-md max-w-6xl "
        onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
      >
        {children}
      </div>
    </div>
  );
};

export default CustomModal;

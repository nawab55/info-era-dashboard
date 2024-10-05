/* eslint-disable react/prop-types */
import { useState } from "react";
import api from "../../config/api";
import { toast } from "react-toastify";

const ComplainReplyModal = ({ complain, onClose }) => {
  const [status, setStatus] = useState(complain.status);
  const [reply, setReply] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(`/api/complains/reply/${complain.tokenId}/comment`, {
        status,
        replyMessage: reply,
      }, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
      });
      // update status in complain request
      await api.put(`/api/complains/update-status/${complain.tokenId}`,
        status,
      )
      toast.success(res.data.message);
      onClose();
    } catch (error) {
      toast.error("Failed to update the complain. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-1/3 p-6">
        <h2 className="text-2xl font-bold mb-4">Complain Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
              <option value="UnderProcess">Under Process</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Reply Message</label>
            <textarea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComplainReplyModal;

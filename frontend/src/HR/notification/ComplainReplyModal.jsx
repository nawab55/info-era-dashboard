/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import api from "../../config/api";
import { toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";

const ComplainReplyModal = ({ complain, onClose }) => {
  const [status, setStatus] = useState(complain.status); // Initialize with current status
  const [reply, setReply] = useState("");
  const [messages, setMessages] = useState([]); //Unified List of Replies and comments
  // const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchReplies = async () => {
      try {
        const res = await api.get(`/api/complains/${complain.tokenId}/replies`);
        setMessages(res.data.replies); // set both replies and comments
      } catch (error) {
        console.error("Error fetching replies", error);
      }
    };
    fetchReplies();
  }, [complain.tokenId]);

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
      await api.put(`/api/complains/update-status/${complain.tokenId}`, { status }); 
      toast.success(res.data.message);
      onClose();
    } catch (error) {
      toast.error("Failed to update the complain. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
      <div className="relative bg-white rounded-lg shadow-lg max-w-2xl w-full m-6 p-4">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-red-800">
          <FaTimes size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4">Complain: {complain.complainTitle}</h2>
        <p className="mb-4">Description: {complain.description}</p>
        {/* Display comments and replies */}
        <h3 className="mt-4 font-semibold text-lg">Conversation:</h3>
        <ul className="bg-gray-100 p-4 rounded-md max-h-52 overflow-y-auto mb-4 border-t border-b">
          {messages.map((msg, index) => (
            <li key={index} className="mb-4">
              {msg.message ? (
                <div className="bg-blue-100 p-3 rounded-lg shadow-md">
                  <strong className="text-blue-600">You:</strong> {msg.message}
                  <p className="text-gray-500 text-sm mt-1">{new Date(msg.createdAt).toLocaleString()}</p>
                </div>
              ) : (
                <div className="bg-green-100 p-3 rounded-lg shadow-md">
                  <strong className="text-green-600">Client:</strong> {msg.commentMsg}
                  <p className="text-gray-500 text-sm mt-1">{new Date(msg.createdAt).toLocaleString()}</p>
                </div>
              )}
            </li>
          ))}
        </ul>

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Status:</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Reply Message</label>
            <textarea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              rows="2"
            />
          </div>
          <div className="flex justify-center items-center">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Submit Reply
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComplainReplyModal;

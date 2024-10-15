/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import api from "../../../config/api";
import { Link } from "react-router-dom";
import { FaEye, FaTimes } from "react-icons/fa";

const ComplainModal = ({ complain, onClose }) => {
  // const [replies, setReplies] = useState([]);
  const [messages, setMessages] = useState([]); // Unified list of replies and comments
  const [comment, setComment] = useState("");

  useEffect(() => {
    // Fetch replies from the backend (if applicable)
    const fetchReplies = async () => {
      try {
        const res = await api.get(`/api/complains/${complain.tokenId}/replies`);
        // console.log(res);
        // setReplies(res.data.replies);
        setMessages(res.data.replies); // Set both replies and comments
      } catch (error) {
        console.error("Error fetching replies", error);
      }
    };
    fetchReplies();
  }, [complain.tokenId]);

  const handleCommentSubmit = async () => {
    if (!comment) return;
    try {
      const res = await api.post(`/api/complains/${complain.tokenId}/comment`, { comment });
      setComment("");

      // Append the new comment to the messages list
      const newComment = res.data.reply; // Assuming response has the new comment
      setMessages((prevMessages) => [...prevMessages, newComment]); // Add the new comment

      // Re-fetch replies to update the list
      // const res = await api.get(`/api/complains/${complain.tokenId}/replies`);
      // setReplies(res.data.replies);
    } catch (error) {
      console.error("Error submitting comment", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center mt-6">
      <div className="bg-white p-6 rounded-lg max-w-xl w-full h-4/5 overflow-y-auto m-6 relative shadow-lg">
        {/* Close Icon */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-red-800">
          <FaTimes size={24} />
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">Complain Details</h2>
         {/* Complain Details Table */}
        <table className="table-auto w-full mb-4 border-collapse">
          <tbody>
            <tr>
              <td className="font-semibold p-2 border">Complain ID:</td>
              <td className="p-2 border">{complain.tokenId}</td>
            </tr>
            <tr>
              <td className="font-semibold p-2 border">Title:</td>
              <td className="p-2 border">{complain.complainTitle}</td>
            </tr>
            <tr>
              <td className="font-semibold p-2 border">Description:</td>
              <td className="p-2 border">{complain.description}</td>
            </tr>
            <tr>
              <td className="font-semibold p-2 border">File:</td>
              <td className="p-2 border">
                {complain.complainFile ? (
                  <Link
                    to={complain.complainFile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline "
                  >
                    <FaEye size={20} />
                  </Link>
                ) : (
                  "No file attached"
                )}
              </td>
            </tr>
          </tbody>
        </table>

        {/* <h3 className="mt-4 font-semibold">Replies</h3>
        <ul className="list-disc pl-4">
          {replies.map((reply, index) => (
            <li key={index}>{reply.message}</li>
          ))}
        </ul> */}
        {/* Conversation Section */}
        <h3 className="mt-4 font-semibold text-lg">Conversation:</h3>
        <ul className="bg-gray-100 p-4 rounded-md max-h-48 overflow-y-auto mb-4">
          {messages.map((msg, index) => (
            <li key={index} className="mb-4">
              {msg.message ? (
                <div className="bg-blue-100 p-3 rounded-lg shadow-md">
                  <strong className="text-blue-600">Reply:</strong> {msg.message}
                  <p className="text-gray-500 text-sm mt-1">{new Date(msg.createdAt).toLocaleString()}</p>
                </div>
              ) : (
                <div className="bg-green-100 p-3 rounded-lg shadow-md">
                  <strong className="text-green-600">Comment:</strong> {msg.commentMsg}
                  <p className="text-gray-500 text-sm mt-1">{new Date(msg.createdAt).toLocaleString()}</p>
                </div>
              )}
            </li>
          ))}
        </ul>

         {/* Add Comment Section */}
        <div className="mt-4">
          <h3 className="font-semibold text-lg mb-2">Add Comment</h3>
          <textarea
            className="w-full p-2 border rounded-md mb-4"
            rows="3"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <div className="flex justify-center">
            <button
              className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
              onClick={handleCommentSubmit}
            >
              Submit Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplainModal;

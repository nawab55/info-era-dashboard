/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import api from "../../../config/api";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";

const ComplainModal = ({ complain, onClose }) => {
  const [replies, setReplies] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    // Fetch replies from the backend (if applicable)
    const fetchReplies = async () => {
      try {
        const res = await api.get(`/api/complains/${complain.tokenId}/replies`);
        setReplies(res.data.replies);
      } catch (error) {
        console.error("Error fetching replies", error);
      }
    };
    fetchReplies();
  }, [complain.tokenId]);

  const handleCommentSubmit = async () => {
    if (!comment) return;
    try {
      await api.post(`/api/complains/${complain.tokenId}/comment`, { comment });
      setComment("");
      // Re-fetch replies to update the list
      const res = await api.get(`/api/complains/${complain.tokenId}/replies`);
      setReplies(res.data.replies);
    } catch (error) {
      console.error("Error submitting comment", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full">
        <h2 className="text-xl font-bold mb-4">Complain Details</h2>
        <p>
          <strong className="mr-2">Complain ID:</strong> {complain.tokenId}
        </p>
        <p>
          <strong className="mr-2">Title:</strong> {complain.complainTitle}
        </p>
        <p>
          <strong className="mr-2">Description:</strong> {complain.description}
        </p>
        <p className="flex">
          <strong className="mr-2 ">File:</strong>
          {complain.complainFile ? (
            <Link
              to={complain.complainFile}
              target="_blank"
              rel="noopener noreferrer"
              className="my-auto"
            >
              <FaEye size={20} />  
            </Link>
          ) : (
            "No file attached"
          )}
        </p>

        <h3 className="mt-4 font-semibold">Replies</h3>
        <ul className="list-disc pl-4">
          {replies.map((reply, index) => (
            <li key={index}>{reply.message}</li>
          ))}
        </ul>

        <div className="mt-4">
          <h3 className="font-semibold">Add Comment</h3>
          <textarea
            className="w-full p-2 border rounded-md"
            rows="3"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <div className="flex justify-between">
            <button
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handleCommentSubmit}
            >
              Submit Comment
            </button>
            <button
              className="mt-4 px-4 py-2 bg-gray-400 text-white rounded"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplainModal;

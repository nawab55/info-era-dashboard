import { useEffect, useState } from "react";
import api from "../../../config/api";
import { toast } from "react-toastify";
import { FaTrashAlt } from "react-icons/fa";

const Bbc = () => {
  const [bbcList, setBbcList] = useState([]);

  // Fetch all BBC registrations
  const fetchBbcList = async () => {
    try {
      const response = await api.get("/api/co-partners/bbc/all");
      setBbcList(response.data);
    } catch (error) {
      console.error("Error fetching BBC data", error);
    }
  };

  useEffect(() => {
    fetchBbcList();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/co-partners/bbc/delete/${id}`);
      toast.success("Deleted Successfully");
      fetchBbcList();
    } catch (error) {
      console.error("Error deleting BBC data", error);
      toast.error("Error Deleting");
    }
  };

  return (
    <section className="md:ml-60 bg-inherit p-4 -mt-4">
      <div
        className="max-w-full overflow-y-auto bg-white p-8 mx-4 rounded-lg shadow-md"
        style={{ height: "600px", border: "1px solid white" }}
      >
        <div className="overflow-x-auto mt-6">
          <h3 className="text-2xl font-semibold mb-4">Applied BBC</h3>
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border border-gray-200">S.No</th>
                <th className="px-4 py-2 border border-gray-200">Name</th>
                <th className="px-4 py-2 border border-gray-200">
                  Company/Organization
                </th>
                <th className="px-4 py-2 border border-gray-200">Aadhaar</th>
                <th className="px-4 py-2 border border-gray-200">PAN</th>
                <th className="px-4 py-2 border border-gray-200">GST</th>
                <th className="px-4 py-2 border border-gray-200">Mobile</th>
                <th className="px-4 py-2 border border-gray-200">State</th>
                <th className="px-4 py-2 border border-gray-200">District</th>
                <th className="px-4 py-2 border border-gray-200">Email</th>
                <th className="px-4 py-2 border border-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bbcList.map((bbc, index) => (
                <tr
                  key={bbc._id}
                  className="text-start hover:bg-blue-200 text-nowrap"
                >
                  <td className="border border-gray-200 px-4 py-2">
                    {index + 1}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {bbc.name}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {bbc.company}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {bbc.aadhaar}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {bbc.pan}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {bbc.gst}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {bbc.mobile}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {bbc.state}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {bbc.district}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {bbc.email}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    <button
                      onClick={() => handleDelete(bbc._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition-all duration-150 ease-in-out"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Bbc;

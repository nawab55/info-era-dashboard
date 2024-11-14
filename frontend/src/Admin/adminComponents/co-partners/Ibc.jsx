import { useEffect, useState } from "react";
import api from "../../../config/api";
import { FaTrashAlt } from "react-icons/fa";

const Ibc = () => {
  const [ibcList, setIbcList] = useState([]);

  // Fetch all IBC registrations
  const fetchIbcList = async () => {
    try {
      const response = await api.get("/api/co-partners/ibc/all");
      setIbcList(response.data);
    } catch (error) {
      console.error("Error fetching IBC data", error);
    }
  };

  useEffect(() => {
    fetchIbcList();
  }, []);

  const handleDelete = () => {};

  return (
    <section className="md:ml-60 bg-inherit p-4 -mt-4">
      <div
        className="max-w-full overflow-y-auto bg-white p-6 mx-4 rounded-lg shadow-md"
        style={{ height: "600px", border: "1px solid white" }}
      >
        {/* Table to display IBC data */}
        <div className=" overflow-x-auto">
          <h3 className="text-2xl font-semibold mb-4">Applied IBC</h3>
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-slate-300">
              <tr>
                <th className="px-4 py-2 border">S.No</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Gender</th>
                <th className="px-4 py-2 border">Aadhaar</th>
                <th className="px-4 py-2 border">PAN</th>
                <th className="px-4 py-2 border">GST</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Mobile</th>
                <th className="px-4 py-2 border">State</th>
                <th className="px-4 py-2 border">District</th>
                <th className="px-4 py-2 border">Delete</th>
              </tr>
            </thead>
            <tbody>
              {ibcList.length > 0 ? (
                ibcList.map((ibc, index) => (
                  <tr
                    key={ibc._id}
                    className={index % 2 === 0 ? "bg-gray-100" : ""}
                  >
                    <td className="px-4 py-2 border text-center">
                      {index + 1}
                    </td>
                    <td className="px-4 py-2 border text-start text-nowrap">
                      {ibc.name}
                    </td>
                    <td className="px-4 py-2 border">{ibc.gender}</td>
                    <td className="px-4 py-2 border">{ibc.aadhaar}</td>
                    <td className="px-4 py-2 border">{ibc.pan}</td>
                    <td className="px-4 py-2 border">{ibc.gst}</td>
                    <td className="px-4 py-2 border">{ibc.email}</td>
                    <td className="px-4 py-2 border">{ibc.mobile}</td>
                    <td className="px-4 py-2 border text-nowrap">{ibc.state}</td>
                    <td className="px-4 py-2 border">{ibc.district}</td>
                    <td className="px-4 py-2 border text-center">
                      <button
                        onClick={() => handleDelete(ibc._id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transform hover:-translate-y-1 transition-transform duration-300"
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="11"
                    className="px-4 py-2 text-center text-gray-500"
                  >
                    No IBCs found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Ibc;

// import Breadcrumb from "./Breadcrumb";

const AdminHome = () => {
  return (
    <section className="flex-1 min-h-screen lg:p-6 p-2">
      {/* <Breadcrumb /> */}
      <div className="bg-white p-8 h-96 border rounded-md shadow-lg mx-4">
        <p className="text-gray-500 font-bold text-2xl mb-6">
          Welcome to the Dashboard
        </p>
        <p className="font-bold text-5xl text-blue-900">
          Info Era Software Services Pvt. Ltd.
        </p>
      </div>
    </section>
  );
};

export default AdminHome;

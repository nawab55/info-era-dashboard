/* eslint-disable react/prop-types */
const InvoiceItem = ({ id, name, hsn, qty, price, onDeleteItem, onEditItem }) => {
    const deleteItemHandler = () => {
      onDeleteItem(id);
    };
  // console.log(id + " " + name + " " + qty + " " + price);
    return (
      <>
      
        <tr>
          <td className="pr-2 md:pr-2 py-1 md:py-2">
            <input
              className="w-full p-1 border border-gray-300 rounded-md"
              type="text"
              id={id}
              name="name"
              defaultValue={name}
              onChange={onEditItem}
            />
          </td>
          <td className="px-2 md:px-4 py-1 md:py-2">
            <input
              className="w-full p-1 border border-gray-300 rounded-md"
              type="text"
              id={id}
              name="hsn"
              defaultValue={hsn}
              onChange={onEditItem}
            />
          </td>
          <td className="px-2 md:px-4 py-1 md:py-2">
            <input
              className="w-full p-1 border border-gray-300 rounded-md"
              type="number"
              id={id}
              name="qty"
              min="1"
              defaultValue={qty}
              onChange={onEditItem}
            />
          </td>
          <td className="px-2 md:px-4 py-1 md:py-2">
            <input
              className="w-full p-1 border border-gray-300 rounded-md"
              type="number"
              id={id}
              name="price"
              min="0.00"
              step="0.01"
              defaultValue={price}
              onChange={onEditItem}
            />
          </td>
          <td className="px-2 md:px-4 py-1 md:py-2 text-center">
            <button
              className="rounded-md bg-red-500 px-2 py-1 text-white shadow-sm hover:bg-red-600"
              type="button"
              onClick={deleteItemHandler}
            >
              {/* Delete */}
              <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
              </svg>
            </button>
          </td>
        </tr>
      </>
    );
  };
  
  export default InvoiceItem;
  
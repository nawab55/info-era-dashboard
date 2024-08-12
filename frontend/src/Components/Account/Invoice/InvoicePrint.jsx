/* eslint-disable react/prop-types */
import NumberToWords from 'number-to-words';

const InvoicePrint = ({ invoiceData }) => {
  if (!invoiceData) return null;

  const {
    invoiceNo = '',
    date = '',
    cashierName = '',
    buyerDetails = {},
    cgst = 0,
    sgst = 0,
    discount = 0,
    items = [],
    companyInfo = {},
  } = invoiceData;

  const subtotal = items.reduce((prev, curr) => prev + (Number(curr.price) || 0) * (curr.qty || 0), 0);
  const totalTaxRate = Number(cgst) + Number(sgst);
  const taxAmount = (totalTaxRate * subtotal) / 100;
  const discountAmount = (discount * subtotal) / 100;
  const total = subtotal - discountAmount + taxAmount;

  // Add console logs for debugging
  // console.log('Subtotal:', subtotal);
  // console.log('Total Tax Rate:', totalTaxRate);
  // console.log('Tax Amount:', taxAmount);
  // console.log('Discount Amount:', discountAmount);
  // console.log('Total:', total);

  // Validate numbers before converting to words
  const isFiniteNumber = (value) => Number.isFinite(value) ? value : 0;

  const totalInWords = NumberToWords.toWords(isFiniteNumber(total));
  const taxAmountInWords = NumberToWords.toWords(isFiniteNumber(taxAmount));

  // const totalInWords = NumberToWords.toWords(total);  
  // const taxAmountInWords = NumberToWords.toWords(taxAmount);

  return (
    <div className="p-2 bg-white rounded shadow-md">
      <h1 className="text-xl font-bold text-center uppercase text-gray-800 mb-6">
        Tax Invoice
      </h1>
      <div className="grid grid-cols-12 border border-gray-300">
        {/* Company and Buyer Information */}
        <div className="col-span-7 border-r border-gray-200 p-2 space-y-3">
          <h2 className="text-lg font-semibold mb-2 text-gray-800">
            Company Information
          </h2>
          <p className="text-sm">
            Company Name:{" "}
            <span className="font-semibold">{companyInfo.companyName || 'N/A'}</span>
          </p>
          <p className="text-sm">
            Address:{" "}
            <span className="font-semibold">{companyInfo.address || 'N/A'}</span>
          </p>
          <p className="text-sm">
            GSTIN/UIN:{" "}
            <span className="font-semibold">{companyInfo.gstin || 'N/A'}</span>
          </p>
          <p className="text-sm">
            CIN: <span className="font-semibold">{companyInfo.cin || 'N/A'}</span>
          </p>
          <p className="text-sm">
            E-Mail: <span className="font-semibold">{companyInfo.email || 'N/A'}</span>
          </p>
          <div className="border-t border-gray-300 pt-2">
            <h2 className="text-lg font-semibold mb-2 text-gray-800">
              Buyer Details(Bill to)
            </h2>
            <p className="text-sm">Name: {buyerDetails.customerName || 'N/A'}</p>
            <p className="text-sm">Mobile: {buyerDetails.mobile || 'N/A'}</p>
            <p className="text-sm">Email: {buyerDetails.email || 'N/A'}</p>
            <p className="text-sm">Address: {buyerDetails.address || 'N/A'}</p>
          </div>
        </div>
        {/* Invoice Information */}
        <div className="col-span-5 grid grid-cols-12">
          <div className="col-span-6 border border-gray-300 p-1">
            <p className="mb-1">Invoice No</p>
            <p className="text-sm font-semibold">{invoiceNo || 'N/A'}</p>
          </div>
          <div className="col-span-6 border border-gray-300 p-1">
            <p className="mb-1">Date</p>
            <p className="text-sm font-semibold">{date || 'N/A'}</p>
          </div>
          <div className="col-span-6 border border-gray-300 p-1">
            <p className="mb-1">Cashier</p>
            <p className="text-sm font-semibold">{cashierName || 'N/A'}</p>
          </div>
          <div className="col-span-6 border border-gray-300 p-1">
            <p className="mb-1">Delivery Note</p>
            <p className="text-sm font-semibold">{invoiceData.deliveryNote || 'N/A'}</p>
          </div>
          <div className="col-span-6 border border-gray-300 p-1">
            <p className="mb-1">Mode of Payment</p>
            <p className="text-sm font-semibold">{invoiceData.modeOfPayment || 'N/A'}</p>
          </div>
          <div className="col-span-6 border border-gray-300 p-1">
            <p className="mb-1">Reference No</p>
            <p className="text-sm font-semibold">{invoiceData.referenceNo || 'N/A'}</p>
          </div>
          <div className="col-span-6 border border-gray-300 p-1">
            <p className="mb-1">Buyer&apos;s Order No</p>
            <p className="text-sm font-semibold">{invoiceData.buyersOrderNo || 'N/A'}</p>
          </div>
          <div className="col-span-6 border border-gray-300 p-1">
            <p className="mb-1">Dispatched Doc No.</p>
            <p className="text-sm font-semibold">{invoiceData.dispatchedDocNo || 'N/A'}</p>
          </div>
          <div className="col-span-6 border border-gray-300 p-1">
            <p className="mb-1">Dispatched Through</p>
            <p className="text-sm font-semibold">{invoiceData.dispatchedThrough || 'N/A'}</p>
          </div>
          <div className="col-span-6 border border-gray-300 p-1">
            <p className="mb-1">Destination</p>
            <p className="text-sm font-semibold">{invoiceData.destination || 'N/A'}</p>
          </div>
          <div className="col-span-12 border border-gray-300 p-1">
            <p className="mb-1">Terms of Delivery</p>
            <p className="text-sm font-semibold">{invoiceData.termsOfDelivery || 'N/A'}</p>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="pb-2">
        <table className="border-collapse border border-slate-500 w-full table-auto">
          <thead>
            <tr className=" text-sm">
              <th className="border border-slate-600 text-left p-2">SL No.</th>
              <th className="border border-slate-600 text-left p-2">Item</th>
              <th className="border border-slate-600 text-center p-2">HSN/SAC</th>
              <th className="border border-slate-600 text-center p-2">Quantity</th>
              <th className="border border-slate-600 text-center p-2">Rate</th>
              <th className="border border-slate-600 text-center p-2">Rate(incl. of Tax)</th>
              <th className="border border-slate-600 text-center p-2">Per</th>
              <th className="border border-slate-600 text-center p-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            { items.map((item, index) => {
                const itemTaxPrice = (totalTaxRate * Number(item.price || 0)) / 100;
                const itemPriceWithTax = Number(item.price || 0) + itemTaxPrice;
                const itemTotalAmount = (Number(item.price || 0) * (item.qty || 0));
                return (
                  <tr key={item.id} className="">
                    <td className="border border-slate-600 p-2">{index + 1}</td>
                    <td className="border border-slate-600 p-2">{item.name || 'N/A'}</td>
                    <td className="border border-slate-600 text-center p-2">{item.hsn || 'N/A'}</td>
                    <td className="border border-slate-600 text-center p-2">{item.qty || 'N/A'} PIC</td>
                    <td className="border border-slate-600 text-center p-2">₹{item.price || 'N/A'}</td>
                    <td className="border border-slate-600 text-center p-2">₹{itemPriceWithTax.toFixed(2)}</td>
                    <td className="border border-slate-600 text-center p-2">PIC</td>
                    <td className="border border-slate-600 text-center p-2">₹{itemTotalAmount.toFixed(2)}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div className="border border-gray-300 py-2">
          <div className="flex justify-between">
            <span className="ml-4">CGST:</span>
            <span className="mr-4">₹{((cgst * subtotal) / 100).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="ml-4">SGST:</span>
            <span className="mr-4">₹{((sgst * subtotal) / 100).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="ml-4">Discount:</span>
            <span className="mr-4">₹{discountAmount.toFixed(2)}</span>
          </div>
        </div>
              
        {/* total amount */}
        <div className="flex justify-between pb-2 font-bold text-lg border border-gray-300">
          <span className="ml-4">Total:</span>
          <span className="mr-4">₹{total.toFixed(2)}</span>
        </div>

        <div className=" flex justify-between pb-1 border border-gray-300">
          <div className="ml-2">
            <p className="">Amount Chargeable(in words)</p>
            <p className="text-lg font-semibold capitalize">INR {totalInWords}</p>
          </div>
          <div>
            <p className="mr-2">E. & O.E</p>
          </div>
        </div>

        <div className="flex flex-wrap border border-gray-300">
          <div className="flex-1 border-r border-gray-300">
            <p className="border-b border-gray-300 text-center">HSN/SAC</p>
            {items && items.map((item, index) => (
          
              <span key={index} className="block ml-2 border-b">{index+1}. {item.hsn}</span>
            ))}
          </div>
          <div className="flex-1 border-r border-gray-300">
            <p className="border-b border-gray-300 text-center">Taxable Value</p>
            <span className="block text-center mt-2">₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex-1 border-r border-gray-300">
            <p className="border-b border-gray-300 text-center">CGST</p>
            <div>
              <div className="flex justify-between border-b border-gray-300">
                <p className="ml-4">Rate</p>
                <span className="mr-4">{cgst}%</span>
              </div>
              <div className="flex justify-between">
                <p className="ml-2">Amount:</p>
                <span className="mr-2">₹{((cgst * subtotal) / 100).toFixed(2)}</span>
              </div>
            </div>
          </div>
          <div className="flex-1 border-r border-gray-300">
            <p className="border-b border-gray-300 text-center">SGST/UTGST</p>
            <div>
              <div className="flex justify-between border-b border-gray-300">
                <p className="ml-4">Rate</p>
                <span className="mr-4">{sgst}%</span>
              </div>
              <div className="flex justify-between">
                <p className="ml-2">Amount:</p>
                <span className="mr-2">₹{((sgst * subtotal) / 100).toFixed(2)}</span>
              </div>
            </div>
          </div>
          <div className="flex-1 ">
            <p className="border-b border-gray-300 text-center">Total Tax Amount</p>
            <span className="block ml-4 mt-2">₹{taxAmount.toFixed(2)}</span>
          </div>
        </div>

        <div className="border-x border-gray-300">
          <div>
            <span className=" ml-2">Tax Amount(in words):</span>
            <span className="text-lg font-semibold capitalize ml-2">INR {taxAmountInWords}</span>
          </div>
          <div className=" border-b border-gray-300">
            <span className="ml-2">Company&apos;s PAN:</span>
            <span className=" text-lg font-semibold ml-4">AADCI6770K</span>
          </div>
          <div className="flex flex-auto">
            <div className=" border border-gray-300">
              <span className="underline underline-offset-1 ml-2">Declaration:</span>
              <p className=" text-wrap mx-2">We declare that this invoice the actual price of the goods described and that all particulars are true and correct.</p>
            </div>
            <div className="border-b border-gray-300">
              <p className="text-sm font-semibold ml-2 mt-2">For {companyInfo.companyName}</p>
              <p className="text-sm font-semibold mt-4 text-end mr-2 pb-2">Authorized Signatory</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePrint;

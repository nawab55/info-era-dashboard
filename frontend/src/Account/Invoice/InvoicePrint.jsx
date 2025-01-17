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
      <h1 className="mb-6 text-xl font-bold text-center text-gray-800 uppercase">
        Tax Invoice
      </h1>
      <div className="grid grid-cols-12 border border-gray-300">
        {/* Company and Buyer Information */}
        <div className="col-span-7 p-2 space-y-3 border-r border-gray-200">
          <h2 className="mb-2 text-lg font-semibold text-gray-800">
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
          <div className="pt-2 border-t border-gray-300">
            <h2 className="mb-2 text-lg font-semibold text-gray-800">
              Buyer Details(Bill to)
            </h2>
            <p className="text-sm">Name: {buyerDetails.customerName || 'N/A'}</p>
            <p className="text-sm">Mobile: {buyerDetails.mobile || 'N/A'}</p>
            <p className="text-sm">Email: {buyerDetails.email || 'N/A'}</p>
            <p className="text-sm">GST NO: {buyerDetails.gstNo || 'N/A'}</p>
            <p className="text-sm">GST Name: {buyerDetails.gstName || 'N/A'}</p>
            <p className="text-sm">Address: {buyerDetails.address || 'N/A'}</p>
          </div>
        </div>
        {/* Invoice Information */}
        <div className="grid grid-cols-12 col-span-5">
          <div className="col-span-6 p-1 border border-gray-300">
            <p className="mb-1">Invoice No</p>
            <p className="text-sm font-semibold">{invoiceNo || 'N/A'}</p>
          </div>
          <div className="col-span-6 p-1 border border-gray-300">
            <p className="mb-1">Date</p>
            <p className="text-sm font-semibold">{date || 'N/A'}</p>
          </div>
          <div className="col-span-6 p-1 border border-gray-300">
            <p className="mb-1">Cashier</p>
            <p className="text-sm font-semibold">{cashierName || 'N/A'}</p>
          </div>
          <div className="col-span-6 p-1 border border-gray-300">
            <p className="mb-1">Delivery Note</p>
            <p className="text-sm font-semibold">{invoiceData.deliveryNote || 'N/A'}</p>
          </div>
          <div className="col-span-6 p-1 border border-gray-300">
            <p className="mb-1">Mode of Payment</p>
            <p className="text-sm font-semibold">{invoiceData.modeOfPayment || 'N/A'}</p>
          </div>
          <div className="col-span-6 p-1 border border-gray-300">
            <p className="mb-1">Reference No</p>
            <p className="text-sm font-semibold">{invoiceData.referenceNo || 'N/A'}</p>
          </div>
          <div className="col-span-6 p-1 border border-gray-300">
            <p className="mb-1">Buyer&apos;s Order No</p>
            <p className="text-sm font-semibold">{invoiceData.buyersOrderNo || 'N/A'}</p>
          </div>
          <div className="col-span-6 p-1 border border-gray-300">
            <p className="mb-1">Dispatched Doc No.</p>
            <p className="text-sm font-semibold">{invoiceData.dispatchedDocNo || 'N/A'}</p>
          </div>
          <div className="col-span-6 p-1 border border-gray-300">
            <p className="mb-1">Dispatched Through</p>
            <p className="text-sm font-semibold">{invoiceData.dispatchedThrough || 'N/A'}</p>
          </div>
          <div className="col-span-6 p-1 border border-gray-300">
            <p className="mb-1">Destination</p>
            <p className="text-sm font-semibold">{invoiceData.destination || 'N/A'}</p>
          </div>
          <div className="col-span-12 p-1 border border-gray-300">
            <p className="mb-1">Terms of Delivery</p>
            <p className="text-sm font-semibold">{invoiceData.termsOfDelivery || 'N/A'}</p>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="pb-2">
        <table className="w-full border border-collapse table-auto border-slate-500">
          <thead>
            <tr className="text-sm ">
              <th className="p-2 text-left border border-slate-600">SL No.</th>
              <th className="p-2 text-left border border-slate-600">Item</th>
              <th className="p-2 text-center border border-slate-600">HSN/SAC</th>
              <th className="p-2 text-center border border-slate-600">Quantity</th>
              <th className="p-2 text-center border border-slate-600">Rate</th>
              <th className="p-2 text-center border border-slate-600">Rate(incl. of Tax)</th>
              <th className="p-2 text-center border border-slate-600">Per</th>
              <th className="p-2 text-center border border-slate-600">Amount</th>
            </tr>
          </thead>
          <tbody>
            { items.map((item, index) => {
                const itemTaxPrice = (totalTaxRate * Number(item.price || 0)) / 100;
                const itemPriceWithTax = Number(item.price || 0) + itemTaxPrice;
                const itemTotalAmount = (Number(item.price || 0) * (item.qty || 0));
                return (
                  <tr key={item.id} className="">
                    <td className="p-2 border border-slate-600">{index + 1}</td>
                    <td className="p-2 border border-slate-600">{item.name || 'N/A'}</td>
                    <td className="p-2 text-center border border-slate-600">{item.hsn || 'N/A'}</td>
                    <td className="p-2 text-center border border-slate-600">{item.qty || 'N/A'} PIC</td>
                    <td className="p-2 text-center border border-slate-600">₹{item.price || 'N/A'}</td>
                    <td className="p-2 text-center border border-slate-600">₹{itemPriceWithTax.toFixed(2)}</td>
                    <td className="p-2 text-center border border-slate-600">PIC</td>
                    <td className="p-2 text-center border border-slate-600">₹{itemTotalAmount.toFixed(2)}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div className="py-2 border border-gray-300">
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
        <div className="flex justify-between pb-2 text-lg font-bold border border-gray-300">
          <span className="ml-4">Total:</span>
          <span className="mr-4">₹{total.toFixed(2)}</span>
        </div>

        <div className="flex justify-between pb-1 border border-gray-300 ">
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
            <p className="text-center border-b border-gray-300">HSN/SAC</p>
            {items && items.map((item, index) => (
          
              <span key={index} className="block ml-2 border-b">{index+1}. {item.hsn}</span>
            ))}
          </div>
          <div className="flex-1 border-r border-gray-300">
            <p className="text-center border-b border-gray-300">Taxable Value</p>
            <span className="block mt-2 text-center">₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex-1 border-r border-gray-300">
            <p className="text-center border-b border-gray-300">CGST</p>
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
            <p className="text-center border-b border-gray-300">SGST/UTGST</p>
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
            <p className="text-center border-b border-gray-300">Total Tax Amount</p>
            <span className="block mt-2 ml-4">₹{taxAmount.toFixed(2)}</span>
          </div>
        </div>

        <div className="border-gray-300 border-x">
          <div>
            <span className="ml-2 ">Tax Amount(in words):</span>
            <span className="ml-2 text-lg font-semibold capitalize">INR {taxAmountInWords}</span>
          </div>
          <div className="border-b border-gray-300 ">
            <span className="ml-2">Company&apos;s PAN:</span>
            <span className="ml-4 text-lg font-semibold ">AADCI6770K</span>
          </div>
          <div className="flex flex-auto">
            <div className="border border-gray-300 ">
              <span className="ml-2 underline underline-offset-1">Declaration:</span>
              <p className="mx-2  text-wrap">We declare that this invoice the actual price of the goods described and that all particulars are true and correct.</p>
            </div>
            <div className="border-b border-gray-300">
              <p className="mt-2 ml-2 text-sm font-semibold">For {companyInfo.companyName}</p>
              <p className="pb-2 mt-4 mr-2 text-sm font-semibold text-end">Authorized Signatory</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePrint;

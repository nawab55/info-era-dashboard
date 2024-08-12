/* eslint-disable react/prop-types */
import { useRef } from "react";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  Button,
  IconButton,
} from "@material-tailwind/react";
import ReactToPrint from "react-to-print";
import InvoicePrintForm from "./InvoicePrint";

const InvoiceModal = ({ invoiceData, onClose }) => {
  const componentRef = useRef(null);
  console.log(invoiceData);

  return (
    <Dialog
      open={true}
      handler={onClose}
      size="lg"
      className=" bg-white rounded-lg shadow-lg max-h-screen overflow-y-auto"
      aria-modal="true"
      role="dialog"
    >
      <div className="relative">
        <IconButton
          variant="text"
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none ml-6"
          onClick={onClose}
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </IconButton>
        <h2 className="text-3xl font-bold mb-4 text-center text-gray-800">
          Invoice Preview
        </h2>
      </div>
      <DialogBody
        divider
        className="p-2 max-h-[calc(100vh-200px)] overflow-y-auto"
      >
        <div className="printableArea" ref={componentRef}>
          <InvoicePrintForm invoiceData={invoiceData} />
        </div>
      </DialogBody>
      <DialogFooter className="justify-center">
        <ReactToPrint
          documentTitle={`Invoice-${invoiceData.invoiceNo}`}
          trigger={() => (
            <Button color="blue" variant="filled">
              Print
            </Button>
          )}
          content={() => componentRef.current}
        />
      </DialogFooter>
    </Dialog>
  );
};

export default InvoiceModal;

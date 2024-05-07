import React from 'react';
import QRCode from 'react-qr-code';

const GooglePayQRCode = ({ upiID, amount,onClose }) => {
  // Construct the Google Pay link with the specified UPI ID and amount
  const googlePayLink = `upi://pay?pa=${encodeURIComponent(upiID)}&pn=RecipientName&mc=0000&tid=1234567890&tr=1234567890&tn=Description&am=${amount}&cu=INR`;

  const formattedAmount = amount.toLocaleString();

  return (
    <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-md flex flex-col relative">
        <button onClick={onClose} className="absolute top-0 right-0 p-3 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="pt-3">
          <QRCode value={googlePayLink} />
          <span className='flex justify-center mx-auto mt-2 font-semibold text-xl'>₹ {formattedAmount}</span>
          <span className='flex justify-center mx-auto mt-3 font-semibold text-xl text-red-600'>Scan to Pay!</span>
        </div>
      </div>
    </div>
  );
};

export default GooglePayQRCode;

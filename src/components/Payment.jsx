import React, { useState } from "react";

const Payment = () => {
  const [method, setMethod] = useState("");

  const handlePayment = () => {
    alert(`Payment successful via ${method}`);
  };

  return (
    <div className="payment-container">
      <h2>Choose Payment Method</h2>

      <select onChange={(e) => setMethod(e.target.value)}>
        <option value="">Select Method</option>
        <option value="UPI">UPI</option>
        <option value="Card">Credit/Debit Card</option>
        <option value="Cash">Cash on Delivery</option>
      </select>

      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default Payment;

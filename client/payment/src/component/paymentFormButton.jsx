import React, { useState } from 'react';

const OrangeMoneyPaymentButton = ({ onPaymentSuccess, onPaymentError }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleOrangeMoneyPayment = async () => {
    setIsProcessing(true);

    try {
      // Implement your Orange Money payment logic here
      await makeOrangeMoneyPayment();
      setPaymentSuccess(true);
      onPaymentSuccess();
    } catch (error) {
      onPaymentError(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const makeOrangeMoneyPayment = () => {
    // Implement your actual Orange Money payment logic here
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  };

  return (
    <button
      type="button"
      className={`orange-money-pay ${paymentSuccess ? 'payment-success' : ''}`}
      onClick={handleOrangeMoneyPayment}
      disabled={isProcessing}
    >
      {paymentSuccess ? (
        <div>
          <i className="icon-orange-money-success"></i>
          <span>Payment completed!</span>
        </div>
      ) : (
        <div>
          Pay with Orange Money
          <i className="icon-orange-money"></i>
        </div>
      )}
    </button>
  );
};

export default OrangeMoneyPaymentButton;
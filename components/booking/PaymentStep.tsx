'use client';

import React, { useState } from 'react';
import { AlertDialogAction } from '@/components/ui/alert-dialog';

interface PaymentStepProps {
  onPaymentComplete: () => void;
}

export default function PaymentStep({ onPaymentComplete }: PaymentStepProps) {
  const [cardNumber, setCardNumber] = useState('');
  const [exp, setExp] = useState('');
  const [cvc, setCvc] = useState('');

  const handlePayment = () => {
    // TODO: Integrate real payment (Stripe, PayPal, etc.)
    if (cardNumber && exp && cvc) {
      onPaymentComplete();
    } else {
      alert('Please fill in all payment fields');
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Step 4: Payment</h3>
      <p className="text-sm text-muted-foreground">
        Provide your payment details to confirm your booking.
      </p>
      <div className="space-y-2">
        <input
          type="text"
          placeholder="Card Number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          className="w-full p-2 rounded border border-border bg-background text-foreground"
        />
        <input
          type="text"
          placeholder="MM/YY"
          value={exp}
          onChange={(e) => setExp(e.target.value)}
          className="w-full p-2 rounded border border-border bg-background text-foreground"
        />
        <input
          type="text"
          placeholder="CVC"
          value={cvc}
          onChange={(e) => setCvc(e.target.value)}
          className="w-full p-2 rounded border border-border bg-background text-foreground"
        />
      </div>

      <AlertDialogAction
        onClick={handlePayment}
        className="bg-primary hover:bg-primary/90"
      >
        Pay Now
      </AlertDialogAction>
    </div>
  );
}

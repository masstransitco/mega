'use client';

import React, { useState } from 'react';
import { AlertDialogAction } from '@/components/ui/alert-dialog';

interface IDVerificationStepProps {
  onVerified: () => void;
}

export default function IDVerificationStep({ onVerified }: IDVerificationStepProps) {
  const [hkid, setHkid] = useState('');
  const [license, setLicense] = useState('');

  const handleVerify = () => {
    // TODO: Real verification logic
    if (hkid && license) {
      onVerified();
    } else {
      alert('Please provide both HKID and Driver License details');
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Step 3: Verify Your Identity</h3>
      <p className="text-sm text-muted-foreground">
        Please enter your HKID and Driver’s License details for verification.
      </p>
      <div className="space-y-2">
        <input
          type="text"
          value={hkid}
          onChange={(e) => setHkid(e.target.value)}
          placeholder="HKID Number"
          className="w-full p-2 rounded border border-border bg-background text-foreground"
        />
        <input
          type="text"
          value={license}
          onChange={(e) => setLicense(e.target.value)}
          placeholder="Driver’s License Number"
          className="w-full p-2 rounded border border-border bg-background text-foreground"
        />
      </div>

      <AlertDialogAction
        onClick={handleVerify}
        className="bg-primary hover:bg-primary/90"
      >
        Verify ID
      </AlertDialogAction>
    </div>
  );
}

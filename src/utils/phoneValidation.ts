export interface PhoneValidationResult {
  isValid: boolean;
  detectedProvider: 'MTN Mobile Money' | 'Airtel Money' | 'Unknown';
  errorMessage?: string;
  formattedPhone?: string;
}

export const validateUgandanPhone = (
  phone: string,
  selectedProvider?: 'MTN Mobile Money' | 'Airtel Money'
): PhoneValidationResult => {
  if (!phone || !phone.trim()) {
    return {
      isValid: false,
      detectedProvider: 'Unknown',
      errorMessage: 'Please enter a valid Mobile Money phone number.'
    };
  }

  const clean = phone.trim().replace(/[\s\-\(\)]/g, '');
  
  let digits = clean;
  if (digits.startsWith('+256')) {
    digits = '0' + digits.slice(4);
  } else if (digits.startsWith('256')) {
    digits = '0' + digits.slice(3);
  }

  // Must be 10 digits starting with 0
  if (!/^0\d{9}$/.test(digits)) {
    return {
      isValid: false,
      detectedProvider: 'Unknown',
      errorMessage: 'Invalid phone format. Please enter a 10-digit Ugandan mobile number (e.g. 0771234567 or 0751234567).'
    };
  }

  const mtnPrefixes = ['077', '078', '076', '039'];
  const airtelPrefixes = ['070', '075', '074'];

  const prefix3 = digits.substring(0, 3);
  let detectedProvider: 'MTN Mobile Money' | 'Airtel Money' | 'Unknown' = 'Unknown';

  if (mtnPrefixes.includes(prefix3)) {
    detectedProvider = 'MTN Mobile Money';
  } else if (airtelPrefixes.includes(prefix3)) {
    detectedProvider = 'Airtel Money';
  } else {
    return {
      isValid: false,
      detectedProvider: 'Unknown',
      errorMessage: `Unrecognized network prefix (${prefix3}). Valid MTN prefixes are 077, 078, 076, 039. Valid Airtel prefixes are 070, 075, 074.`
    };
  }

  if (selectedProvider && selectedProvider !== detectedProvider) {
    if (selectedProvider === 'MTN Mobile Money' && detectedProvider === 'Airtel Money') {
      return {
        isValid: false,
        detectedProvider,
        errorMessage: `The phone number entered (${digits}) is an Airtel Money number! Please switch selected network to Airtel Money or enter an MTN Uganda number.`
      };
    }
    if (selectedProvider === 'Airtel Money' && detectedProvider === 'MTN Mobile Money') {
      return {
        isValid: false,
        detectedProvider,
        errorMessage: `The phone number entered (${digits}) is an MTN Mobile Money number! Please switch selected network to MTN Mobile Money or enter an Airtel Uganda number.`
      };
    }
  }

  const formattedPhone = `+256${digits.slice(1)}`;

  return {
    isValid: true,
    detectedProvider,
    formattedPhone
  };
};

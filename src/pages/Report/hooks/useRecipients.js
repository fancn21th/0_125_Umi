import { useState, useEffect } from 'react';
import { queryRecipients } from '@/services/recipients';

export const useRecipients = function(initialValue = []) {
  const [recipients, setRecipients] = useState(initialValue);

  useEffect(() => {
    queryRecipients().then(({ data }) => {
      setRecipients(data);
    });
  }, []);

  return { recipients };
};

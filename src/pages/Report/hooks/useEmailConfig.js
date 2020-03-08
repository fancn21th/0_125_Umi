import { useState, useEffect } from 'react';
import { queryEmailSetting } from '@/services/emailConfig';

export const useEmailConfig = function(category = 'human', mode = 'day') {
  const [emailConfig, setEmailConfig] = useState({});
  const [isEmailConfigReady, setIsEmailConfigReady] = useState(false);

  useEffect(() => {
    reload();
  }, [category, mode]);

  function reload() {
    setIsEmailConfigReady(false);
    queryEmailSetting({
      category,
      mode,
    }).then(response => {
      setEmailConfig(response);
      setIsEmailConfigReady(true);
    });
  }

  return { emailConfig, reload, isEmailConfigReady };
};

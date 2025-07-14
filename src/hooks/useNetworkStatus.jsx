import { useState, useEffect } from 'react';

const useNetworkStatus = () => {
  const [networkType, setNetworkType] = useState(null);

  useEffect(() => {
    const connection = navigator.connection || navigator.webkitConnection || navigator.mozConnection;

    if (connection) {
      const updateStatus = () => setNetworkType(connection.effectiveType);

      setNetworkType(connection.effectiveType);
      connection.addEventListener('change', updateStatus);

      return () => connection.removeEventListener('change', updateStatus);
    }
  }, []);

  return networkType;
};

export default useNetworkStatus;

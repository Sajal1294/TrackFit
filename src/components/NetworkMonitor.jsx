import { useEffect, useState } from "react";

export default function NetworkMonitor({ onStatusChange }) {
  const [networkType, setNetworkType] = useState("unknown");

  useEffect(() => {
    const connection = navigator.connection;
    if (connection) {
      const update = () => {
        setNetworkType(connection.effectiveType);
        onStatusChange?.(connection.effectiveType);
      };

      connection.addEventListener("change", update);
      update();

      return () => connection.removeEventListener("change", update);
    }
  }, []);

  return <p>Network: {networkType}</p>;
}

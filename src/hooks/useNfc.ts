import { NFC } from "@awesome-cordova-plugins/nfc";
import { useEffect, useState } from "react";

function useNfc() {
  const [nfcEnabled, setNfcENabled] = useState<boolean>(true);

  useEffect(() => {
    setInterval(() => {
      checkNFCAvailability();
    }, 5000);
  });

  const checkNFCAvailability = () => {
    NFC.enabled()
      .then(() => {
        setNfcENabled(true);
      })
      .catch(() => {
        setNfcENabled(false);
      });
  };

  return {nfcEnabled};
}

export default useNfc;

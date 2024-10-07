import { IonSpinner } from "@ionic/react";
import { Dispatch, SetStateAction, useEffect } from "react";
import { Button } from "react-bootstrap";
import { encryptMessage } from "../../../../services/encryption/encryption";
import {
  flashNtag,
  stopFlashing,
} from "../../../../services/flashing/flashing.service";

interface FlashingModalProps {}

interface FlashingModalProps {
  isLoadingFlashing: boolean;
  setLoadingFlashing: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string>>;
  setPk: Dispatch<SetStateAction<string>>;
  setMessage: Dispatch<SetStateAction<string>>;
  message: string;
  pk: string;
}

function FlashingModal({
  isLoadingFlashing,
  setLoadingFlashing,
  setError,
  setPk,
  setMessage,
  message,
  pk,
}: FlashingModalProps) {
  const closeHandler: () => void = () => {
    setLoadingFlashing(false);
    cleanFields();
    stopFlashing();
  };

  const cleanFields = () => {
    setPk("");
    setMessage("");
  };

  const flashHandler = () => {
    let encryptedMessageObject;
    try {
      encryptedMessageObject = encryptMessage(message, pk);
    } catch (error) {
      setError((error as Error).message);
      setLoadingFlashing(false);
      return;
    }

    const encryptedMessage = encryptedMessageObject.toString();

    flashNtag(encryptedMessage)
      .catch((error) => {
        setError((error as Error).message);
      })
      .finally(() => {
        setLoadingFlashing(false);
        cleanFields();
      });
  };

  useEffect(() => {
    flashHandler();
  });

  return (
    isLoadingFlashing && (
      <div data-testid="flashing__loading-modal">
        <div style={{ alignContent: "center", textAlign: "center" }}>
          <>
            <IonSpinner data-testid="flashing__loading-icon"></IonSpinner>
            <p>Flashing, get close to your NTAG</p>

            <Button
              onClick={() => {
                closeHandler();
              }}
            >
              Close
            </Button>
          </>
        </div>
      </div>
    )
  );
}

export default FlashingModal;

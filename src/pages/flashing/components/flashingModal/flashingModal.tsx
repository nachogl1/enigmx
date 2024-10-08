import { IonButton, IonSpinner } from "@ionic/react";
import { Dispatch, SetStateAction, useEffect } from "react";
import { Button } from "react-bootstrap";
import { encryptMessage } from "../../../../services/encryption/encryption";
import {
  flashNtag,
  stopFlashing,
} from "../../../../services/flashing/flashing.service";

const NO_CONTENT_MESSAGE = "no elements in sequence";

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
        const stringError = (error as Error).message;

        if (stringError.toLowerCase() === NO_CONTENT_MESSAGE) {
          return;
        }

        setError(stringError);
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

            <IonButton fill="outline"
              onClick={() => {
                closeHandler();
              }}
            >
              Close
            </IonButton>
          </>
        </div>
      </div>
    )
  );
}

export default FlashingModal;

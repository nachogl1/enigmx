import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonSpinner,
  IonToolbar
} from "@ionic/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  closeReadingSession,
  readFromNtagV2,
} from "../../../../services/readingV2/readingV2.service";
import DecryptDialog from "../decryptDialog/decryptDialog";

interface ReadingModalProps {
  isReading: boolean;
  setReading: Dispatch<SetStateAction<boolean>>;
}

function ReadingModal({ isReading, setReading }: ReadingModalProps) {
  const [encryptedReadResult, setEncryptedReadResult] = useState<string>("");
  const [error, setError] = useState<string>("");

  const readHandler = async () => {
    setError("");

    readFromNtagV2()
      .then((readingResult) => {
        setEncryptedReadResult(readingResult);
      })
      .catch((error) => {
        setError((error as Error).message);
      });
  };

  useEffect(() => {
    readHandler();
  }, []);

  return (
    <div data-testid="reading__loading-modal">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton
              onClick={() => {
                setReading(false);
                closeReadingSession();
              }}
            >
              Close
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div style={{ alignContent: "center", textAlign: "center" }}>
          {!encryptedReadResult && !error && (
            <>
              <IonSpinner data-testid="reading__loading-icon"></IonSpinner>
              <p>Reading, get close to your NTAG</p>
            </>
          )}

          {encryptedReadResult && !error && (
            <DecryptDialog
              setError={setError}
              encryptedPayload={encryptedReadResult}
            ></DecryptDialog>
          )}

          {error && (
            <div
              className="alert alert-danger mt-2"
              data-testid="reading__warning"
              role="alert"
            >
              {error}
            </div>
          )}
        </div>
      </IonContent>
    </div>
  );
}

export default ReadingModal;

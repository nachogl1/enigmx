import { IonButton, IonSpinner } from '@ionic/react';
import React, { useState } from 'react';
import { encryptMessage } from '../../services/encryption/encryption';
import { flashNtag } from '../../services/flashing/flashing.service';

const FlashingPage: React.FC = () => {

  const [message, setMessage] = useState<string>("");
  const [pk, setPk] = useState<string>("");
  const [loading, setLoading] = useState<boolean>();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const flashHandler = () => {
    setErrorMessage("")
    setLoading(true);

    let encryptedMessageObject;
    try {
      encryptedMessageObject = encryptMessage(message, pk)
    } catch (error) {
      setErrorMessage((error as Error).message);
      setLoading(false);
      return;
    }

    const encryptedMessage = JSON.stringify(encryptedMessageObject);

    flashNtag(encryptedMessage)
      .catch((error) => {
        setErrorMessage(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", alignContent: "center", justifyContent: "center", alignItems: "center" }}>

      {!loading && <>
        <div className="input-group mb-3"
          style={{ width: "80%", marginBottom: "5vh" }}>
          <input data-testid="message-input" type="password" className="form-control" placeholder="Message" onChange={(e) => {
            setMessage(e.target.value as string)
          }
          }></input>
        </div>

        <div className="input-group mb-3"
          style={{ width: "80%", marginBottom: "5vh" }}>
          <input data-testid="pk-input" type="password" className="form-control" placeholder="Private Key" onChange={(e) => {
            setPk(e.target.value as string)
          }
          }></input>
        </div>


        {(message && pk) && <IonButton onClick={() => { flashHandler(); }} fill="outline">FLASH</IonButton>}
        {(!message || !pk) && <IonButton disabled fill="outline">FLASH</IonButton>}

        {errorMessage &&
          <div className="alert alert-danger mt-2" data-testid="error__message" role="alert">
            {errorMessage}
          </div>}

      </>}

      {loading &&
        <IonSpinner data-testid="flashing__loading"></IonSpinner>
      }
    </div>
  );
};

export default FlashingPage;

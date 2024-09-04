import { IonButton, IonSpinner } from '@ionic/react';
import React, { useState } from 'react';
import { flashNtag } from '../../services/flashing/flashing.service';

const FlashingPage: React.FC = () => {

  const [message, setMessage] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>();


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
            setPassword(e.target.value as string)
          }
          }></input>
        </div>


        {(message && password) && <IonButton onClick={() => { 
          flashNtag(message);
          setLoading(true);
           }} fill="outline">FLASH</IonButton>}
        {(!message || !password) && <IonButton disabled fill="outline">FLASH</IonButton>}
      </>}

      {loading &&
        <IonSpinner data-testid="flashing__loading"></IonSpinner>
      }
    </div>
  );
};

export default FlashingPage;

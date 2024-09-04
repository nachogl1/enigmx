import { IonButton } from '@ionic/react';
import React, { useState } from 'react';
import { flashNtag } from '../../services/flashing/flashing.service';

const FlashingPage: React.FC = () => {

  const [message, setMessage] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const flashingHandler = (message: string, pk:string)=>{

  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", alignContent: "center", justifyContent: "center", alignItems: "center" }}>

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


      {(message && password) && <IonButton onClick={() => { flashNtag(message) }} fill="outline">FLASH</IonButton>}
      {(!message || !password) && <IonButton disabled fill="outline">FLASH</IonButton>}
    </div>
  );
};

export default FlashingPage;

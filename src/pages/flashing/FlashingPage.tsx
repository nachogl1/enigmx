import { IonButton, IonInput } from '@ionic/react';
import React from 'react';

const FlashingPage: React.FC = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", alignContent: "center", justifyContent: "center", alignItems: "center" }}>
      <IonInput
        data-testid="message-input"
        style={{ width: "80%", marginBottom: "5vh" }}
        type="password"
        fill="solid"
        label="Message"
        labelPlacement="floating"
        helperText="Cannot be empty"
        errorText="Cannot be empty"
      ></IonInput>

      <IonInput
        data-testid="pk-input"
        style={{ width: "80%", marginBottom: "5vh" }}
        type="password"
        fill="solid"
        label="Private Key"
        labelPlacement="floating"
        helperText="Cannot be empty"
        errorText="Cannot be empty"
      ></IonInput>

      <IonButton onClick={() => { }} fill="outline">FLASH</IonButton>
    </div>
  );
};

export default FlashingPage;

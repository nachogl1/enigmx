import { IonButton, IonButtons, IonContent, IonHeader, IonModal, IonSpinner, IonTitle, IonToolbar } from '@ionic/react';
import React, { useState } from 'react';

const ReadingPage: React.FC = () => {
  const [isReading, setReading] = useState(false);

  return (
    <div style={{ height: "100%", alignContent: "center", textAlign: "center" }}>

      {!isReading && <IonButton onClick={() => setReading(true)} fill="outline">START READING</IonButton>}

      <IonModal data-testid="reading__loading-icon" isOpen={isReading}>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="end">
              <IonButton onClick={() => setReading(false)}>Close</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <p>
            Loading Icon for Reading here
          </p>
        </IonContent>
      </IonModal>

    </div>
  );
};

export default ReadingPage;

import { IonButton } from '@ionic/react';
import React, { useState } from 'react';
import ReadingModal from './components/ReadingModal/ReadingModal';

const ReadingPage: React.FC = () => {
  const [isReading, setReading] = useState(false);

  return (
    <div style={{ height: "100%", alignContent: "center", textAlign: "center" }}>

      {!isReading && <IonButton onClick={() => setReading(true)} fill="outline">START READING</IonButton>}
      <ReadingModal isReading={isReading} setReading={setReading}></ReadingModal>

    </div>
  );
};

export default ReadingPage;

import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonModal,
    IonSpinner,
    IonToolbar,
} from "@ionic/react";
import { Dispatch, SetStateAction } from "react";

interface FlashingModalProps {}

interface FlashingModalProps {
  isFlashing: boolean;
  setFlashing: Dispatch<SetStateAction<boolean>>;
}

function FlashingModal({ isFlashing, setFlashing }: FlashingModalProps) {
  return (
    <IonModal data-testid="flashing__loading-modal" isOpen={isFlashing}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
            <IonButton onClick={() => setFlashing(false)}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div style={{ alignContent: "center", textAlign: "center" }}>
          <>
            <IonSpinner data-testid="flashing__loading-icon"></IonSpinner>
            <p>Flashing, get close to your NTAG</p>
          </>
        </div>
      </IonContent>
    </IonModal>
  );
}

export default FlashingModal;

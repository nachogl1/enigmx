import { IonButton, IonButtons, IonContent, IonHeader, IonModal, IonSpinner, IonToolbar } from "@ionic/react";
import { Dispatch, SetStateAction } from "react";

interface ReadingModalProps {
    isReading: boolean;
    setReading: Dispatch<SetStateAction<boolean>>;
}

const ReadingModal = ({ isReading, setReading }: ReadingModalProps) => (
    <IonModal data-testid="reading__loading-modal"  isOpen={isReading}>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="end">
                    <IonButton onClick={() => setReading(false)}>Close</IonButton>
                </IonButtons>
            </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
            <div style={{ alignContent: "center", textAlign: "center" }} >
                <IonSpinner data-testid="reading__loading-icon"></IonSpinner>
                <p>Reading, get closer to your NTAG</p>
            </div>
        </IonContent>
    </IonModal>
);

export default ReadingModal;

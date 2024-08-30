import { IonButton, IonButtons, IonContent, IonHeader, IonModal, IonSpinner, IonToolbar } from "@ionic/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TagEvent } from "react-native-nfc-manager";
import { readFromNtag } from "../../../../services/reading/reading.service";

interface ReadingModalProps {
    isReading: boolean;
    setReading: Dispatch<SetStateAction<boolean>>;
}

function ReadingModal({ isReading, setReading }: ReadingModalProps) {

    const [readResult, setReadResult] = useState<TagEvent | null>(null);

    useEffect(() => {
        const read = async () => {
            const readingResult = await readFromNtag();
            setReadResult(readingResult);
        }
        read();
    }, []);

    return (

        <IonModal data-testid="reading__loading-modal" isOpen={isReading}>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="end">
                        <IonButton onClick={() => setReading(false)}>Close</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <div style={{ alignContent: "center", textAlign: "center" }}>
                    <IonSpinner data-testid="reading__loading-icon"></IonSpinner>
                    <p>Reading, get close to your NTAG</p>
                    <p>{JSON.stringify(readResult)}</p>
                </div>
            </IonContent>
        </IonModal>
    );
}

export default ReadingModal;

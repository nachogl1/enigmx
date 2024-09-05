import { NfcTag } from "@awesome-cordova-plugins/nfc";
import { IonButton, IonButtons, IonContent, IonHeader, IonModal, IonSpinner, IonToolbar } from "@ionic/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { readFromNtagV2 } from "../../../../services/readingV2/readingV2.service";

interface ReadingModalProps {
    isReading: boolean;
    setReading: Dispatch<SetStateAction<boolean>>;
}

function ReadingModal({ isReading, setReading }: ReadingModalProps) {

    const [readResult, setReadResult] = useState<NfcTag | null>(null);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const read = async () => {
            setError("");
            const readingResult = readFromNtagV2()
                .then(
                    (readingResult) => {
                        setReadResult(readingResult);
                    }
                )
                .catch((error) => {
                    setError(error);
                });
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
                    {(!readResult && !error) &&
                        <>
                            <IonSpinner data-testid="reading__loading-icon"></IonSpinner>
                            <p>Reading, get close to your NTAG</p>
                        </>

                    }

                    {(readResult && !error) && <p>{JSON.stringify(readResult)}</p>}

                    {error &&
                        <div className="alert alert-danger mt-2" data-testid="reading__warning" role="alert">
                            {error}
                        </div>}

                </div>
            </IonContent>
        </IonModal>
    );
}

export default ReadingModal;

import { IonButton, IonButtons, IonContent, IonHeader, IonModal, IonSpinner, IonToolbar } from "@ionic/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { decryptMessage } from "../../../../services/encryption/encryption";
import { readFromNtagV2 } from "../../../../services/readingV2/readingV2.service";

interface ReadingModalProps {
    isReading: boolean;
    setReading: Dispatch<SetStateAction<boolean>>;
}

function ReadingModal({ isReading, setReading }: ReadingModalProps) {

    const [readResult, setReadResult] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [pk, setPk] = useState<string>("");
    const [result, setResult] = useState<string>("");

    const decrypt = () => {
        const f = decryptMessage(readResult, pk);
        setResult(f);
    };

    useEffect(() => {
        const read = async () => {
            setError("");

            readFromNtagV2()
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

                    {(readResult && !error) && <div>{
                        <div className="input-group mb-3"
                            style={{ width: "80%", marginBottom: "5vh" }}>
                            <input data-testid="pk-input" type="password" className="form-control" placeholder="Message" onChange={(e) => {
                                setPk(e.target.value as string)
                            }
                            }></input>
                            <IonButton onClick={() => { decrypt(); }} fill="outline">Decrypt</IonButton>
                            {result && <p>{result}</p>}
                        </div>

                    }</div>}

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

import { IonButton } from "@ionic/react";
import { Dispatch, SetStateAction, useState } from "react";
import { decryptMessage } from "../../../../services/encryption/encryption";

interface DecryptDialogProps {
  encryptedPayload: string;
  setError: Dispatch<SetStateAction<string>>;
}

function DecryptDialog({ encryptedPayload, setError }: DecryptDialogProps) {
  const [pk, setPk] = useState<string>("");
  const [decryptedMessage, setDecryptedMessage] = useState<string>("");

  const decryptHandler = async () => {
    let decryptedMessage;
    try {
      decryptedMessage = decryptMessage(encryptedPayload, pk);
    } catch (error) {
      setError((error as Error).message);
    }
    setDecryptedMessage(decryptedMessage);
  };

  return (
    <div
      data-testid="readingModal__decryptDialog"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
        margin: "5%",
      }}
    >
      <input
        data-testid="pk__input"
        type="password"
        className="form-control mb-3"
        placeholder="Private Key"
        onChange={(e) => {
          setPk(e.target.value as string);
        }}
      ></input>

      <IonButton
        data-testid="decypt__button"
        onClick={() => {
          decryptHandler();
        }}
        fill="outline"
      >
        Decrypt
      </IonButton>

      {decryptedMessage && (
        <p style={{ userSelect: "text", marginTop: "10%" }}>
          {decryptedMessage}
        </p>
      )}
    </div>
  );
}

export default DecryptDialog;

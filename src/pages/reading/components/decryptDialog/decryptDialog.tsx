import { IonButton } from "@ionic/react";
import { useState } from "react";
import { decryptMessage } from "../../../../services/encryption/encryption";

interface DecryptDialogProps {
  encryptedPayload: string;
}

function DecryptDialog({ encryptedPayload }: DecryptDialogProps) {
  const [pk, setPk] = useState<string>("");
  const [decryptedMessage, setDecryptedMessage] = useState<string>("");

  const decryptHandler = () => {
    setDecryptedMessage(decryptMessage(encryptedPayload, pk));
  };

  return (
    <div
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
        data-testid="pk-input"
        type="password"
        className="form-control mb-3"
        placeholder="Private Key"
        onChange={(e) => {
          setPk(e.target.value as string);
        }}
      ></input>

      <IonButton
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

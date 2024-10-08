import {
  IonApp,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonRouterOutlet,
  IonSpinner,
  IonTitle,
  IonToolbar,
  isPlatform,
  setupIonicReact,
} from "@ionic/react";
import React, { useEffect } from "react";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";

/* Theme variables */
import "./theme/variables.css";

// Bootstrap
import { NFC } from "@awesome-cordova-plugins/nfc";
import { IonReactRouter } from "@ionic/react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route } from "react-router";
import SideMenu from "./components/side-menu/sideMenu";
import useNfc from "./hooks/useNfc";
import FlashingPage from "./pages/flashing/FlashingPage";
import ReadingPage from "./pages/reading/ReadingPage";

setupIonicReact();

const applicationTitle = "ENIGMX";

const App: React.FC = () => {
  const { nfcEnabled } = useNfc();

  useEffect(() => {
    if (process.env.NODE_ENV !== "production" && !isPlatform("hybrid")) {
      return;
    }
  });

  const openNfcSettingsHandler = async () => {
    await NFC.showSettings();
  };

  return (
    <IonApp>
      {nfcEnabled && (
        <>
          <SideMenu></SideMenu>
          <IonPage id="main-content">
            <IonHeader>
              <IonToolbar>
                <IonButtons slot="start">
                  <IonMenuButton data-testid="sideMenu__button"></IonMenuButton>
                </IonButtons>
                <IonTitle>{applicationTitle}</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
              <IonReactRouter>
                <IonRouterOutlet>
                  <Route exact path="/flashing">
                    <FlashingPage />
                  </Route>
                  <Route exact path="/reading">
                    <ReadingPage />
                  </Route>
                  <Route exact path="/">
                    <ReadingPage />
                  </Route>
                </IonRouterOutlet>
              </IonReactRouter>
            </IonContent>
          </IonPage>
        </>
      )}

      {!nfcEnabled && (
        <div
          className="alert alert-danger m-5"
          data-testid="nfc__warning"
          role="alert"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            NFC not enabled in this device, waiting to be turned on,
            <a
              data-testid="clickable-nfc-warning"
              style={{ color: "blue" }}
              onClick={() => openNfcSettingsHandler()}
            >
              click here to go to settings...
            </a>
          </div>
          <div>
            <IonSpinner></IonSpinner>
          </div>
        </div>
      )}
    </IonApp>
  );
};

export default App;

import {IonButtons, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonRouterOutlet} from '@ionic/react';
import React from 'react';
import {IonContent, IonHeader, IonMenu, IonTitle, IonToolbar} from '@ionic/react';
import {IonReactRouter} from "@ionic/react-router";
import {Route} from "react-router-dom";
import FlashingPage from "../../pages/FlashingPage";
import ReadingPage from "../../pages/ReadingPage";

const applicationTitle = "ENIGMX";

const SideMenu: React.FC = () => (
        <>
            <IonMenu contentId="main-content">
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Menu</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    <IonList>
                        <IonItem routerLink="/flashing">
                            <IonLabel>Flash</IonLabel>
                        </IonItem>
                        <IonItem routerLink="/reading">
                            <IonLabel>Read</IonLabel>
                        </IonItem>
                    </IonList>
                </IonContent>
            </IonMenu>
            <IonPage id="main-content">
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonMenuButton></IonMenuButton>
                        </IonButtons>
                        <IonTitle>{applicationTitle}</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    <IonReactRouter>
                        <IonRouterOutlet>
                            <Route exact path="/flashing">
                                <FlashingPage/>
                            </Route>
                            <Route exact path="/reading">
                                <ReadingPage/>
                            </Route>
                            <Route exact path="/">
                                <ReadingPage/>
                            </Route>
                        </IonRouterOutlet>
                    </IonReactRouter>
                </IonContent>
            </IonPage>
        </>
    )
;

export default SideMenu;

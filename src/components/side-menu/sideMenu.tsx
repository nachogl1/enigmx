import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonMenu, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';


const SideMenu: React.FC = () => (
    <IonMenu contentId="main-content">
        <IonHeader>
            <IonToolbar>
                <IonTitle>Menu</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
            <IonList>
                <IonItem data-testid="sideMenu__button__flash" routerLink="/flashing">
                    <IonLabel>Flash</IonLabel>
                </IonItem>
                <IonItem routerLink="/reading">
                    <IonLabel>Read</IonLabel>
                </IonItem>
            </IonList>
        </IonContent>
    </IonMenu>
);

export default SideMenu;

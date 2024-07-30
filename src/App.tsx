import {Route} from 'react-router-dom';
import {IonApp, IonItem, IonLabel, IonList, IonRouterOutlet, setupIonicReact} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import React from 'react';
import {IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar} from '@ionic/react';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import Home2 from './pages/ReadingPage';
import FlashingPage from './pages/FlashingPage';
import ReadingPage from './pages/ReadingPage';

setupIonicReact();

const App: React.FC = () => (
    <IonApp>
        <IonMenu contentId="main-content">
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Menu Content</IonTitle>
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
                    <IonTitle>ENIGMX</IonTitle>
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
    </IonApp>
);

export default App;

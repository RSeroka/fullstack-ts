// import React from 'react';

import './App.css';

import { Link, Route, Routes } from "react-router-dom";
import BlackjackComp from './BlackJack/components/BlackjackComp';
import Navbar from './NavBar/NavBar';
import Resume from "./Resume/Resume";
import Sudoku from './Sudoku/Sudoku';

import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import React, { ReactNode } from 'react';

type AppProperties = {

};

type AppState = {
  newVersionAvailable: boolean;
  waitingServiceWorker: ServiceWorker | null;
};

class App extends React.Component<AppProperties, AppState> {

  constructor(props: AppProperties) {
    super(props);

    this.state = {
      newVersionAvailable: false,
      waitingServiceWorker: null
    }
  }


  private onApplicationUpdateOnServerDetected(registration: ServiceWorkerRegistration)  {
    console.error("Detected an update web application on server, popping up toast");
    this.setState({newVersionAvailable: true, waitingServiceWorker: registration.waiting});
  }

  private onReloadRequested() {
    // recipe for application update recognition based upon 
    // https://dev.to/daniellycosta/showing-new-version-available-notification-on-create-react-app-pwas-3jc9
    const { waitingServiceWorker } = this.state;
    waitingServiceWorker && waitingServiceWorker.postMessage({ type: "SKIP_WAITING"});
    this.setState({newVersionAvailable: false});
    window.location.reload();
  }

  componentDidMount() {
    // recipe for application update recognition based upon 
    // https://dev.to/daniellycosta/showing-new-version-available-notification-on-create-react-app-pwas-3jc9
    const registrationConfig = { onUpdate: this.onApplicationUpdateOnServerDetected.bind(this) };
    serviceWorkerRegistration.register(registrationConfig);
  }
  



  render(): ReactNode {
    return (
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="sudoku" element={<Sudoku />} />
          <Route path="resume" element={<Resume />} />
          <Route path="blackjack" element={<BlackjackComp />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
        <ToastContainer position="middle-center">
          <Toast show={this.state.newVersionAvailable}>
            <Toast.Header closeButton={false}>
              <h1 className="app__popup-header" >Application Updated</h1>
            </Toast.Header>
            <Toast.Body className="app__popup-body">
              <p>The application has been updated since you last ran it in this browser.  You must reload application to get updated version</p>
              <Button onClick={this.onReloadRequested.bind(this)}>Reload</Button>
            </Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
    );
  }
}

function Home() {
  return (
    <div>
      <h2>Home</h2>

      <div>
      </div>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}

export default App;

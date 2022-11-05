import React from "react";
import Header from "./Header";
import Faucet from "./Faucet";
import Balance from "./Balance";
import Transfer from "./Transfer";
import Footer from "./Footer";

function App(props) {
  return (
    <div className="container-fluid dossierFinance-body" id="screen">
      <Header />
      <div className="row">
        <div className="col-lg-6 set-border">
          <Faucet userPrincipal={props.loggedInPrincipal} />
        </div>
        <div className="col-lg-6 set-border">
          <Balance />
        </div>
        <div className="col set-border">
          <Transfer />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;

import './App.css';
import MainPageComponent from './main/index';
import { Switch, Route } from "react-router-dom";
import ProductPage from "./product";
import UploadPage from "./upload";

function App() {
  return (
    <>
      <Switch>
        <Route exact={true} path="/">
          <MainPageComponent/>
        </Route>
          <Route exact={true} path="/product/:id" children={<ProductPage />} />
          <Route exact={true} path="/upload">
              <UploadPage/>
          </Route>
      </Switch>
    </>
  );
}

export default App;

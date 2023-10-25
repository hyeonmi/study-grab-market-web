import './App.css';
import MainPageComponent from './main/index';
import {Switch, Route, Link, useHistory} from "react-router-dom";
import ProductPage from "./product";
import UploadPage from "./upload";
import { Button } from 'antd';
import {DownloadOutlined} from '@ant-design/icons';

function App() {
    const history = useHistory();
  return (
        <div>
            <div id="header">
              <div id="header-area">
                  <Link to="/">
                    <img src="/images/icons/logo.png" alt="그랩마켓 로고" />
                  </Link>
                  <Button
                      size="large"
                      onClick={function () {
                          history.push("/upload");
                      }}
                      icon={<DownloadOutlined />}
                  >
                      상품 업로드
                  </Button>
              </div>
        </div>
            <div id="body">
            <Switch>
                <Route exact={true} path="/">
                <MainPageComponent/>
                </Route>
                <Route exact={true} path="/product/:id" children={<ProductPage />} />
                <Route exact={true} path="/upload">
                <UploadPage/>
                </Route>
            </Switch>
             </div>
            <div id="footer"></div>
        </div>
  );
}

export default App;

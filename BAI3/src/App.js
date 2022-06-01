import Demo from "./Form/Demo";
import Header from "./Header/Header";
import Body from "./Body/Body";
import './App.css';
import {Row, Col} from 'antd';
function App() {
  return (
    <div className="App">
      <Header />
      <Row>
        <Col span={12}>
          <Body />
        </Col>
        <Col span={12}>
          <Demo />
        </Col>
      </Row>
    </div>
  );
}

export default App;

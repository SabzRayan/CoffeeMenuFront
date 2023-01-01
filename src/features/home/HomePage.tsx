import { QRCode } from "antd";
import { observer } from "mobx-react-lite";

export default observer(function HomePage() {
  return (
    <div className="masthead">
      <QRCode
        errorLevel="H"
        value="https://karen-food.ir/branch/29aebb6b-7530-4a13-8f07-08daeb8137d8/1"
        icon="https://karen-food.ir/attachments/iisos0w2.lxh/logo.png"
      />
    </div>
  );
});

import { QRCode } from "antd";
import { observer } from "mobx-react-lite";

export default observer(function HomePage() {
  return (
    <div className="masthead">
      <QRCode
        errorLevel="H"
        value="https://karen-food.ir/restaurant/2f09ee07-e0e4-4672-2237-08daeb80240d/1"
        icon="https://karen-food.ir/attachments/iisos0w2.lxh/logo.png"
      />
    </div>
  );
});

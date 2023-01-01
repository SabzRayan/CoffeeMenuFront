import { Space, Spin } from "antd";

export default function LoadingComponent() {
  return (
    <div className="masthead">
      <Space size="middle">
        <Spin size="large" />
      </Space>
    </div>
  );
}

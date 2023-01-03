import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge } from "antd";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";
import { useStore } from "../stores/store";

export default observer(function CartIcon() {
  const { cartStore } = useStore();
  const { branchId, tableNumber } = useParams<{
    branchId: string;
    tableNumber: string;
  }>();

  return (
    <Link to={`/branch/${branchId}/${tableNumber}/cart`}>
      <Badge size="small" count={cartStore.cartCount} offset={[-5, 10]}>
        <ShoppingCartOutlined className="header-icon" />
      </Badge>
    </Link>
  );
});

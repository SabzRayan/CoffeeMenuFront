import { Image } from "antd";
import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";

interface Props {
  image: string;
  title: string;
  categoryId: string;
}

export default observer(function Category({ categoryId, image, title }: Props) {
  const { branchId, tableNumber } = useParams<{
    branchId: string;
    tableNumber: string;
  }>();

  return (
    <Link to={`/branch/${branchId}/${tableNumber}/category/${categoryId}`}>
      <Image preview={false} src={image} />
      <br />
      {title}
    </Link>
  );
});

import { Image } from "antd";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

interface Props {
  image: string;
  title: string;
  categoryId: string;
}

export default observer(function Category({ categoryId, image, title }: Props) {
  const tableNumber = 1;

  return (
    <Link to={`${tableNumber}/category/${categoryId}`}>
      <Image preview={false} src={image} />
      <br />
      {title}
    </Link>
  );
});

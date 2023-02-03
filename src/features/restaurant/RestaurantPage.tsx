import { observer } from "mobx-react-lite";
import { Link, useParams } from "react-router-dom";
import { useStore } from "../../app/stores/store";
import { useEffect } from "react";

export default observer(function RestaurantPage() {
  const { branchStore } = useStore();
  const { restaurantId, tableNumber } = useParams<{
    restaurantId: string;
    tableNumber: string;
  }>();

  useEffect(() => {
    branchStore.loadBranches(restaurantId!);
  }, [branchStore, restaurantId]);

  return (
    <div className="masthead branch-list">
      <h2>مجموعه غذایی کارن</h2>
      {branchStore.branchList.map((a) => (
        <Link className="branch-link" to={`/branch/${a.id}/${tableNumber}`}>
          <img className="branch-image" src={a.logo} /> {a.name}
        </Link>
      ))}
    </div>
  );
});

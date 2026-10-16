import {
  FiPackage,
  FiShoppingBag,
  FiTrendingUp,
} from "react-icons/fi";
import StatCard from "../StatCard/StatCard";

type SidebarProps = {
  totalProducts: number;
  shoppingCount: number;
  fullyStocked: number;
};

export default function Sidebar({
  totalProducts,
  shoppingCount,
  fullyStocked,
}: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="logo">
        <div className="logo-icon">
          <FiPackage />
        </div>
        
        <div>
          <h1>StockSmart</h1>
          <p>Inventory Workspace</p>
        </div>
      </div>

      <div className="stats">
        <StatCard
          icon={<FiPackage />}
          value={totalProducts}
          label="Total Products"
          color="pink"
        />

        <StatCard
          icon={<FiShoppingBag />}
          value={shoppingCount}
          label="Need Shopping"
          color="purple"
        />

        <StatCard
          icon={<FiTrendingUp />}
          value={fullyStocked}
          label="Healthy Stock"
          color="blue"
        />
      </div>
    </aside>
  );
}

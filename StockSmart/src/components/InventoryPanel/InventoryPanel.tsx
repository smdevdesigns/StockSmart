
import { useState } from "react";
import {
  FiPackage,
  FiPlus,
  FiMinus,
  FiRotateCw,
  FiTrash2,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";

export type Item = {
  id: number;
  name: string;
  max: number;
  current: number;
  purchased: number;
};

type InventoryPanelProps = {
  items: Item[];
  onConsume: (id: number) => void;
  onAdjust: (id: number) => void;
  onReset: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function InventoryPanel({
  items,
  onConsume,
  onAdjust,
  onReset,
  onDelete,
}: InventoryPanelProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <section className="panel">
      <button
        type="button"
        className="panel-header clickable"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
      >
        <span>
          <h3>Inventory</h3>
          <p>Manage your current stock</p>
        </span>
        {isOpen ? <FiChevronUp /> : <FiChevronDown />}
      </button>

      {isOpen && (
        <div className="panel-content">
          {items.length === 0 && (
            <div className="empty-state">
              <FiPackage size={42} />
              <p>No inventory yet</p>
              <span>Add your first product above.</span>
            </div>
          )}

          {items.map((item) => {
            const percent = Math.min(
              (item.current / item.max) * 100,
              100
            );
            const isLow = item.current <= item.max * 0.3;
            const isOverstock = item.current > item.max;

            const status = isOverstock
              ? "overstock"
              : isLow
              ? "low"
              : "healthy stock";

            return (
              <div className="inventory-card" key={item.id}>
                <div className="card-top">
                  <div>
                    <div className="title-row">
                      <h4>{item.name}</h4>
                      <span className={`status-pill ${status}`}>
                        {isOverstock
                          ? "Overstock"
                          : isLow
                          ? "Low"
                          : "Healthy Stock"}
                      </span>
                    </div>

                    <span className={`stock ${isLow ? "low-stock" : ""}`}>
                      {item.current} / {item.max} in stock
                    </span>
                  </div>

                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => onDelete(item.id)}
                    aria-label={`Delete ${item.name}`}
                  >
                    <FiTrash2 />
                  </button>
                </div>

                <div
                  className="progress"
                  role="progressbar"
                  aria-label={`${item.name} stock`}
                  aria-valuenow={item.current}
                  aria-valuemin={0}
                  aria-valuemax={item.max}
                >
                  <div
                    className={`progress-fill ${
                      isOverstock
                        ? "overstock-fill"
                        : isLow
                        ? "low-fill"
                        : ""
                    }`}
                    style={{ width: `${percent}%` }}
                  />
                </div>

                <div className="actions">
                  <button
                    type="button"
                    onClick={() => onConsume(item.id)}
                    disabled={item.current <= 0}
                    aria-label={`Use one ${item.name}`}
                  >
                    <FiMinus />
                  </button>

                  <button
                    type="button"
                    className="primary"
                    onClick={() => onAdjust(item.id)}
                    aria-label={`Add one ${item.name}`}
                  >
                    <FiPlus />
                  </button>

                  <button
                    type="button"
                    onClick={() => onReset(item.id)}
                    aria-label={`Reset ${item.name}`}
                  >
                    <FiRotateCw />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

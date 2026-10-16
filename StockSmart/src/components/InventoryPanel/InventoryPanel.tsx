
import { useState } from "react";

import {
  FiChevronDown,
  FiChevronUp,
  FiMinus,
  FiPackage,
  FiPlus,
  FiRotateCw,
  FiTrash2,
} from "react-icons/fi";

import type { Item } from "../../types/inventory";

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
        className="panel-header clickable"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        type="button"
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
              <span>
                Add your first product above.
              </span>
            </div>
          )}

          {items.map((item) => {
            const percent =
              item.max > 0
                ? Math.min(
                    (item.current / item.max) * 100,
                    100
                  )
                : item.current > 0
                  ? 100
                  : 0;
            const isLow =
              item.current <= item.max * 0.3;
            const isOverstock =
              item.current > item.max;

            const statusClass = isOverstock
              ? "overstock"
              : isLow
                ? "low"
                : "healthy";

            return (
              <div
                className="inventory-card"
                key={item.id}
              >
                <div className="card-top">
                  <div>
                    <div className="title-row">
                      <h4>{item.name}</h4>
                      <span
                        className={`status-pill ${statusClass}`}
                      >
                        {isOverstock
                          ? "Overstocked"
                          : isLow
                            ? "Low"
                            : "Healthy Stock"}
                      </span>
                    </div>

                    <span
                      className={`stock ${
                        isLow ? "low-stock" : ""
                      }`}
                    >
                      {item.current} / {item.max} in stock
                    </span>
                  </div>

                  <button
                    className="delete-btn"
                    onClick={() => onDelete(item.id)}
                    aria-label={`Delete ${item.name}`}
                    type="button"
                  >
                    <FiTrash2 />
                  </button>
                </div>

                <div
                  className="progress"
                  role="progressbar"
                  aria-valuenow={item.current}
                  aria-valuemin={0}
                  aria-valuemax={item.max}
                  aria-label={`${item.name} stock`}
                >
                  <div
                    className={`progress-fill ${
                      isOverstock
                        ? "overstock-fill"
                        : isLow
                          ? "low-fill"
                          : ""
                    }`}
                    style={{
                      width: `${percent}%`,
                    }}
                  />
                </div>

                <div className="actions">
                  <button
                    onClick={() => onConsume(item.id)}
                    disabled={item.current <= 0}
                    aria-label={`Use one ${item.name}`}
                    type="button"
                  >
                    <FiMinus />
                  </button>

                  <button
                    className="primary"
                    onClick={() => onAdjust(item.id)}
                    aria-label={`Add one ${item.name}`}
                    type="button"
                  >
                    <FiPlus />
                  </button>

                  <button
                    onClick={() => onReset(item.id)}
                    aria-label={`Reset ${item.name}`}
                    type="button"
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

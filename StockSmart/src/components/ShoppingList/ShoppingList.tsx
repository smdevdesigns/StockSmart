
import { useState } from "react";
import {
  FiCheck,
  FiPlus,
  FiCornerUpLeft,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";
import type { Item } from "../InventoryPanel/InventoryPanel";

export type ShoppingItem = Item & {
  needed: number;
  remaining: number;
};

type ShoppingListProps = {
  items: ShoppingItem[];
  onBuy: (id: number, amount: number) => void;
  onUndo: (id: number) => void;
  onComplete: (id: number) => void;
};

export default function ShoppingList({
  items,
  onBuy,
  onUndo,
  onComplete,
}: ShoppingListProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [buyAmounts, setBuyAmounts] = useState<Record<number, string>>({});

  const buy = (id: number) => {
    const amount = Number(buyAmounts[id] || 1);

    if (!Number.isSafeInteger(amount) || amount < 1) return;

    onBuy(id, amount);
    setBuyAmounts((previous) => ({ ...previous, [id]: "" }));
  };

  return (
    <section className="panel">
      <button
        type="button"
        className="panel-header clickable"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
      >
        <span>
          <h3>Shopping List</h3>
          <p>What is needed?k</p>
        </span>
        {isOpen ? <FiChevronUp /> : <FiChevronDown />}
      </button>

      {isOpen && (
        <div className="panel-content">
          {items.length === 0 && (
            <div className="empty-state">
              <FiCheck size={42} />
              <p>Everything is stocked 🤗</p>
            </div>
          )}

          {items.map((item) => {
            const completion =
              item.needed > 0
                ? Math.min((item.purchased / item.needed) * 100, 100)
                : 100;

            return (
              <div className="shopping-card" key={item.id}>
                <div className="shopping-top">
                  <div>
                    <h4>{item.name}</h4>
                    <p>Need {item.needed} total</p>
                  </div>
                  <div className="shopping-badge">
                    {item.remaining} left
                  </div>
                </div>

                <div className="shopping-meta">
                  <span>Purchased: {item.purchased}</span>
                  <span>Remaining: {item.remaining}</span>
                </div>

                <div
                  className="progress"
                  role="progressbar"
                  aria-label={`${item.name} shopping progress`}
                  aria-valuenow={Math.min(item.purchased, item.needed)}
                  aria-valuemin={0}
                  aria-valuemax={item.needed}
                >
                  <div
                    className="shopping-fill"
                    style={{ width: `${completion}%` }}
                  />
                </div>

                <div className="shopping-controls">
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={buyAmounts[item.id] ?? ""}
                    placeholder="1"
                    aria-label={`Quantity to buy for ${item.name}`}
                    onChange={(event) => {
                      setBuyAmounts((previous) => ({
                        ...previous,
                        [item.id]: event.target.value,
                      }));
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") buy(item.id);
                    }}
                  />

                  <button
                    type="button"
                    className="buy-btn"
                    onClick={() => buy(item.id)}
                  >
                    <FiPlus /> Buy
                  </button>
                </div>

                <div className="shopping-actions">
                  <button
                    type="button"
                    className="undo-btn"
                    onClick={() => onUndo(item.id)}
                    disabled={item.purchased <= 0}
                  >
                    <FiCornerUpLeft /> Undo
                  </button>

                  <button
                    type="button"
                    className="complete-btn"
                    onClick={() => onComplete(item.id)}
                    disabled={item.purchased <= 0}
                  >
                    <FiCheck /> Add To Inventory
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

"use client";

import { useEffect, useState } from "react";
import {
  FiPlus,
  FiMinus,
  FiRotateCw,
  FiTrash2,
  FiPackage,
  FiShoppingBag,
  FiTrendingUp,
  FiActivity,
  FiSun,
  FiMoon,
  FiCheck,
  FiCornerUpLeft,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";

type Item = {
  id: number;
  name: string;
  max: number;
  current: number;
  purchased: number;
};

const STORAGE_KEY = "inventory_items_v7";

function LandingPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [name, setName] = useState("");
  const [max, setMax] = useState("0");
  const [darkMode, setDarkMode] = useState(true);
  const [inventoryOpen, setInventoryOpen] = useState(true);
  const [shoppingOpen, setShoppingOpen] = useState(true);
  const [buyAmounts, setBuyAmounts] = useState<Record<number, string>>({});


  useEffect(() => {
    try {
      const savedItems = localStorage.getItem(STORAGE_KEY);
      if (savedItems) {
        const parsedItems: unknown = JSON.parse(savedItems);
        if (Array.isArray(parsedItems)) {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setItems(parsedItems as Item[]);
        }
      }
    } catch (error) {
      console.error("Could not load inventory:", error);
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error("Could not save inventory:", error);
    }
  }, [items, loaded]);

  const addItem = () => {
    const trimmedName = name.trim();
    const maxStock = Number(max);
    if (
      !trimmedName ||
      max.trim() === "" ||
      !Number.isSafeInteger(maxStock) ||
      maxStock < 0
    ) {
      return;
    }

    setItems((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: trimmedName,
        max: maxStock,
        current: maxStock,
        purchased: 0,
      },
    ]);

    setName("");
    setMax("0");
  };

  const consumeItem = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id && item.current > 0
          ? { ...item, current: item.current - 1 }
          : item,
      ),
    );
  };

  const adjustItem = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, current: item.current + 1 } : item,
      ),
    );
  };

  const resetItem = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, current: item.max, purchased: 0 } : item,
      ),
    );
  };

  const buyItems = (id: number, amount: number) => {
    if (!Number.isFinite(amount) || amount <= 0) return;

    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, purchased: item.purchased + amount } : item,
      ),
    );

    setBuyAmounts((prev) => ({ ...prev, [id]: "" }));
  };

  const undoPurchase = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id && item.purchased > 0
          ? { ...item, purchased: item.purchased - 1 }
          : item,
      ),
    );
  };

  const completePurchase = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              current: item.current + item.purchased,
              purchased: 0,
            }
          : item,
      ),
    );
  };

  const deleteItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    setBuyAmounts((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const shoppingList = items
    .filter((item) => item.current < item.max)
    .map((item) => {
      const needed = item.max - item.current;
      return {
        ...item,
        needed,
        remaining: needed - item.purchased,
      };
    });

  const fullyStocked = items.filter((item) => item.current >= item.max).length;

  return (
    <div className={`page ${darkMode ? "dark" : "light"}`}>
      <div className="glow glow1" />
      <div className="glow glow2" />
      <div className="glow glow3" />

      <div className="app-shell">
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
            <Stat
              icon={<FiPackage />}
              value={items.length}
              label="Total Products"
              color="pink"
            />
            <Stat
              icon={<FiShoppingBag />}
              value={shoppingList.length}
              label="Need Shopping"
              color="purple"
            />
            <Stat
              icon={<FiTrendingUp />}
              value={fullyStocked}
              label="Healthy Stock"
              color="blue"
            />
          </div>
        </aside>

        <main className="main">
          <section className="hero">
            <button
              className="theme-toggle"
              onClick={() => setDarkMode((value) => !value)}
              aria-label="Toggle color theme"
            >
              {darkMode ? <FiSun /> : <FiMoon />}
            </button>

            <div className="hero-badge">
              <FiActivity /> LIVE INVENTORY
            </div>

            <h2>
              Inventory Management
              <br />
              Reimagined
            </h2>

            <p>
              Track inventory with realistic shopping workflows and overstock
              support.
            </p>
          </section>

          <div className="mobile-summary">
            <div className="mobile-pill">
              <FiPackage /> {items.length} Items
            </div>
            <div className="mobile-pill">
              <FiShoppingBag /> {shoppingList.length} Needed
            </div>
            <div className="mobile-pill">
              <FiTrendingUp /> {fullyStocked} Healthy Stock
            </div>
          </div>

          <section className="add-card">
            <div className="field">
              <label htmlFor="product-name">Product Name</label>
              <input
                id="product-name"
                placeholder="Product Name"
                value={name}
                onChange={(e) => {
                  const value = e.target.value;
                  setName(
                    value ? value.charAt(0).toUpperCase() + value.slice(1) : "",
                  );
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") addItem();
                }}
              />
            </div>

            <div className="field small">
              <label htmlFor="max-stock">Max Stock</label>
              <input
                id="max-stock"
                type="text"
                inputMode="numeric"
                value={max}
                onChange={(e) => {
                  const value = e.target.value;

                  if (/^\d*$/.test(value)) {
                    setMax(value);
                  }
                }}
              />
            </div>

            <button className="add-btn" onClick={addItem}>
              <FiPlus /> Add Product
            </button>
          </section>

          <div className="grid">
            <section className="panel">
              <button
                className="panel-header clickable"
                onClick={() => setInventoryOpen((value) => !value)}
                aria-expanded={inventoryOpen}
              >
                <span>
                  <h3>Inventory</h3>
                  <p>Manage your current stock</p>
                </span>
                {inventoryOpen ? <FiChevronUp /> : <FiChevronDown />}
              </button>

              {inventoryOpen && (
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
                      100,
                    );
                    const isLow = item.current <= item.max * 0.3;
                    const isOverstock = item.current > item.max;

                    return (
                      <div className="inventory-card" key={item.id}>
                        <div className="card-top">
                          <div>
                            <div className="title-row">
                              <h4>{item.name}</h4>
                              <span
                                className={`status-pill ${
                                  isOverstock
                                    ? "overstock"
                                    : isLow
                                      ? "low"
                                      : "healthy stock"
                                }`}
                              >
                                {isOverstock
                                  ? "Overstocked"
                                  : isLow
                                    ? "Low"
                                    : "Healthy Stock"}
                              </span>
                            </div>
                            <span
                              className={`stock ${isLow ? "low-stock" : ""}`}
                            >
                              {item.current} / {item.max} in stock
                            </span>
                          </div>

                          <button
                            className="delete-btn"
                            onClick={() => deleteItem(item.id)}
                            aria-label={`Delete ${item.name}`}
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
                            style={{ width: `${percent}%` }}
                          />
                        </div>

                        <div className="actions">
                          <button
                            onClick={() => consumeItem(item.id)}
                            disabled={item.current <= 0}
                            aria-label={`Use one ${item.name}`}
                          >
                            <FiMinus />
                          </button>
                          <button
                            className="primary"
                            onClick={() => adjustItem(item.id)}
                            aria-label={`Add one ${item.name}`}
                          >
                            <FiPlus />
                          </button>
                          <button
                            onClick={() => resetItem(item.id)}
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

            <section className="panel">
              <button
                className="panel-header clickable"
                onClick={() => setShoppingOpen((value) => !value)}
                aria-expanded={shoppingOpen}
              >
                <span>
                  <h3>Shopping List</h3>
                  <p>What is needed?</p>
                </span>
                {shoppingOpen ? <FiChevronUp /> : <FiChevronDown />}
              </button>

              {shoppingOpen && (
                <div className="panel-content">
                  {shoppingList.length === 0 && (
                    <div className="empty-state">
                      <FiCheck size={42} />
                      <p>Everything is stocked 🤗</p>
                    </div>
                  )}

                  {shoppingList.map((item) => {
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

                        <div className="progress">
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
                            aria-label={`Quantity to buy for ${item.name}`}
                            value={buyAmounts[item.id] ?? ""}
                            placeholder="1"
                            onChange={(e) => {
                              const value = e.target.value;
                              setBuyAmounts((prev) => ({
                                ...prev,
                                [item.id]: value.replace(/\D/g, ""),
                              }));
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                buyItems(
                                  item.id,
                                  Number(buyAmounts[item.id] || 1),
                                );
                              }
                            }}
                          />
                          <button
                            className="buy-btn"
                            onClick={() =>
                              buyItems(
                                item.id,
                                Number(buyAmounts[item.id] || 1),
                              )
                            }
                          >
                            <FiPlus /> Buy
                          </button>
                        </div>

                        <div className="shopping-actions">
                          <button
                            className="undo-btn"
                            onClick={() => undoPurchase(item.id)}
                            disabled={item.purchased <= 0}
                          >
                            <FiCornerUpLeft /> Undo
                          </button>
                          <button
                            className="complete-btn"
                            onClick={() => completePurchase(item.id)}
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
          </div>
        </main>
      </div>

      <style>{`
        body {
          margin: 0;
          font-family: Inter, ui-sans-serif, system-ui, sans-serif;
        }

        *, *::before, *::after {
          box-sizing: border-box;
        }

        button, input {
          font: inherit;
        }

        button {
          transition: opacity .2s, transform .2s, background .2s;
        }

        button:disabled {
          opacity: .4;
          cursor: not-allowed;
        }

        .page {
          --bg-primary: #09090f;
          --bg-secondary: #151420;
          --card-bg: rgba(22,20,32,.92);
          --card-inner: rgba(35,32,50,.95);
          --text-primary: #fff;
          --text-secondary: #c5c1d5;
          --border: rgba(255,255,255,.08);
          --pink: #ff4ecd;
          --purple: #7c4dff;
          --blue: #6366f1;
          min-height: 100vh;
          padding: 28px;
          color: var(--text-primary);
          background:
            radial-gradient(circle at top left, rgba(255,78,205,.16), transparent 30%),
            radial-gradient(circle at bottom right, rgba(124,77,255,.16), transparent 30%),
            linear-gradient(145deg,var(--bg-primary),var(--bg-secondary));
          position: relative;
          overflow: hidden;
        }

        .page.light {
          --bg-primary: #f8f5ff;
          --bg-secondary: #fff;
          --card-bg: rgba(255,255,255,.94);
          --card-inner: rgba(255,255,255,.98);
          --text-primary: #18181b;
          --text-secondary: #5b5870;
          --border: rgba(0,0,0,.09);
          --pink: #ec4899;
          --purple: #8b5cf6;
        }

        .glow {
          position: absolute;
          border-radius: 999px;
          filter: blur(90px);
          opacity: .22;
          pointer-events: none;
        }
        .glow1 {
          width: 320px;
          height: 320px;
          background: var(--pink);
          top: -100px;
          left: -100px;
        }

        .glow2 {
          width: 300px;
          height: 300px;
          background: var(--purple);
          top: 120px;
          right: -80px;
        }

        .glow3 {
          width: 240px;
          height: 240px;
          background: var(--blue);
          bottom: -80px;
          left: 35%;
        }

        .app-shell {
          position: relative;
          z-index: 1;
          max-width: 1450px;
          margin: auto;
          display: grid;
          grid-template-columns: 290px minmax(0,1fr);
          gap: 24px;
        }

        .sidebar,
        .panel,
        .add-card {
          background: var(--card-bg);
          border: 1px solid var(--border);
          backdrop-filter: blur(20px);
        }

        .sidebar {
          border-radius: 32px;
          padding: 24px;
          height: fit-content;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 36px;
        }
        .logo-icon {
          width: 62px;
          height: 62px;
          flex-shrink: 0;
          border-radius: 20px;
          display: grid;
          place-items: center;
          background: linear-gradient(135deg,var(--pink),var(--purple));
          color: white;
          font-size: 1.5rem;
        }
        .logo h1 {
          margin: 0;
          font-size: 1.35rem;
        }

        .logo p {
          margin: 5px 0 0;
          color: var(--text-secondary);
          font-size: .85rem;
        }

        .stats {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .stat-card {
          background: var(--card-inner);
          border: 1px solid var(--border);
          border-radius: 24px;
          padding: 18px;
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .stat-icon {
          width: 52px;
          height: 52px;
          flex-shrink: 0;
          border-radius: 18px;
          display: grid;
          place-items: center;
          color: white;
          font-size: 1.2rem;
        }
        .stat-card h3 {
          margin: 0;
          font-size: 1.5rem;
        }
        .stat-card p {
          margin: 4px 0 0;
          color: var(--text-secondary);
          font-size: .9rem;
        }
        .pink {
          background: linear-gradient(135deg,var(--pink),#d946ef);
        }
        .purple {
          background: linear-gradient(135deg,var(--purple),var(--blue));
        }
        .blue {
          background: linear-gradient(135deg,var(--blue),#3b82f6);
        }

        .main {
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .hero {
          position: relative;
          border-radius: 32px;
          padding: 42px;
          background: linear-gradient(135deg,var(--pink),var(--purple),var(--blue));
          color: white;
        }
        .hero-badge {
          width: fit-content;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          border-radius: 999px;
          background: rgba(255,255,255,.14);
          border: 1px solid rgba(255,255,255,.15);
          font-size: .85rem;
        }
        .hero h2 {
          margin: 18px 0 14px;
          font-size: clamp(2rem,4vw,3rem);
          line-height: 1.1;
        }
        .hero p {
          max-width: 650px;
          color: rgba(255,255,255,.9);
          line-height: 1.7;
        }
        .theme-toggle {
          position: absolute;
          top: 24px;
          right: 24px;
          width: 48px;
          height: 48px;
          border-radius: 14px;
          border: 0;
          background: #2b2b35;
          color: white;
          display: grid;
          place-items: center;
          cursor: pointer;
        }

        .mobile-summary {
          display: none;
        }
        .mobile-pill {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px;
          border-radius: 18px;
          background: var(--card-bg);
          border: 1px solid var(--border);
          font-size: .85rem;
          font-weight: 600;
        }

        .add-card {
          display: flex;
          gap: 20px;
          align-items: flex-end;
          flex-wrap: nowrap;
          border-radius: 28px;
          padding: 22px;
        }
        .field {
          flex: 1 1 0;
          min-width: 0;
        }

        .field.small {
          flex: 0 0 140px;
          max-width: 140px;
        }

        .field label {
          display: block;
          margin-bottom: 10px;
          font-size: .9rem;
        }
        input {
          display: block;
          width: 100%;
          min-width: 0;
          padding: 14px;
          border-radius: 16px;
          border: 1px solid var(--border);
          background: var(--card-inner);
          color: var(--text-primary);
          outline: none;
        }
        input:focus {
          border-color: var(--purple);
        }
        .add-btn,
        .buy-btn,
        .shopping-actions button {
          border: 0;
          border-radius: 15px;
          padding: 13px 18px;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-weight: 600;
          cursor: pointer;
        }
        .add-btn {
          height: 52px;
          flex-shrink: 0;
          white-space: nowrap;
          background: linear-gradient(135deg,var(--pink),var(--purple));
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(2,minmax(0,1fr));
          gap: 24px;
          align-items: start;
        }
        .panel {
          min-width: 0;
          border-radius: 28px;
          padding: 24px;
        }
        .panel-header {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
          padding: 0;
          border: 0;
          text-align: left;
          color: var(--text-primary);
          background: transparent;
        }
        .panel-header h3 {
          margin: 0;
          font-size: 1.2rem;
        }
        .panel-header p {
          margin: 6px 0 0;
          color: var(--text-secondary);
          font-size: .9rem;
        }
        .clickable {
          cursor: pointer;
        }
        .panel-content {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .inventory-card,
        .shopping-card {
          min-width: 0;
          background: var(--card-inner);
          border: 1px solid var(--border);
          border-radius: 24px;
          padding: 20px;
        }
        .card-top,
        .shopping-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
        }
        .title-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
        }
        .inventory-card h4,
        .shopping-card h4 {
          margin: 0;
          overflow-wrap: anywhere;
        }
        .stock,
        .shopping-card p {
          display: inline-block;
          margin: 8px 0 0;
          color: var(--text-secondary);
          font-size: .9rem;
        }
        .low-stock {
          color: #ff5d8f;
        }
        .status-pill {
          padding: 6px 10px;
          border-radius: 999px;
          font-size: .72rem;
          font-weight: 600;
          white-space: nowrap;
        }
        .status-pill.healthy {
          background: rgba(34,197,94,.15);
          color: #22c55e;
        }
        .status-pill.low {
          background: rgba(239,68,68,.15);
          color: #ef4444;
        }
        .status-pill.overstock {
          background: rgba(168,85,247,.15);
          color: #c084fc;
        }

        .progress {
          height: 10px;
          background: rgba(127,127,127,.15);
          border-radius: 999px;
          overflow: hidden;
          margin: 18px 0;
        }
        .progress-fill,
        .shopping-fill {
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg,var(--pink),var(--purple),var(--blue));
        }
        .low-fill {
          background: linear-gradient(90deg,#ef4444,#f97316);
        }
        .overstock-fill {
          background: linear-gradient(90deg,#a855f7,#c084fc);
        }

        .actions {
          display: flex;
          gap: 10px;
        }
        .actions button,
        .delete-btn {
          width: 44px;
          height: 44px;
          flex-shrink: 0;
          border-radius: 14px;
          border: 0;
          display: grid;
          place-items: center;
          cursor: pointer;
        }
        .actions button {
          background: #2b2b35;
          color: white;
        }
        .actions button:hover {
          background: #414151;
        }
        .actions button.primary {
          background: linear-gradient(135deg,var(--pink),var(--purple));
        }
        .delete-btn {
          background: rgba(239,68,68,.12);
          color: #ef4444;
        }

        .shopping-badge {
          flex-shrink: 0;
          padding: 8px 12px;
          border-radius: 999px;
          background: #2b2b35;
          color: white;
          font-size: .8rem;
          font-weight: 600;
        }
        .shopping-meta {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          flex-wrap: wrap;
          color: var(--text-secondary);
          font-size: .82rem;
          margin-top: 16px;
        }
        .shopping-controls {
          display: flex;
          gap: 10px;
          margin-top: 16px;
        }
        .shopping-controls input {
          max-width: 100px;
        }
        .buy-btn {
          flex: 1;
          background: linear-gradient(135deg,var(--blue),#3b82f6);
        }
        .shopping-actions {
          display: flex;
          gap: 10px;
          margin-top: 16px;
        }
        .shopping-actions button {
          flex: 1;
          font-size: .85rem;
        }
        .undo-btn {
          background: linear-gradient(135deg,#f59e0b,#f97316);
        }
        .complete-btn {
          background: linear-gradient(135deg,#10b981,#22c55e);
        }

        .empty-state {
          padding: 45px 16px;
          border-radius: 24px;
          background: var(--card-inner);
          border: 1px solid var(--border);
          text-align: center;
          color: var(--text-secondary);
        }
        .empty-state p {
          font-weight: 600;
        }
        .empty-state span {
          font-size: .85rem;
        }

        @media (max-width: 1100px) {
          .app-shell {
            grid-template-columns: 1fr;
          }
          .sidebar {
            display: none;
          }
          .mobile-summary {
            display: flex;
            gap: 10px;
          }
        }
        @media (max-width: 768px) {
          .page {
            padding: 16px;
          }
          .grid {
            grid-template-columns: 1fr;
          }
          .hero {
            padding: 30px 24px;
          }
          .hero h2 {
            font-size: 2rem;
            padding-right: 12px;
          }
          .theme-toggle {
            top: 16px;
            right: 16px;
            width: 40px;
            height: 40px;
          }
          .panel {
            padding: 18px;
          }
          .inventory-card,
          .shopping-card {
            padding: 16px;
          }
          .shopping-actions {
            flex-direction: column;
          }
          .mobile-pill {
            padding: 10px 5px;
            gap: 5px;
            font-size: .75rem;
          }
          .add-card {
            align-items: stretch;
            flex-wrap: wrap;
            gap: 16px;
          }
          .field,
          .field.small {
            flex: 1 1 100%;
            max-width: none;
            min-width: 100%;
          }
          .add-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}

type StatProps = {
  icon: React.ReactNode;
  value: number;
  label: string;
  color: string;
};

function Stat({ icon, value, label, color }: StatProps) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${color}`}>{icon}</div>
      <div>
        <h3>{value}</h3>
        <p>{label}</p>
      </div>
    </div>
  );
}

export default LandingPage;

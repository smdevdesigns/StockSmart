
import { useEffect, useState } from "react";
import {
  FiPackage,
  FiShoppingBag,
  FiTrendingUp,
} from "react-icons/fi";

import AddItemForm from "../AddItemForm/AddItemForm";
import Hero from "../Hero/Hero";
import InventoryPanel from "../InventoryPanel/InventoryPanel";
import ShoppingList from "../ShoppingList/ShoppingList";
import Sidebar from "../Sidebar/Sidebar";
import type {
  Item,
  ShoppingItem,
} from "../../types/inventory";
import "../../styles/stocksmart.css";

const STORAGE_KEY = "inventory_items_v7";

export default function LandingPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [darkMode, setDarkMode] = useState(true);


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
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(items)
      );
    } catch (error) {
      console.error("Could not save inventory:", error);
    }
  }, [items, loaded]);

  const addItem = (name: string, maxStock: number) => {
    setItems((previous) => [
      ...previous,
      {
        id: Date.now(),
        name,
        max: maxStock,
        current: maxStock,
        purchased: 0,
      },
    ]);
  };

  const consumeItem = (id: number) => {
    setItems((previous) =>
      previous.map((item) =>
        item.id === id && item.current > 0
          ? {
              ...item,
              current: item.current - 1,
            }
          : item
      )
    );
  };

  const adjustItem = (id: number) => {
    setItems((previous) =>
      previous.map((item) =>
        item.id === id
          ? {
              ...item,
              current: item.current + 1,
            }
          : item
      )
    );
  };

  const resetItem = (id: number) => {
    setItems((previous) =>
      previous.map((item) =>
        item.id === id
          ? {
              ...item,
              current: item.max,
              purchased: 0,
            }
          : item
      )
    );
  };

  const buyItems = (id: number, amount: number) => {
    if (
      !Number.isSafeInteger(amount) ||
      amount <= 0
    ) {
      return;
    }

    setItems((previous) =>
      previous.map((item) =>
        item.id === id
          ? {
              ...item,
              purchased: item.purchased + amount,
            }
          : item
      )
    );
  };

  const undoPurchase = (id: number) => {
    setItems((previous) =>
      previous.map((item) =>
        item.id === id && item.purchased > 0
          ? {
              ...item,
              purchased: item.purchased - 1,
            }
          : item
      )
    );
  };

  const completePurchase = (id: number) => {
    setItems((previous) =>
      previous.map((item) =>
        item.id === id
          ? {
              ...item,
              current: item.current + item.purchased,
              purchased: 0,
            }
          : item
      )
    );
  };

  const deleteItem = (id: number) => {
    setItems((previous) =>
      previous.filter((item) => item.id !== id)
    );
  };

  const shoppingList: ShoppingItem[] = items
    .filter((item) => item.current < item.max)
    .map((item) => {
      const needed = item.max - item.current;
      return {
        ...item,
        needed,
        remaining: needed - item.purchased,
      };
    });

  const fullyStocked = items.filter(
    (item) => item.current >= item.max
  ).length;

  return (
    <div className={`page ${darkMode ? "dark" : "light"}`}>
      <div className="glow glow1" />
      <div className="glow glow2" />
      <div className="glow glow3" />

      <div className="app-shell">
        <Sidebar
          totalProducts={items.length}
          shoppingCount={shoppingList.length}
          fullyStocked={fullyStocked}
        />

        <main className="main">
          <Hero
            darkMode={darkMode}
            onToggleTheme={() =>
              setDarkMode((value) => !value)
            }
          />

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

          <AddItemForm onAddItem={addItem} />

          <div className="grid">
            <InventoryPanel
              items={items}
              onConsume={consumeItem}
              onAdjust={adjustItem}
              onReset={resetItem}
              onDelete={deleteItem}
            />

            <ShoppingList
              items={shoppingList}
              onBuy={buyItems}
              onUndo={undoPurchase}
              onComplete={completePurchase}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

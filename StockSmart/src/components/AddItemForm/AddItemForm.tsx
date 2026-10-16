
import { useState } from "react";
import { FiPlus } from "react-icons/fi";

type AddItemFormProps = {
  onAddItem: (name: string, maxStock: number) => void;
};

export default function AddItemForm({
  onAddItem,
}: AddItemFormProps) {
  const [name, setName] = useState("");
  const [max, setMax] = useState("0");

  const handleSubmit = () => {
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
    onAddItem(trimmedName, maxStock);
    setName("");
    setMax("0");
  };

  return (
    <section className="add-card">
      <div className="field">
        <label htmlFor="product-name">
          Product Name
        </label>
        <input
          id="product-name"
          placeholder="Product Name"
          value={name}
          onChange={(event) => {
            const value = event.target.value;
            setName(
              value
                ? value.charAt(0).toUpperCase() +
                    value.slice(1)
                : ""
            );
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSubmit();
            }
          }}
        />
      </div>

      <div className="field small">
        <label htmlFor="max-stock">
          Max Stock
        </label>
        <input
          id="max-stock"
          type="text"
          inputMode="numeric"
          value={max}
          onChange={(event) => {
            const value = event.target.value;
            if (/^\d*$/.test(value)) {
              setMax(value);
            }
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSubmit();
            }
          }}
        />
      </div>
      <button
        className="add-btn"
        onClick={handleSubmit}
        type="button"
      >
        <FiPlus /> Add Product
      </button>
    </section>
  );
}

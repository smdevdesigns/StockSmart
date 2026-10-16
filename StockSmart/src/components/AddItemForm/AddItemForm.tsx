import { FiPlus } from "react-icons/fi";

type AddItemFormProps = {
  name: string;
  max: number;
  onNameChange: (name: string) => void;
  onMaxChange: (max: number) => void;
  onAdd: () => void;
};

export default function AddItemForm({
  name,
  max,
  onNameChange,
  onMaxChange,
  onAdd,
}: AddItemFormProps) {
  return (
    <section className="add-card">
      <div className="field">
        <label htmlFor="product-name">Product Name</label>
        <input
          id="product-name"
          placeholder="Product Name"
          value={name}
          onChange={(event) => {
            const value = event.target.value;
            onNameChange(
              value ? value.charAt(0).toUpperCase() + value.slice(1) : "",
            );
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") onAdd();
          }}
        />
      </div>

      <div className="field small">
        <label htmlFor="max-stock">Max Stock</label>
        <input
          id="max-stock"
          type="number"
          min="1"
          step="1"
          value={max}
          onChange={(event) => {
            onMaxChange(
              Math.max(1, Math.floor(Number(event.target.value) || 1)),
            );
          }}
        />
      </div>

      <button type="button" className="add-btn" onClick={onAdd}>
        <FiPlus />
        Add Product
      </button>
    </section>
  );
}

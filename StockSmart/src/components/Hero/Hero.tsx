
import { FiActivity, FiMoon, FiSun } from "react-icons/fi";

type HeroProps = {
  darkMode: boolean;
  onToggleTheme: () => void;
};

export default function Hero({
  darkMode,
  onToggleTheme,
}: HeroProps) {
  return (
    <section className="hero">
      <button
        type="button"
        className="theme-toggle"
        onClick={onToggleTheme}
        aria-label="Toggle color theme"
      >
        {darkMode ? <FiSun /> : <FiMoon />}
      </button>

      <div className="hero-badge">
        <FiActivity />
        LIVE INVENTORY
      </div>

      <h2>
        Inventory Management
        <br />
        Reimagined
      </h2>

      <p>
        Track inventory with realistic shopping workflows
        and overstock support.
      </p>
    </section>
  );
}


import type { ReactNode } from "react";

type StatCardProps = {
  icon: ReactNode;
  value: number;
  label: string;
  color: "pink" | "purple" | "blue";
};

export default function StatCard({
  icon,
  value,
  label,
  color,
}: StatCardProps) {
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

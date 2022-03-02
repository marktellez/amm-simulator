export default function Tab({ label, selectedIndex, onChange, value }) {
  return (
    <div
      onClick={() => onChange(value)}
      className={`${
        selectedIndex === value
          ? "border-yellow-700 bg-yellow-600 text-black"
          : "border-gray-700 bg-gray-500 text-black"
      } border rounded-t-md  px-2 inline-block`}>
      <h3>{label}</h3>
    </div>
  );
}

Tab.displayName = "Tab";

import { useState, useEffect } from "react";
import IntegerField from "../integer-field";

export default function QtyField({
  value,
  max,
  min,
  onChange = () => {},
  ...rest
}) {
  const [qty, setQty] = useState(value);

  useEffect(() => {
    onChange(qty);
  }, [qty]);

  function limit(qty) {
    if (qty === "") return;
    const number = parseInt(Number(qty));

    if (number > max) return max;
    if (number < min) return min;

    return number;
  }

  return (
    <div className="flex items-center">
      <button
        onClick={() => setQty((value) => (value === min ? min : value - 1))}>
        -
      </button>
      <IntegerField
        value={qty}
        onChange={(val) => setQty(limit(val))}
        {...rest}
      />
      <button
        onClick={() => setQty((value) => (value === max ? max : value + 1))}>
        +
      </button>
    </div>
  );
}

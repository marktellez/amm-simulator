import { useState, useEffect, useRef } from "react";

export default function TextField({
  type = "text",
  className,
  label,
  value,
  onChange = () => {},
  decorateAfter = () => {},
  ...rest
}) {
  const [active, setActive] = useState(false);
  const ref = useRef(undefined);

  useEffect(() => {
    if (!active) return;
    ref.current.focus();
  }, [active]);

  useEffect(() => {
    setActive(typeof value !== undefined);
  }, [value]);

  const after = decorateAfter();

  return (
    <div className="relative w-full my-2">
      <div
        onClick={() => setActive(true)}
        className={`ml-2 absolute transition-all transform delay-100 ${
          active || active ? "-top-6" : "top-0"
        }`}>
        {label && (
          <label className="text-lg font-bold tracking-wide rounded-lg opacity-90">
            {label}
          </label>
        )}
      </div>
      <div className="flex items-center w-full p-2 text-blue-600 bg-transparent bg-white border rounded-lg">
        <div>
          <input
            ref={ref}
            className={`outline-none w-full ${className}`}
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setActive(true)}
            {...rest}
          />
        </div>
        {after && <div>{after}</div>}
      </div>
    </div>
  );
}

import Link from "next/link";

export default function Stepper({ steps = [], step = 0 }) {
  return (
    <div className="flex items-center justify-center ">
      <div
        className={
          "rounded-full bg-transparent border border-yellow-600 flex justify-around "
        }>
        {steps.map((_step, i) => (
          <div
            className={`py-1 px-8 rounded-full w-4 h-4 text-white ${
              step == i ? "bg-yellow-600 " : ""
            }`}>
            {_step.label}
          </div>
        ))}
      </div>
    </div>
  );
}

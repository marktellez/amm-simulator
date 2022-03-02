import { useState } from "react";

export default function Button({
  children,
  className,
  busy = false,
  block = false,
  disabled = false,
  ...rest
}) {
  const [clicked, setClicked] = useState(false);

  const staticClassNames = `scale-100`;
  const disabledClassNames = `cursor-not-allowed opacity-40`;
  const animateClassNames = `transition transform duration-600 `;
  const clickedClassNames = `scale-110`;

  return (
    <button
      className={`${staticClassNames} ${animateClassNames} ${
        clicked ? clickedClassNames : ""
      } ${disabled || busy ? disabledClassNames : ""} ${
        block ? "block" : ""
      } ${className}`}
      onClick={() => setClicked(true)}
      disabled={disabled || busy}
      {...rest}>
      <div className={`flex items-center justify-center`}>
        <div>{children}</div>
        {busy && dots}
      </div>
    </button>
  );
}

import PrimaryButton from "./primary";

export { PrimaryButton };

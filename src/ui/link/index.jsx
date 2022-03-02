import NextLink from "next/link";

export default function Link({ children, href, newWindow = false, ...rest }) {
  const newWindowOptions = { target: "_blank", rel: "noreferrer" };
  return (
    <NextLink {...{ href }}>
      <a {...(newWindow ? newWindowOptions : {})} {...rest}>
        {children}
      </a>
    </NextLink>
  );
}

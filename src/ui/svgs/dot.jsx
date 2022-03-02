export default function DotSvg({ size = 24, className }) {
  return (
    <svg className={className} width={size} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="50" />
    </svg>
  );
}

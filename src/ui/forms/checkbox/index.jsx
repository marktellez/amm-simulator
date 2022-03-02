export default function Checkbox({ value, onChange = () => {} }) {
  return <input type="checkbox" onChange={(e) => onChange(e.target.checked)} />;
}

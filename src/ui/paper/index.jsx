export default function Paper({ children, className }) {
  return (
    <div
      className={`mx-auto bg-gray-900 py-8 px-16 my-8 shadow-md ${
        className ? className : "w-full md:w-[700px]"
      }`}>
      {children}
    </div>
  );
}

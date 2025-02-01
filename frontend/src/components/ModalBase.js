import HrLine from "./HrLine";

export default function ModalBase({ children, name, isOpen, onClose }) {
  if (!isOpen) return null;
  console.log("hello");
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-2/3 max-h-3/4 p-6 rounded-lg overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{name}</h2>
          <button onClick={onClose} className="text-red-500 font-semibold">
            Close
          </button>
        </div>
        <HrLine />
        <div>{children}</div>
      </div>
    </div>
  );
}

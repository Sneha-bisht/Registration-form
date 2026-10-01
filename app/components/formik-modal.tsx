interface IFormikData {
  name?: string;
  email?: string;
  phone?: string;
  age?: number | string;
  country?: string;
  gender?: string;
}

interface FormikModalProps {
  isOpen: boolean;
  data: IFormikData | null;
  onClose: () => void;
}

function Row({ label, value }: { label: string; value?: string | number }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-gray-400">{label}</span>
      <span className="text-sm capitalize text-gray-900">{value || "-"}</span>
    </div>
  );
}

export function FormikModal({ isOpen, data, onClose }: FormikModalProps) {
  if (!isOpen || !data) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gray-50 px-6 py-5">
          <h2 className="text-lg font-bold text-gray-900">
            Formik Form Details
          </h2>
        </div>

        <div className="max-h-[65vh] overflow-y-auto px-6 py-5">
          <section>
            <h3 className="mb-3 text-sm font-medium  text-black">
              Personal Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <Row label="Name" value={data.name} />
              <Row label="Email" value={data.email} />
              <Row label="Phone" value={data.phone} />
              <Row label="Age" value={data.age} />
              <Row label="Country" value={data.country} />
              <Row label="Gender" value={data.gender} />
            </div>
          </section>
        </div>

        <div className="border-t border-gray-100 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-lg bg-black px-5 py-2.5 font-medium text-white hover:bg-gray-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

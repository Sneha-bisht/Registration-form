"use client";

interface ISubmittedAddress {
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}

interface ISubmittedData {
  name?: string;
  email?: string;
  age?: number | string;
  phone?: string;
  department?: string;
  gender?: string;
  skills?: string[];
 
  about?: string;
  address?: ISubmittedAddress;
}

interface SubmittedDataModalProps {
  isOpen: boolean;
  data: ISubmittedData | null;
  onClose: () => void;
}

function Row({ label, value }: { label: string; value?: string | number }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium  text-gray-400">
        {label}
      </span>
      <span className="text-sm text-gray-900">{value || "-"}</span>
    </div>
  );
}

export function SubmittedDataModal({
  isOpen,
  data,
  onClose,
}: SubmittedDataModalProps) {
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
        <div className="flex items-start justify-between gap-4  bg-gray-50 px-6 py-5">
          <div className="flex items-center gap-3">
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Registration Details
              </h2>
            </div>
          </div>

         
        </div>

        {/* Body */}
        <div className="max-h-[65vh] overflow-y-auto px-6 py-5">
          <section className="mb-5">
            <h3 className="mb-3 text-sm font-medium uppercase text-black">
              Personal Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <Row label="Name" value={data.name} />
              <Row label="Email" value={data.email} />
              <Row label="Age" value={data.age} />
              <Row label="Phone" value={data.phone} />
              <Row label="Department" value={data.department} />
              <Row label="Gender" value={data.gender} />
              <Row label="Skills" value={data.skills?.join(", ")} />
           
            </div>
          </section>

          {data.about && (
            <section className="mb-5">
              <h3 className="mb-3 text-sm font-medium uppercase text-black">
                About
              </h3>
              <p className="text-sm text-gray-700">{data.about}</p>
            </section>
          )}

          <section>
            <h3 className="mb-3 text-sm font-medium uppercase text-black">
              Address
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <Row label="Street" value={data.address?.street} />
              <Row label="City" value={data.address?.city} />
              <Row label="State" value={data.address?.state} />
              <Row label="ZIP Code" value={data.address?.zipCode} />
              <Row label="Country" value={data.address?.country} />
            </div>
          </section>
        </div>

        {/* Footer */}
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

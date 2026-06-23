import { ImageIcon } from "lucide-react";

export default function GalleryPage() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-gray-800 bg-[#111] p-16 text-center">
      <ImageIcon className="mb-4 h-12 w-12 text-gray-600" />
      <h2 className="font-sans text-base font-semibold text-white">Gallery Management</h2>
      <p className="mt-2 font-sans text-sm text-gray-500">Coming soon — connect backend to enable full functionality.</p>
    </div>
  );
}

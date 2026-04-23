import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { message } from "antd";

interface Brand {
    _id: string;
    name: string;
}

interface EditBrandModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (id: string, formData: FormData) => void;
    brand: Brand | null;
    isLoading?: boolean;
}

export default function EditBrandModal({
    isOpen,
    onClose,
    onSave,
    brand,
    isLoading = false,
}: EditBrandModalProps) {
    const [name, setName] = useState("");
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isOpen && brand) {
            setName(brand.name);
            setIsAnimating(true);
        }
    }, [isOpen, brand]);

    if (!isOpen) return null;

    const handleSave = () => {
        if (!name.trim()) {
            message.warning("Please enter a brand name");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        
        if (brand) {
            onSave(brand._id, formData);
        }
    };

    const handleClose = () => {
        setIsAnimating(false);
        setTimeout(() => onClose(), 200);
    };

    return (
        <div
            onClick={(e) => e.target === e.currentTarget && !isLoading && handleClose()}
            className={`fixed inset-0 bg-black/80 flex items-center justify-center z-50 transition-opacity duration-300 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
        >
            <div className={`bg-white rounded-2xl p-8 w-full max-w-md relative transform transition-all duration-300 ${isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
                <button
                    onClick={handleClose}
                    disabled={isLoading}
                    className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X size={24} />
                </button>

                <h2 className="text-2xl font-bold text-[#1E293B] mb-2 text-center">Edit Brand</h2>
                <p className="text-sm text-[#64748B] mb-8 text-center">Update brand details.</p>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-[#1E293B] mb-2">Brand Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Parker"
                            className="w-full px-4 py-3 border border-[#DBEAFE] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] transition-all"
                        />
                    </div>
                </div>

                <div className="flex gap-4 mt-8">
                    <button onClick={handleClose} className="flex-1 px-6 py-3 border border-[#E2E8F0] text-[#64748B] rounded-xl font-semibold hover:bg-[#F8FAFC] transition-all">Cancel</button>
                    <button
                        onClick={handleSave}
                        disabled={isLoading}
                        className="flex-1 px-6 py-3 bg-[#2563EB] text-white rounded-xl font-semibold hover:bg-[#1d4ed8] shadow-lg shadow-[#2563EB]/20 transition-all flex items-center justify-center gap-2"
                    >
                        {isLoading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : null}
                        {isLoading ? "Updating..." : "Update Brand"}
                    </button>
                </div>
            </div>
        </div>
    );
}

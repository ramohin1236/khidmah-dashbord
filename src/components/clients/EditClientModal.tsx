import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface EditClientModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (id: string, formData: FormData) => void;
    client: any | null;
    isLoading?: boolean;
}

export default function EditClientModal({
    isOpen,
    onClose,
    onSave,
    client,
    isLoading = false,
}: EditClientModalProps) {
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [removeLogo, setRemoveLogo] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true);
        }
    }, [isOpen]);

    useEffect(() => {
        if (client) {
            setPreviewUrl(client.logo || null);
            setRemoveLogo(false);
        }
    }, [client]);

    useEffect(() => {
        if (!isOpen) {
            setLogoFile(null);
            setPreviewUrl(null);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSave = () => {
        const formData = new FormData();
        if (logoFile) formData.append("logo", logoFile);
        if (removeLogo) formData.append("remove", "1");

        if (client && client._id) onSave(client._id, formData);
    };

    const handleClose = () => {
        setLogoFile(null);
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

                <h2 className="text-3xl font-bold text-[#1E293B] mb-2 text-center">Edit Client</h2>
                <p className="text-base text-[#64748B] mb-8 text-center">Replace the logo if you want to change it.</p>

                <div className="space-y-6">
                    <div>
                        <label className="block text-base font-semibold text-[#1E293B] mb-2">Logo (leave unchanged to keep existing)</label>
                        <div className="flex items-center gap-4">
                            <label className="flex items-center gap-3 cursor-pointer px-4 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const f = e.target.files ? e.target.files[0] : null;
                                        setLogoFile(f);
                                        if (f) setPreviewUrl(URL.createObjectURL(f));
                                    }}
                                    className="hidden"
                                />
                                <div className="w-12 h-12 bg-white rounded-md overflow-hidden flex items-center justify-center border">
                                    {previewUrl ? (
                                        <img src={previewUrl} alt="preview" className="w-full h-full object-contain" />
                                    ) : (
                                        <span className="text-sm text-[#64748B]">No logo</span>
                                    )}
                                </div>
                                <div>
                                    <div className="font-semibold text-[#1E293B]">Choose file</div>
                                    <div className="text-sm text-[#64748B]">PNG, JPG, GIF — max 2MB</div>
                                </div>
                            </label>
                            {previewUrl && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        // mark for removal and clear preview/local file
                                        setLogoFile(null);
                                        setPreviewUrl(null);
                                        setRemoveLogo(true);
                                    }}
                                    className="text-sm text-[#EF4444]"
                                >Remove</button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex gap-4 mt-8">
                    <button onClick={handleClose} className="flex-1 px-6 py-3 border border-[#E2E8F0] text-[#64748B] rounded-xl font-semibold text-lg hover:bg-[#F8FAFC] transition-all">Cancel</button>
                    <button
                        onClick={handleSave}
                        disabled={isLoading}
                        className="flex-1 px-6 py-3 bg-[#2563EB] text-white rounded-xl font-semibold hover:bg-[#1d4ed8] shadow-lg shadow-[#2563EB]/20 transition-all flex items-center justify-center gap-2"
                    >
                        {isLoading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : null}
                        {isLoading ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </div>
        </div>
    );
}

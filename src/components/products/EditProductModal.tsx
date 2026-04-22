import { useState, useEffect, useRef } from "react";
import { X, Upload } from "lucide-react";
import { Select } from "antd";
import { DUMMY_CATEGORIES, DUMMY_BRANDS } from "../../constants/dummyData";

interface Product {
    _id: string;
    key: string;
    name: string;
    category: string;
    brand: string;
    image: string;
    customizable: boolean;
}

interface EditProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (id: string, product: {
        name: string;
        category: string;
        brand: string;
        image: string;
        customizable: boolean;
    }) => void;
    product: Product | null;
}

export default function EditProductModal({
    isOpen,
    onClose,
    onSave,
    product,
}: EditProductModalProps) {
    const [name, setName] = useState("");
    const [category, setCategory] = useState<string | undefined>(undefined);
    const [brand, setBrand] = useState<string | undefined>(undefined);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [customizable, setCustomizable] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen && product) {
            setName(product.name);
            setCategory(product.category);
            setBrand(product.brand);
            setImagePreview(product.image);
            setCustomizable(product.customizable);
            setIsAnimating(true);
        }
    }, [isOpen, product]);

    if (!isOpen) return null;

    const handleFile = (file: File) => {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            alert("Please upload a valid image file");
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        handleFile(file);
    };

    const handleSave = () => {
        if (!name.trim()) {
            alert("Please enter a product name");
            return;
        }
        if (!category) {
            alert("Please select a category");
            return;
        }
        if (!brand) {
            alert("Please select a brand");
            return;
        }
        if (!imagePreview) {
            alert("Please upload an image");
            return;
        }
        if (product) {
            onSave(product.key, { name, category, brand, image: imagePreview, customizable });
        }
        handleClose();
    };

    const handleClose = () => {
        setIsAnimating(false);
        setTimeout(() => onClose(), 200);
    };

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    return (
        <div
            onClick={handleBackdropClick}
            className={`fixed inset-0 bg-black/80 flex items-center justify-center z-50 transition-opacity duration-300 ${isAnimating ? 'opacity-100' : 'opacity-0'
                }`}
        >
            <div className={`bg-white rounded-2xl p-8 w-full max-w-xl relative transform transition-all duration-300 ${isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                }`}>
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X size={24} />
                </button>

                {/* Title */}
                <h2 className="text-2xl font-bold text-[#1E293B] mb-2 text-center">
                    Edit Product
                </h2>

                <p className="text-sm text-[#64748B] mb-8 text-center max-w-md mx-auto">
                    Update product details and image.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Image Upload Area */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-[#1E293B] mb-2">
                            Product Image
                        </label>
                        <div
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                            className={`relative h-48 rounded-2xl border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center gap-3 overflow-hidden
                                ${isDragging ? 'border-[#2563EB] bg-[#F0F7FF]' : 'border-[#DBEAFE] bg-[#F8FAFC] hover:border-[#2563EB]/50'}
                                ${imagePreview ? 'border-none' : ''}`}
                        >
                            {imagePreview ? (
                                <>
                                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <div className="bg-white/20 backdrop-blur-md p-2 rounded-full text-white">
                                            <Upload size={20} />
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="p-3 bg-white rounded-full shadow-sm text-[#2563EB]">
                                        <Upload size={24} />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm font-semibold text-[#1E293B]">
                                            Click to change or drag and drop
                                        </p>
                                    </div>
                                </>
                            )}
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={(e) => e.target.files && handleFile(e.target.files[0])}
                                accept="image/*"
                                className="hidden"
                            />
                        </div>
                    </div>

                    {/* Name Input */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-[#1E293B] mb-2">
                            Product Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Custom Engraved Metallic Pen"
                            className="w-full px-4 py-3 border border-[#DBEAFE] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 focus:border-[#2563EB] text-sm transition-all"
                        />
                    </div>

                    {/* Category Select */}
                    <div>
                        <label className="block text-sm font-semibold text-[#1E293B] mb-2">
                            Category
                        </label>
                        <Select
                            value={category}
                            onChange={(value) => setCategory(value)}
                            placeholder="Select Category"
                            className="w-full h-[46px] rounded-xl"
                            options={DUMMY_CATEGORIES.map(c => ({ value: c.name, label: c.name }))}
                        />
                    </div>

                    {/* Brand Select */}
                    <div>
                        <label className="block text-sm font-semibold text-[#1E293B] mb-2">
                            Brand
                        </label>
                        <Select
                            value={brand}
                            onChange={(value) => setBrand(value)}
                            placeholder="Select Brand"
                            className="w-full h-[46px] rounded-xl"
                            options={DUMMY_BRANDS.map(b => ({ value: b.name, label: b.name }))}
                        />
                    </div>

                    {/* Customizable Checkbox */}
                    <div className="md:col-span-2 flex items-center gap-3 bg-[#F8FAFC] p-4 rounded-xl">
                        <input
                            type="checkbox"
                            id="customizable"
                            checked={customizable}
                            onChange={(e) => setCustomizable(e.target.checked)}
                            className="w-5 h-5 rounded border-[#DBEAFE] text-[#2563EB] focus:ring-[#2563EB]"
                        />
                        <label htmlFor="customizable" className="text-sm font-medium text-[#1E293B] cursor-pointer">
                            This product is customizable
                        </label>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mt-8">
                    <button
                        onClick={handleClose}
                        className="flex-1 px-6 py-3 border border-[#E2E8F0] text-[#64748B] rounded-xl font-semibold hover:bg-[#F8FAFC] transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="flex-1 px-6 py-3 bg-[#2563EB] text-white rounded-xl font-semibold hover:bg-[#1d4ed8] shadow-lg shadow-[#2563EB]/20 transition-all"
                    >
                        Update Product
                    </button>
                </div>
            </div>
        </div>
    );
}

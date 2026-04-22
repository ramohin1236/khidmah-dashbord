import dashboardIcon from "../../public/Group (4).svg";
import plusIcon from "../../public/Vector (5).svg";
import editIcon from "../../public/Group (14).svg";
import { Table, Button, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import AddProductModal from "../components/products/AddProductModal";
import EditProductModal from "../components/products/EditProductModal";

interface ProductData {
    key: string;
    id: number;
    name: string;
    category: string;
    brand: string;
    image: string;
    customizable: boolean;
}

const PRODUCTS_DATA = [
    {
        id: 1,
        name: "Custom Engraved Metallic Pen",
        category: "Pen",
        brand: "Local",
        image: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?auto=format&fit=crop&q=80&w=600",
        customizable: true
    },
    {
        id: 2,
        name: "Premium Leather Diary",
        category: "Diary",
        brand: "Navana",
        image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600",
        customizable: true
    },
    {
        id: 3,
        name: "Corporate Canvas Tote Bag",
        category: "Bag",
        brand: "Custom",
        image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=600",
        customizable: true
    },
    {
        id: 4,
        name: "Traditional Jamdani Saree",
        category: "Saree",
        brand: "Local Brand",
        image: "https://images.unsplash.com/photo-1610189013233-0b196ebcf725?auto=format&fit=crop&q=80&w=600",
        customizable: false
    },
    {
        id: 5,
        name: "Matte Black Ceramic Mug",
        category: "Gift Items",
        brand: "RFL",
        image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&q=80&w=600",
        customizable: true
    },
    {
        id: 6,
        name: "Executive Organizer Set",
        category: "Corporate Items",
        brand: "Navana",
        image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=600",
        customizable: true
    },
    {
        id: 7,
        name: "Custom Logo Wooden Pen",
        category: "Pen",
        brand: "Custom",
        image: "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?auto=format&fit=crop&q=80&w=600",
        customizable: true
    },
    {
        id: 8,
        name: "Eco-Friendly Jute Bag",
        category: "Bag",
        brand: "Local Brand",
        image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600",
        customizable: true
    },
    {
        id: 9,
        name: "Professional Banner Design",
        category: "Graphic Design",
        brand: "Expert Design",
        image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=600",
        customizable: true
    },
    {
        id: 10,
        name: "Corporate Logo Branding",
        category: "Graphic Design",
        brand: "Expert Design",
        image: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&q=80&w=600",
        customizable: true
    },
    {
        id: 11,
        name: "Custom Vector Illustration",
        category: "Graphic Design",
        brand: "Illustrator Art",
        image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?auto=format&fit=crop&q=80&w=600",
        customizable: true
    }
];

const initialDataSource: ProductData[] = PRODUCTS_DATA.map(item => ({
    ...item,
    key: String(item.id)
}));

export default function ClaimlyGuides() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null);
    const [products, setProducts] = useState<ProductData[]>(initialDataSource);

    const handleAddProduct = (newProduct: Omit<ProductData, "key" | "id">) => {
        const product: ProductData = {
            ...newProduct,
            id: products.length + 1,
            key: String(products.length + 1),
        };
        setProducts([...products, product]);
        console.log("New Product Added:", product);
    };

    const handleEditProduct = (id: string, updatedData: Omit<ProductData, "key" | "id">) => {
        const updatedProducts = products.map((product) =>
            product.key === id
                ? { ...product, ...updatedData }
                : product
        );
        setProducts(updatedProducts);
        console.log("Product Updated:", { id, ...updatedData });
    };

    const handleDeleteProduct = (id: string) => {
        setProducts(products.filter(p => p.key !== id));
        console.log("Product Deleted:", id);
    };

    const handleEditClick = (product: ProductData) => {
        setSelectedProduct(product);
        setIsEditModalOpen(true);
    };

    const columns: ColumnsType<ProductData> = [
        {
            title: "Product",
            key: "product",
            render: (_: unknown, record: ProductData) => (
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg overflow-hidden border border-[#DBEAFE] bg-white flex-shrink-0">
                        <img 
                            src={record.image} 
                            alt={record.name} 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <span className="text-[#1E293B] font-medium text-[14px]">
                        {record.name}
                    </span>
                </div>
            ),
        },
        {
            title: "Category",
            dataIndex: "category",
            key: "category",
            render: (text: string) => (
                <Tag color="blue" className="rounded-full px-3 border-none bg-[#DBEAFE] text-[#2563EB] font-medium">
                    {text}
                </Tag>
            ),
        },
        {
            title: "Brand",
            dataIndex: "brand",
            key: "brand",
            render: (text: string) => (
                <span className="text-[#64748B] text-[14px] font-medium">
                    {text}
                </span>
            ),
        },
        {
            title: "Customizable",
            dataIndex: "customizable",
            key: "customizable",
            render: (customizable: boolean) => (
                <span className={`text-[13px] font-semibold ${customizable ? 'text-green-600' : 'text-amber-600'}`}>
                    {customizable ? '✓ Yes' : '✕ No'}
                </span>
            ),
        },
        {
            title: "Actions",
            key: "actions",
            width: 120,
            render: (_: unknown, record: ProductData) => (
                <div className="flex items-center gap-2">
                    <Button
                        onClick={() => handleEditClick(record)}
                        className="p-0 border-[#64748B]! rounded-lg w-8 h-8 flex justify-center items-center hover:bg-[#F1F5F9] transition-colors"
                        style={{ padding: 0 }}
                    >
                        <img src={editIcon} alt="edit" className="w-4 h-4" />
                    </Button>
                    <Button
                        onClick={() => handleDeleteProduct(record.key)}
                        className="p-0 border-[#EF4444]! rounded-lg w-8 h-8 flex justify-center items-center hover:bg-[#FEF2F2] transition-colors"
                        style={{ padding: 0 }}
                    >
                        <Trash2 size={16} className="text-[#EF4444]" />
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div className="p-8 max-w-[1400px] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div className="flex items-center gap-2">
                    <div className="bg-[#DBEAFE] p-2 rounded-lg">
                        <img src={dashboardIcon} alt="dashboard" className="w-5 h-5" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-[#1E293B] m-0">Product Management</h1>
                        <p className="text-sm text-[#64748B]">Manage your product catalog and customization options</p>
                    </div>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-[#2563EB] text-white! h-11 px-6 rounded-xl font-semibold flex items-center gap-2 cursor-pointer shadow-lg shadow-[#2563EB]/20 hover:bg-[#1d4ed8] hover:translate-y-[-1px] transition-all"
                >
                    <img src={plusIcon} alt="plus" className="w-4 h-4" />
                    Add New Product
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] overflow-hidden">
                <Table<ProductData>
                    dataSource={products}
                    columns={columns}
                    pagination={{
                        pageSize: 8,
                        position: ["bottomCenter"],
                        showSizeChanger: false,
                    }}
                    className="custom-pagination product-table"
                />
            </div>

            <style>{`
                .product-table .ant-table {
                    background: transparent;
                }
                .product-table .ant-table-thead > tr > th {
                    background-color: #F8FAFC !important;
                    color: #64748B;
                    font-weight: 600;
                    font-size: 13px;
                    text-transform: uppercase;
                    letter-spacing: 0.025em;
                    border-bottom: 1px solid #E2E8F0;
                    padding: 16px 24px;
                }
                .product-table .ant-table-tbody > tr > td {
                    padding: 16px 24px;
                    border-bottom: 1px solid #F1F5F9;
                }
                .product-table .ant-table-tbody > tr:hover > td {
                    background-color: #F8FAFC !important;
                }
                .custom-pagination .ant-pagination-item {
                    border-radius: 8px;
                    border: 1px solid #E2E8F0;
                }
                .custom-pagination .ant-pagination-item-active {
                    background-color: #2563EB;
                    border-color: #2563EB;
                }
                .custom-pagination .ant-pagination-item-active a {
                    color: white !important;
                }
            `}</style>

            {/* Add Product Modal */}
            <AddProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleAddProduct}
            />

            {/* Edit Product Modal */}
            <EditProductModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSave={handleEditProduct}
                product={selectedProduct}
            />
        </div>
    );
}


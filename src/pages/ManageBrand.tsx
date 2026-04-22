import { Table, Button, Input, Modal } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Trash2 } from "lucide-react";
import editIcon from "../../public/Group (14).svg";
import plusIcon from "../../public/Vector (5).svg";
import { useState } from "react";
import dashboardIcon from "../../public/Group (4).svg";
import { DUMMY_BRANDS } from "../constants/dummyData";

interface BrandData {
    key: string;
    id: number;
    name: string;
}

export default function ManageBrand() {
    const [brands, setBrands] = useState<BrandData[]>(
        DUMMY_BRANDS.map(b => ({ ...b, key: String(b.id) }))
    );
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBrand, setEditingBrand] = useState<BrandData | null>(null);
    const [brandName, setBrandName] = useState("");

    const handleSave = () => {
        if (!brandName.trim()) return;

        if (editingBrand) {
            setBrands(brands.map(b =>
                b.key === editingBrand.key ? { ...b, name: brandName } : b
            ));
        } else {
            const newBrand = {
                key: String(Date.now()),
                id: Date.now(),
                name: brandName
            };
            setBrands([...brands, newBrand]);
        }
        closeModal();
    };

    const handleDelete = (key: string) => {
        setBrands(brands.filter(b => b.key !== key));
    };

    const openModal = (brand?: BrandData) => {
        if (brand) {
            setEditingBrand(brand);
            setBrandName(brand.name);
        } else {
            setEditingBrand(null);
            setBrandName("");
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingBrand(null);
        setBrandName("");
    };

    const columns: ColumnsType<BrandData> = [
        {
            title: "SL",
            dataIndex: "id",
            key: "id",
            width: 80,
            render: (_: any, __: any, index: number) => index + 1,
        },
        {
            title: "Brand Name",
            dataIndex: "name",
            key: "name",
            render: (text: string) => (
                <span className="text-[#1E293B] font-medium">{text}</span>
            ),
        },
        {
            title: "Actions",
            key: "actions",
            width: 150,
            render: (_: any, record: BrandData) => (
                <div className="flex items-center gap-2">
                    <Button
                        onClick={() => openModal(record)}
                        className="p-0 border-[#64748B]! rounded-lg w-8 h-8 flex justify-center items-center hover:bg-[#F1F5F9] transition-colors"
                        style={{ padding: 0 }}
                    >
                        <img src={editIcon} alt="edit" className="w-4 h-4" />
                    </Button>

                    <Button
                        onClick={() => handleDelete(record.key)}
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
        <div className="p-8 mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-2">
                    <div className="bg-[#DBEAFE] p-2 rounded-lg">
                        <img src={dashboardIcon} alt="dashboard" className="w-5 h-5" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-[#1E293B] m-0">Manage Brands</h1>
                        <p className="text-sm text-[#64748B]">Manage your product brands</p>
                    </div>
                </div>
                <button
                    onClick={() => openModal()}
                    className="bg-[#2563EB] text-white! h-11 px-6 rounded-xl font-semibold flex items-center gap-2 cursor-pointer shadow-lg shadow-[#2563EB]/20 hover:bg-[#1d4ed8] transition-all"
                >
                    <img src={plusIcon} alt="plus" className="w-4 h-4" />
                    Add Brand
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] overflow-hidden">
                <Table<BrandData>
                    dataSource={brands}
                    columns={columns}
                    pagination={{ pageSize: 10, position: ["bottomCenter"] }}
                    className="product-table"
                />
            </div>

            <Modal
                title={editingBrand ? "Edit Brand" : "Add New Brand"}
                open={isModalOpen}
                onOk={handleSave}
                onCancel={closeModal}
                okText={editingBrand ? "Update" : "Add"}
                okButtonProps={{ className: "bg-[#2563EB] text-white!" }}
                centered
            >
                <div className="py-4">
                    <label className="block text-sm font-semibold text-[#1E293B] mb-2">
                        Brand Name
                    </label>
                    <Input
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                        placeholder="Enter brand name"
                        className="rounded-lg py-2"
                    />
                </div>
            </Modal>

            <style>{`
                .product-table .ant-table-thead > tr > th {
                    background-color: #F8FAFC !important;
                    color: #64748B;
                    font-weight: 600;
                    padding: 16px 24px;
                }
                .product-table .ant-table-tbody > tr > td {
                    padding: 16px 24px;
                }
            `}</style>
        </div>
    );
}

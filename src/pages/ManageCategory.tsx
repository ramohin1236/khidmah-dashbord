import { Table, Button, Input, Modal } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Trash2 } from "lucide-react";
import editIcon from "../../public/Group (14).svg";
import plusIcon from "../../public/Vector (5).svg";
import { useState } from "react";
import dashboardIcon from "../../public/Group (4).svg";
import { DUMMY_CATEGORIES } from "../constants/dummyData";

interface CategoryData {
    key: string;
    id: number;
    name: string;
}

export default function ManageCategory() {
    const [categories, setCategories] = useState<CategoryData[]>(
        DUMMY_CATEGORIES.map(c => ({ ...c, key: String(c.id) }))
    );
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<CategoryData | null>(null);
    const [categoryName, setCategoryName] = useState("");

    const handleSave = () => {
        if (!categoryName.trim()) return;

        if (editingCategory) {
            setCategories(categories.map(c =>
                c.key === editingCategory.key ? { ...c, name: categoryName } : c
            ));
        } else {
            const newCategory = {
                key: String(Date.now()),
                id: Date.now(),
                name: categoryName
            };
            setCategories([...categories, newCategory]);
        }
        closeModal();
    };

    const handleDelete = (key: string) => {
        setCategories(categories.filter(c => c.key !== key));
    };

    const openModal = (category?: CategoryData) => {
        if (category) {
            setEditingCategory(category);
            setCategoryName(category.name);
        } else {
            setEditingCategory(null);
            setCategoryName("");
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingCategory(null);
        setCategoryName("");
    };

    const columns: ColumnsType<CategoryData> = [
        {
            title: "SL",
            dataIndex: "id",
            key: "id",
            width: 80,
            render: (_: any, __: any, index: number) => index + 1,
        },
        {
            title: "Category Name",
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
            render: (_: any, record: CategoryData) => (
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
                        <h1 className="text-xl font-bold text-[#1E293B] m-0">Manage Categories</h1>
                        <p className="text-sm text-[#64748B]">Organize your products by category</p>
                    </div>
                </div>
                <button
                    onClick={() => openModal()}
                    className="bg-[#2563EB] text-white! h-11 px-6 rounded-xl font-semibold flex items-center gap-2 cursor-pointer shadow-lg shadow-[#2563EB]/20 hover:bg-[#1d4ed8] transition-all"
                >
                    <img src={plusIcon} alt="plus" className="w-4 h-4" />
                    Add Category
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] overflow-hidden">
                <Table<CategoryData>
                    dataSource={categories}
                    columns={columns}
                    pagination={{ pageSize: 10, position: ["bottomCenter"] }}
                    className="product-table"
                />
            </div>

            <Modal
                title={editingCategory ? "Edit Category" : "Add New Category"}
                open={isModalOpen}
                onOk={handleSave}
                onCancel={closeModal}
                okText={editingCategory ? "Update" : "Add"}
                okButtonProps={{ className: "bg-[#2563EB] text-white!" }}
                centered
            >
                <div className="py-4">
                    <label className="block text-sm font-semibold text-[#1E293B] mb-2">
                        Category Name
                    </label>
                    <Input
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        placeholder="Enter category name"
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

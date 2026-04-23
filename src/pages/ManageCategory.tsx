import { Table, Button, Popconfirm, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Trash2 } from "lucide-react";
import editIcon from "../../public/Group (14).svg";
import plusIcon from "../../public/Vector (5).svg";
import { useState } from "react";
import dashboardIcon from "../../public/Group (4).svg";
import { useGetCategoriesQuery, useAddCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation } from "../store/api/categoryApi";
import AddCategoryModal from "../components/categories/AddCategoryModal";
import EditCategoryModal from "../components/categories/EditCategoryModal";

interface CategoryData {
    _id: string;
    name: string;
    image?: string;
}

export default function ManageCategory() {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<CategoryData | null>(null);

    // RTK Query
    const { data: categoryResponse, isLoading: isGetLoading, isFetching } = useGetCategoriesQuery(undefined);
    const [addCategory, { isLoading: isAddLoading }] = useAddCategoryMutation();
    const [updateCategory, { isLoading: isUpdateLoading }] = useUpdateCategoryMutation();
    const [deleteCategory, { isLoading: isDeleteLoading }] = useDeleteCategoryMutation();

    const categories = categoryResponse?.data?.map((c: any) => ({ ...c, key: c._id })) || [];

    const handleAdd = async (formData: FormData) => {
        try {
            await addCategory(formData).unwrap();
            message.success("Category added successfully");
            setIsAddModalOpen(false);
        } catch (error) {
            message.error("Failed to add category");
        }
    };

    const handleUpdate = async (id: string, formData: FormData) => {
        try {
            await updateCategory({ id, data: formData }).unwrap();
            message.success("Category updated successfully");
            setIsEditModalOpen(false);
        } catch (error) {
            message.error("Failed to update category");
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteCategory(id).unwrap();
            message.success("Category deleted successfully");
        } catch (error) {
            message.error("Failed to delete category");
        }
    };

    const columns: ColumnsType<CategoryData> = [
        {
            title: "SL",
            key: "sl",
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
                        onClick={() => { setSelectedCategory(record); setIsEditModalOpen(true); }}
                        className="p-0 border-[#64748B]! rounded-lg w-8 h-8 flex justify-center items-center hover:bg-[#F1F5F9] transition-colors"
                        style={{ padding: 0 }}
                    >
                        <img src={editIcon} alt="edit" className="w-4 h-4" />
                    </Button>

                    <Popconfirm
                        title="Delete category?"
                        onConfirm={() => handleDelete(record._id)}
                        okText="Yes"
                        cancelText="No"
                        okButtonProps={{ danger: true }}
                    >
                        <Button
                            className="p-0 border-[#EF4444]! rounded-lg w-8 h-8 flex justify-center items-center hover:bg-[#FEF2F2] transition-colors"
                            style={{ padding: 0 }}
                        >
                            <Trash2 size={16} className="text-[#EF4444]" />
                        </Button>
                    </Popconfirm>
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
                        <h1 className="text-3xl font-bold text-[#1E293B] m-0">Manage Categories</h1>
                        <p className="text-base text-[#64748B]">Organize your products by category</p>
                    </div>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-[#2563EB] text-white! h-12 px-8 rounded-xl font-bold text-lg flex items-center gap-2 cursor-pointer shadow-lg shadow-[#2563EB]/20 hover:bg-[#1d4ed8] transition-all"
                >
                    <img src={plusIcon} alt="plus" className="w-5 h-5" />
                    Add Category
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] overflow-hidden">
                <Table<CategoryData>
                    dataSource={categories}
                    columns={columns}
                    loading={isGetLoading || isFetching || isDeleteLoading}
                    pagination={{ pageSize: 10, position: ["bottomCenter"] }}
                    className="product-table"
                />
            </div>

            <AddCategoryModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSave={handleAdd}
                isLoading={isAddLoading}
            />

            <EditCategoryModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSave={handleUpdate}
                category={selectedCategory}
                isLoading={isUpdateLoading}
            />

            <style>{`
                .product-table .ant-table-thead > tr > th {
                    background-color: #F8FAFC !important;
                    color: #64748B;
                    font-weight: 700;
                    font-size: 15px;
                    padding: 20px 24px;
                }
                .product-table .ant-table-tbody > tr > td {
                    padding: 20px 24px;
                    font-size: 17px;
                }
            `}</style>
        </div>
    );
}


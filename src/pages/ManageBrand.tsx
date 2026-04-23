import { Table, Button, Popconfirm, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Trash2 } from "lucide-react";
import editIcon from "../../public/Group (14).svg";
import plusIcon from "../../public/Vector (5).svg";
import { useState } from "react";
import dashboardIcon from "../../public/Group (4).svg";
import { useGetBrandsQuery, useAddBrandMutation, useUpdateBrandMutation, useDeleteBrandMutation } from "../store/api/brandApi";
import AddBrandModal from "../components/brands/AddBrandModal";
import EditBrandModal from "../components/brands/EditBrandModal";

interface BrandData {
    _id: string;
    name: string;
}

export default function ManageBrand() {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedBrand, setSelectedBrand] = useState<BrandData | null>(null);

    // RTK Query
    const { data: brandResponse, isLoading: isGetLoading, isFetching } = useGetBrandsQuery(undefined);
    const [addBrand, { isLoading: isAddLoading }] = useAddBrandMutation();
    const [updateBrand, { isLoading: isUpdateLoading }] = useUpdateBrandMutation();
    const [deleteBrand, { isLoading: isDeleteLoading }] = useDeleteBrandMutation();

    const brands = brandResponse?.data?.map((b: any) => ({ ...b, key: b._id })) || [];

    const handleAdd = async (formData: FormData) => {
        try {
            await addBrand(formData).unwrap();
            message.success("Brand added successfully");
            setIsAddModalOpen(false);
        } catch (error) {
            message.error("Failed to add brand");
        }
    };

    const handleUpdate = async (id: string, formData: FormData) => {
        try {
            await updateBrand({ id, data: formData }).unwrap();
            message.success("Brand updated successfully");
            setIsEditModalOpen(false);
        } catch (error) {
            message.error("Failed to update brand");
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteBrand(id).unwrap();
            message.success("Brand deleted successfully");
        } catch (error) {
            message.error("Failed to delete brand");
        }
    };

    const columns: ColumnsType<BrandData> = [
        {
            title: "SL",
            key: "sl",
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
                        onClick={() => { setSelectedBrand(record); setIsEditModalOpen(true); }}
                        className="p-0 border-[#64748B]! rounded-lg w-8 h-8 flex justify-center items-center hover:bg-[#F1F5F9] transition-colors"
                        style={{ padding: 0 }}
                    >
                        <img src={editIcon} alt="edit" className="w-4 h-4" />
                    </Button>

                    <Popconfirm
                        title="Delete brand?"
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
                        <h1 className="text-3xl font-bold text-[#1E293B] m-0">Manage Brands</h1>
                        <p className="text-base text-[#64748B]">Manage your product brands</p>
                    </div>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-[#2563EB] text-white! h-12 px-8 rounded-xl font-bold text-lg flex items-center gap-2 cursor-pointer shadow-lg shadow-[#2563EB]/20 hover:bg-[#1d4ed8] transition-all"
                >
                    <img src={plusIcon} alt="plus" className="w-5 h-5" />
                    Add Brand
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] overflow-hidden">
                <Table<BrandData>
                    dataSource={brands}
                    columns={columns}
                    loading={isGetLoading || isFetching || isDeleteLoading}
                    pagination={{ pageSize: 10, position: ["bottomCenter"] }}
                    className="product-table"
                />
            </div>

            <AddBrandModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSave={handleAdd}
                isLoading={isAddLoading}
            />

            <EditBrandModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSave={handleUpdate}
                brand={selectedBrand}
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


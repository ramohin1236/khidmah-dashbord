import dashboardIcon from "../../public/Group (4).svg";
import plusIcon from "../../public/Vector (5).svg";
import editIcon from "../../public/Group (14).svg";
import { Table, Button, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import AddProductModal from "../components/products/AddProductModal";
import EditProductModal from "../components/products/EditProductModal";
import { useAddProductMutation, useDeleteProductMutation, useGetProductsQuery, useUpdateProductMutation } from "../store/api/baseApi";
import { message } from "antd";

interface ProductData {
    _id: string;
    key: string;
    name: string;
    category: string;
    brand: string;
    image: string;
    customizable: boolean;
}


export default function AddProducts() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null);

    // RTK Query hooks
    const { data: productsResponse, isLoading, isFetching } = useGetProductsQuery(undefined);
    const [addProduct, { isLoading: addLoading }] = useAddProductMutation();
    const [updateProduct, { isLoading: updateLoading }] = useUpdateProductMutation();
    const [deleteProduct, { isLoading: deleteLoading }] = useDeleteProductMutation();

    const products = productsResponse?.data?.map((p: any) => ({ ...p, key: p._id })) || [];

    const handleAddProduct = async (newProduct: Omit<ProductData, "key" | "_id">) => {
        try {
            await addProduct(newProduct).unwrap();
            message.success("Product added successfully");
        } catch (error) {
            message.error("Failed to add product");
            console.error(error);
        } finally {
            setIsModalOpen(false);
        }
    };

    const handleEditProduct = async (id: string, updatedData: Omit<ProductData, "key" | "_id">) => {
        try {
            await updateProduct({ id, ...updatedData }).unwrap();
            message.success("Product updated successfully");
        } catch (error) {
            message.error("Failed to update product");
            console.error(error);
        } finally {
            setIsEditModalOpen(false);
        }
    };

    const handleDeleteProduct = async (id: string) => {
        try {
            await deleteProduct(id).unwrap();
            message.success("Product deleted successfully");
        } catch (error) {
            message.error("Failed to delete product");
            console.error(error);
        }
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
        <div className="p-8 mx-auto">
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
                    loading={isLoading || isFetching}
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
                isLoading={addLoading}
            />

            {/* Edit Product Modal */}
            <EditProductModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSave={handleEditProduct}
                product={selectedProduct}
                isLoading={updateLoading}
            />
        </div>
    );
}


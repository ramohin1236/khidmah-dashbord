import { Table, Button, Popconfirm, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Trash2 } from "lucide-react";
import editIcon from "../../public/Group (14).svg";
import plusIcon from "../../public/Vector (5).svg";
import { useState } from "react";
import dashboardIcon from "../../public/Group (4).svg";
import { useGetClientsQuery, useAddClientMutation, useUpdateClientMutation, useDeleteClientMutation } from "../store/api/clientApi";
import AddClientModal from "../components/clients/AddClientModal";
import EditClientModal from "../components/clients/EditClientModal";

interface ClientData {
    _id: string;
    logo?: string;
}

export default function ManageClients() {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState<ClientData | null>(null);

    const { data: clientResponse, isLoading: isGetLoading, isFetching } = useGetClientsQuery(undefined);
    const [addClient, { isLoading: isAddLoading }] = useAddClientMutation();
    const [updateClient, { isLoading: isUpdateLoading }] = useUpdateClientMutation();
    const [deleteClient, { isLoading: isDeleteLoading }] = useDeleteClientMutation();

    const clients = clientResponse?.data?.map((c: any) => ({ ...c, key: c._id })) || [];

    const handleAdd = async (formData: FormData) => {
        try {
            await addClient(formData).unwrap();
            message.success("Client added successfully");
            setIsAddModalOpen(false);
        } catch (error) {
            message.error("Failed to add client");
        }
    };

    const handleUpdate = async (id: string, formData: FormData) => {
        try {
            await updateClient({ id, data: formData }).unwrap();
            message.success("Client updated successfully");
            setIsEditModalOpen(false);
        } catch (error) {
            message.error("Failed to update client");
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteClient(id).unwrap();
            message.success("Client deleted successfully");
        } catch (error) {
            message.error("Failed to delete client");
        }
    };

    const columns: ColumnsType<ClientData> = [
        {
            title: "SL",
            key: "sl",
            width: 80,
            render: (_: any, __: any, index: number) => index + 1,
        },
        {
            title: "Logo",
            dataIndex: "logo",
            key: "logo",
            render: (_: any, record: ClientData) => (
                <div className="flex items-center gap-3">
                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                        {record.logo ? <img src={record.logo} alt="logo" className="w-full h-full object-contain" /> : <span className="text-sm text-[#64748B]">No logo</span>}
                    </div>
                </div>
            ),
        },
        {
            title: "Actions",
            key: "actions",
            width: 150,
            render: (_: any, record: ClientData) => (
                <div className="flex items-center gap-2">
                    <Button
                        onClick={() => { setSelectedClient(record); setIsEditModalOpen(true); }}
                        className="p-0 border-[#64748B]! rounded-lg w-8 h-8 flex justify-center items-center hover:bg-[#F1F5F9] transition-colors"
                        style={{ padding: 0 }}
                    >
                        <img src={editIcon} alt="edit" className="w-4 h-4" />
                    </Button>

                    <Popconfirm
                        title="Delete client?"
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
                        <h1 className="text-3xl font-bold text-[#1E293B] m-0">Manage Clients</h1>
                        <p className="text-base text-[#64748B]">Manage client logos and details</p>
                    </div>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-[#2563EB] text-white! h-12 px-8 rounded-xl font-bold text-lg flex items-center gap-2 cursor-pointer shadow-lg shadow-[#2563EB]/20 hover:bg-[#1d4ed8] transition-all"
                >
                    <img src={plusIcon} alt="plus" className="w-5 h-5" />
                    Add Client
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-[#E2E8F0] overflow-hidden">
                <Table<ClientData>
                    dataSource={clients}
                    columns={columns}
                    loading={isGetLoading || isFetching || isDeleteLoading}
                    pagination={{ pageSize: 10, position: ["bottomCenter"] }}
                    className="product-table"
                />
            </div>

            <AddClientModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSave={handleAdd}
                isLoading={isAddLoading}
            />

            <EditClientModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSave={handleUpdate}
                client={selectedClient}
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

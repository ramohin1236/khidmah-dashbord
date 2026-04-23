export default function Settings() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-slate-800">Settings</h1>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                <h2 className="text-lg font-semibold text-slate-800 mb-4">General Settings</h2>
                <div className="space-y-4 max-w-md">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Store Name</label>
                        <input
                            type="text"
                            defaultValue="Khidmah Store"
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Email Notifications</label>
                        <div className="flex items-center gap-2">
                            <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 rounded" />
                            <span className="text-slate-600">Enable daily reports</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

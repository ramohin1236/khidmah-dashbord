import { useRoutes } from 'react-router-dom';
import Layout from '../components/Layout';
import Dashboard from '../pages/Dashboard';
import AddProducts from '../pages/AddProducts';

import 'antd/dist/reset.css';
import ManageCategory from '../pages/ManageCategory';
import ManageBrand from '../pages/ManageBrand';


export default function AppRoutes() {
    const element = useRoutes([
        {
            path: '/',
            element: <Layout />,
            children: [
                { index: true, element: <Dashboard /> },
                // { path: 'manage_users', element: <ManageUsers /> },
                // { path: 'manage_users/:id', element: <UserDetails /> },
                // { path: 'manage_claims', element: <ManageClaims /> },
                // { path: 'manage_claims/:id', element: <ManageClaimDetails /> },
                { path: 'add_products', element: <AddProducts /> },
                { path: 'manage_category', element: <ManageCategory /> },
                { path: 'manage_brand', element: <ManageBrand /> },
                // { path: 'manage_faq', element: <ManageFaq /> },
                // { path: 'terms_conditions', element: <TermsConditions /> },
                // { path: 'privacy_policy', element: <PrivacyPolicy /> },
                // { path: 'manage_profile', element: <ManageProfile /> },
                // { path: 'update_profile', element: <UpdateProfile /> },
                // { path: 'update_password', element: <UpdatePassword /> },
            ],
        },
    ]);

    return element;
}

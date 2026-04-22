import { useRoutes } from 'react-router-dom';
import Layout from '../components/Layout';
import Dashboard from '../pages/Dashboard';
import ManageUsers from '../pages/ManageUsers';
import ManageClaims from '../pages/ManageClaims';
import ClaimlyGuides from '../pages/ClaimlyGuides';
import ManageFaq from '../pages/ManageFaq';
import TermsConditions from '../pages/TermsConditions';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import ManageProfile from '../pages/ManageProfile';
import UserDetails from '../pages/UserDetails';
import 'antd/dist/reset.css';
import ManageClaimDetails from '../components/manageClaim/ManageClaimDetails';
import UpdateProfile from '../pages/UpdateProfile';
import UpdatePassword from '../pages/UpdatePassword';
import ManageCategory from '../pages/ManageCategory';
import ManageBrand from '../pages/ManageBrand';


export default function AppRoutes() {
    const element = useRoutes([
        {
            path: '/',
            element: <Layout />,
            children: [
                { index: true, element: <Dashboard /> },
                { path: 'manage_users', element: <ManageUsers /> },
                { path: 'manage_users/:id', element: <UserDetails /> },
                { path: 'manage_claims', element: <ManageClaims /> },
                { path: 'manage_claims/:id', element: <ManageClaimDetails /> },
                { path: 'claimly_guides', element: <ClaimlyGuides /> },
                { path: 'manage_category', element: <ManageCategory /> },
                { path: 'manage_brand', element: <ManageBrand /> },
                { path: 'manage_faq', element: <ManageFaq /> },
                { path: 'terms_conditions', element: <TermsConditions /> },
                { path: 'privacy_policy', element: <PrivacyPolicy /> },
                { path: 'manage_profile', element: <ManageProfile /> },
                { path: 'update_profile', element: <UpdateProfile /> },
                { path: 'update_password', element: <UpdatePassword /> },
            ],
        },
    ]);

    return element;
}

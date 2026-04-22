import { Link, NavLink } from 'react-router-dom';
import logo from '../../public/Logo 3.svg';
import logout from '../../public/Group (20).svg';
import sidenavcollapseLogo from '../../public/vite.svg';

interface SidebarProps {
  isCollapsed: boolean;
}

export default function Sidebar({ isCollapsed }: SidebarProps) {
  const navItems = [
    { icon: '/dashbord.svg', label: 'Dashboard', path: '/' },
    { icon: '/manageUser.svg', label: 'Manage Users', path: '/manage_users' },
    { icon: '/manageClaims.svg', label: 'Manage Claims', path: '/manage_claims' },
    { icon: '/claimlyGuides.svg', label: 'Add Products', path: '/claimly_guides' },
    { icon: '/manageFaq.svg', label: 'Manage Category', path: '/manage_category' },
    { icon: '/manageFaq.svg', label: 'Manage Brand', path: '/manage_brand' },
    { icon: '/manageFaq.svg', label: 'Manage FAQ', path: '/manage_faq' },
    { icon: '/termsCondition.svg', label: 'Terms & Conditions', path: '/terms_conditions' },
    { icon: '/privacyPolicy.svg', label: 'Privacy Policy', path: '/privacy_policy' },
    { icon: '/manageProgile.svg', label: 'Manage Profile', path: '/manage_profile' }
  ];

  return (
    <div className={`h-screen bg-white border-r border-slate-200 flex flex-col fixed left-0 top-0 text-slate-800 transition-all duration-300 z-50 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      <div className={`p-6 flex justify-center items-center h-24 overflow-hidden`}>
        <Link to="/">
          <img src={isCollapsed ? sidenavcollapseLogo : logo} alt="" className={`transition-all duration-300 ${isCollapsed ? 'w-10 min-w-[40px] h-10' : 'w-36'}`} />
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group relative ${isActive
                ? 'bg-[#2563EB] border border-blue-100 text-white'
                : 'hover:bg-slate-50'
              } ${isCollapsed ? 'justify-center px-0' : ''}`
            }
            title={isCollapsed ? item.label : ''}
          >
            {({ isActive }) => (
              <>
                <div
                  className={`w-5 h-5 transition-colors duration-200 flex-shrink-0 ${isActive ? 'bg-white' : 'bg-gradient-to-r from-[#1E293B] to-[#2563EB]'}`}
                  style={{
                    maskImage: `url(${item.icon})`,
                    WebkitMaskImage: `url(${item.icon})`,
                    maskRepeat: 'no-repeat',
                    WebkitMaskRepeat: 'no-repeat',
                    maskPosition: 'center',
                    WebkitMaskPosition: 'center',
                    maskSize: 'contain',
                    WebkitMaskSize: 'contain'
                  }}
                />
                {!isCollapsed && (
                  <span className={`font-medium transition-all duration-300 opacity-100 whitespace-nowrap ${isActive ? 'text-white' : 'bg-gradient-to-r from-[#1E293B] to-[#2563EB] bg-clip-text text-transparent'}`}>
                    {item.label}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-[1px] my-2 bg-gradient-to-r from-[#1E293B] to-[#2563EB] rounded-md mx-2">
        <button className={`flex items-center cursor-pointer gap-3 px-4 py-3 w-full rounded-[5px] bg-white hover:bg-slate-50 transition-colors ${isCollapsed ? 'justify-center px-0' : ''}`}>
          <img src={logout} alt="" className="w-5 h-5 transition-transform group-hover:scale-110" />
          {!isCollapsed && <span className="font-medium whitespace-nowrap bg-gradient-to-r from-[#1E293B] to-[#2563EB] bg-clip-text text-transparent">Logout</span>}
        </button>
      </div>
    </div >
  );
}

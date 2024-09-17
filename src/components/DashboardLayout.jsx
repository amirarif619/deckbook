// src/components/DashboardLayout.jsx
import Sidebar from './Sidebar';
import { useSelector } from 'react-redux';

function DashboardLayout({ children }) {
  const isSidebarVisible = useSelector((state) => state.sidebar.isVisible); // Get sidebar visibility from Redux

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Render sidebar if it's visible */}
        {isSidebarVisible && (
          <div className="col-2">
            <Sidebar />
          </div>
        )}
        {/* Adjust the main content area based on sidebar visibility */}
        <div className={isSidebarVisible ? 'col-10' : 'col-12'}>
          {children} {/* Main content goes here */}
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;

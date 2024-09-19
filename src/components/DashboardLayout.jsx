import Sidebar from './Sidebar';
import AppNavbar from './Navbar';

function DashboardLayout({ children }) {
  return (
    <div className="container-fluid p-0">
      <AppNavbar />
      <div className="row">
        <div className="col-2">
          <Sidebar />
        </div>
        <div className="col-10">
          {children} {/* Main content goes here */}
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;

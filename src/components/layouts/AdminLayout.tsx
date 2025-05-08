import { FC } from 'react';
import { Outlet } from 'react-router-dom';

const AdminLayout: FC = () => {
  return (
    <div className="container mx-auto p-6">
      <Outlet />
    </div>
  );
};

export default AdminLayout;
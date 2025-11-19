import { FC } from 'react';

const AdminLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="container mx-auto p-6">
      {children}
    </div>
  );
};

export default AdminLayout;
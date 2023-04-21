import Header from '@/components/partials/Header';

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default MainLayout;

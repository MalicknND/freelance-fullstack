import Title from '@/components/UI/Title';
import Featured from '@/components/UI/Featured';
import Caroussel from '@/components/UI/Caroussel';

import Partner from '@/components/UI/Partner';
import Footer from '@/components/partials/Footer';
import Header from '@/components/partials/Header';

export default function Home() {
  return (
    <>
      <Header />
      <Featured />
      <Partner />
      {/* <Title title="Homepage" Level="h1" /> */}
      <Caroussel />

      <Footer />
    </>
  );
}

import React from 'react';
import Featured from '@/components/UI/Featured';
import About from '@/components/UI/About';
import Partner from '@/components/UI/Partner';
import Footer from '@/components/partials/Footer';

export default function Home() {
  return (
    <>
      <Featured />
      <Partner />
      <About />
      <Footer />
    </>
  );
}

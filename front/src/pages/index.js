import React from 'react';
import Title from '@/components/UI/Title';
import Freelances from '@/components/UI/Freelances';
import Featured from '@/components/UI/Featured';
import Caroussel from '@/components/UI/Caroussel';
import About from '@/components/UI/About';
import Partner from '@/components/UI/Partner';
import Footer from '@/components/partials/Footer';
import Card from '@/components/UI/Card';

export default function Home() {
  const [data, setData] = React.useState([]);
  // console.log(process.env.NEXT_PUBLIC_API_URL);

  React.useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/freelance/search`, {
      headers: {
        'Content-Type': 'Application/json',
      },

      method: 'POST',
    })
      .then((response) => response.json())
      .then((data) => setData(data.freelances));
  }, []);

  console.log(data);
  return (
    <>
      <Featured />
      <Partner />
      <About />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: '80%',
            display: 'flex',
            gap: '40px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {data.map((freelance) => (
            <Card freelance={freelance} />
          ))}
        </div>
      </div>
      {/* <Card /> */}
      {/* <Caroussel /> */}
      <Footer />
    </>
  );
}

import React from 'react';
import Title from '@/components/UI/Title';
import Freelances from '@/components/UI/Freelances';
import Featured from '@/components/UI/Featured';
import Caroussel from '@/components/UI/Caroussel';

import Partner from '@/components/UI/Partner';
import Footer from '@/components/partials/Footer';

export default function Home() {
  const [data, setData] = React.useState([]);
  // console.log(process.env.NEXT_PUBLIC_API_URL);

  React.useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/freelance`, {
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
      <div style={{ display: 'flex', justifyContent: 'center', gap: '25px' }}>
        {data.map((freelance) => (
          <Freelances freelance={freelance} />
        ))}
      </div>
      <Caroussel />
      <Footer />
    </>
  );
}

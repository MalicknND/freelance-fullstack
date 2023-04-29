// import React from 'react';
// import Card from '@/components/UI/Card';

// const index = () => {
//   const [data, setData] = React.useState([]);
//   // console.log(process.env.NEXT_PUBLIC_API_URL);

//   React.useEffect(() => {
//     fetch(`${process.env.NEXT_PUBLIC_API_URL}/freelance/search`, {
//       headers: {
//         'Content-Type': 'Application/json',
//       },

//       method: 'POST',
//     })
//       .then((response) => response.json())
//       .then((data) => setData(data.freelances));
//   }, []);

//   console.log(data);
//   return (
//     <div
//       style={{
//         display: 'flex',
//         flexWrap: 'nowrap',
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         width: '80%',
//         gap: '25px',
//       }}
//     >
//       {data.map((freelance) => (
//         <Card freelance={freelance} />
//       ))}
//     </div>
//   );
// };

// export default index;

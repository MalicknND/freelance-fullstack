// import { useState, useEffect, useContext } from 'react';
// import useFetch from '@/hooks/useFetch';
// import UserContext from '@/context/UserContext';

// const Index = () => {
//   const [token, setToken] = useState(null);
//   const { isLogged, user, updateUser } = useContext(UserContext);

//   const { fetchData, data, error, loading } = useFetch({
//     url: '/user/admin/users',
//     method: 'GET',
//     body: null,
//     token: token,
//   });

//   useEffect(() => {
//     setToken(localStorage.getItem('token'));
//   }, []);

//   useEffect(() => {
//     if (token != null) {
//       fetchData();
//     }
//   }, [token]);

//   useEffect(() => {
//     if (data.success == true) {
//       console.log(data);
//     }
//   }, [data]);

//   return <div>index</div>;
// };

// export default Index;

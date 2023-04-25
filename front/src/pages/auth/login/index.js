import { useState, useEffect, useContext } from 'react';
import UserContext from '@/context/UserContext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useFetch from '@/hooks/useFetch';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button/';
import Title from '@/components/UI/Title';
import Loading from '@/components/UI/Loading';

import Notification from '@/components/UI/Notification';

const Index = () => {
  const router = useRouter();

  const { login } = useContext(UserContext);

  const [userForm, setUserForm] = useState({
    email: '',
    password: '',
  });

  const [token, setToken] = useState();

  const { fetchData, data, error, loading } = useFetch({
    url: '/auth/login',
    method: 'POST',
    body: userForm,
    token: null,
  });
  const {
    data: user,
    error: userError,
    loading: userLoading,
    fetchData: fetchDataUser,
  } = useFetch({ url: '/user', method: 'GET', body: null, token: token });

  useEffect(() => {
    if (data.token) {
      setToken(data.token);
      localStorage.setItem('token', data.token);
      // router.push('/account/profil');
    }
  }, [data]);

  //ce code permet de fetcher les données de l'utilisateur et de les stocker dans le context

  useEffect(() => {
    fetchDataUser();
    if (user.success) {
      login({
        firstName: user.user.firstName,
        lastName: user.user.lastName,
        email: user.user.email,
        phone: user.user.phone,
        userType: user.user.userType,
        address: {
          city: user.user.address.city,
          zipCode: user.user.address.zipCode,
          street: user.user.address.street,
        },
      });
      router.push('/account/profil');
    }
  }, [token, user]);

  //ce code est à mettre dans le fichier useFetch.js
  const handleChange = (e) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value,
    });
  };

  const submitLogin = (e) => {
    e.preventDefault();
    fetchData();
    if (error) console.log(error);
  };

  return (
    <>
      <Loading isLoad={loading} />
      <Title title="Connexion" Level="h1" />
      <form onSubmit={(e) => submitLogin(e)}>
        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="veuillez saisir votre email"
          isRequired={true}
          onChange={(e) => handleChange(e)}
          value={userForm.email}
        />

        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="veuillez saisir votre mot de passe"
          isRequired={true}
          onChange={(e) => handleChange(e)}
          value={userForm.password}
        />
        <Button type="submit" title="Se connecter" className="btn__secondary" />
      </form>
      <br />
      {error && <Notification type="warning" message={error.message} />}
      <p>
        Pas de compte ? <Link href="/auth/accounts">Inscrivez-vous ?</Link>
      </p>
    </>
  );
};

export default Index;

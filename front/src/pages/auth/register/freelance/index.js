import { useState, useEffect, useContext } from 'react';
import styles from './index.module.scss';
import useFetch from '@/hooks/useFetch';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Title from '@/components/UI/Title';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import UserContext from '@/context/UserContext';

const Index = () => {
  const router = useRouter();
  // cette variable permet de stocker le token de l'utilisateur
  const { login, user } = useContext(UserContext);
  const [token, setToken] = useState(null);
  const [userForm, setUserForm] = useState({
    firstName: '',
    lastName: '',
    password: '',
    email: '',
    phone: '',
    userType: 'FREELANCE',
    address: {
      city: '',
      zipCode: '',
      street: '',
    },
  });
  const [freelanceForm, setFreelanceForm] = useState({
    rate: 0,
    yearOfExperience: 0,
  });

  // useFetch est un custom hook qui permet de faire des requêtes http et de gérer les erreurs, le loading et les données
  const { fetchData, data, error, loading } = useFetch({
    url: '/auth/register',
    method: 'POST',
    body: userForm,
    token: null,
  });

  // pour fetcher les données du freelance
  const {
    data: freelance,
    error: freelanceError,
    loading: freelanceLoading,
    fetchData: fetchDataFreelance,
  } = useFetch({
    url: '/auth/freelance',
    method: 'POST',
    body: freelanceForm,
    token: token,
  });

  // cette fonction permet de mettre à jour le state userForm et de gérer les changements dans les inputs
  const handleChange = (e) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === 'zipCode') {
      userForm.address.zipCode = e.target.value;
    }
    if (e.target.name === 'city') {
      userForm.address.city = e.target.value;
    }
    if (e.target.name === 'street') {
      userForm.address.street = e.target.value;
    }
  };

  //cette fonction permet de mettre à jour le state freelanceForm et de gérer les changements dans les inputs
  const handleChangeFreelance = (e) => {
    setFreelanceForm({
      ...freelanceForm,
      [e.target.name]: e.target.value,
    });
  };

  // cette fonction permet de soumettre le formulaire d'inscription et de gérer les erreurs et e.preventDefault() permet de ne pas recharger la page
  const submitRegister = (e) => {
    e.preventDefault();
    fetchData();
    if (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(data);
    if (data.success == true) {
      if (data.token) {
        console.log('coucou');
        console.log(data);
        setToken(data.token);
        localStorage.setItem('token', data.token);
      }
      console.log(data);
      login(userForm);
      router.push('/');
    }
  }, [data]);

  // permet de verifier si le token est présent dans le localstorage et de faire la requête pour récupérer les données du freelance
  useEffect(() => {
    if (token != null) {
      fetchDataFreelance();
    }
  }, [token]);

  return (
    <>
      <Title title="Freelancer" Level="h1" />
      <form onSubmit={(e) => submitRegister(e)}>
        <div className={styles.username}>
          <Input
            label=""
            type="text"
            name="firstName"
            placeholder="prénom"
            required={true}
            onChange={(e) => handleChange(e)}
            value={userForm.firstName}
          />
          <Input
            label=""
            type="text"
            name="lastName"
            placeholder="nom"
            required={true}
            onChange={(e) => handleChange(e)}
            value={userForm.lastName}
          />
        </div>
        <div className={styles.username}>
          <Input
            label=""
            type="number"
            name="phone"
            placeholder="Téléphone"
            required={true}
            onChange={(e) => handleChange(e)}
            value={userForm.phone}
          />
          <Input
            label=""
            type="number"
            name="zipCode"
            placeholder="Code postal"
            required={true}
            onChange={(e) => handleChange(e)}
            value={userForm.address.zipCode}
          />
        </div>
        <div className={styles.username}>
          <Input
            label=""
            type="text"
            name="street"
            placeholder="rue"
            required={true}
            onChange={(e) => handleChange(e)}
            value={userForm.address.street}
          />
          <Input
            label=""
            type="text"
            name="city"
            placeholder="Paris"
            required={true}
            onChange={(e) => handleChange(e)}
            value={userForm.address.city}
          />
        </div>

        <Input
          label=""
          type="email"
          name="email"
          placeholder="veuillez saisir votre email"
          required={true}
          onChange={(e) => handleChange(e)}
          value={userForm.email}
        />
        <Input
          label=""
          type="password"
          name="password"
          placeholder="veuillez saisir votre mot de passe"
          required={true}
          onChange={(e) => handleChange(e)}
          value={userForm.password}
        />
        <div className={styles.username}>
          <Input
            label="Tarif "
            type="number"
            name="rate"
            placeholder="0"
            required={true}
            onChange={(e) => handleChangeFreelance(e)}
            value={userForm.rate}
          />
          <Input
            label="Expérience"
            type="number"
            name="yearOfExperience"
            placeholder="0"
            required={true}
            onChange={(e) => handleChangeFreelance(e)}
            value={userForm.yearOfExperience}
          />
        </div>
        <Button type="submit" title="S'inscrire" className="btn__secondary" />
      </form>

      <p>
        Déjà membre ? <Link href="/auth/login">Connectez-vous ?</Link>
      </p>
    </>
  );
};

export default Index;

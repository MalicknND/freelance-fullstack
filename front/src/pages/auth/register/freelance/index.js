import { useState } from 'react';
import styles from './index.module.scss';

import Link from 'next/link';
import Title from '@/components/UI/Title';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import BtnStep from '@/components/UI/BtnStep';

const Index = () => {
  const [userForm, setUserForm] = useState({
    firstName: '',
    lastName: '',
    password: '',
    email: '',
    phone: '',
    userType: '',
    address: {
      city: '',
      zipCode: 0,
      street: '',
    },
  });

  const handleChange = (e) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Title title="Inscription" Level="h1" />
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
            label=" "
            type="number"
            name="zipCode"
            placeholder="Code postal"
            required={true}
            onChange={(e) => handleChange(e)}
            value={userForm.zipCode}
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
            onChange={(e) => handleChange(e)}
            value={userForm.rate}
          />
          <Input
            label="Expérience"
            type="number"
            name="yearOfExperience"
            placeholder="0"
            required={true}
            onChange={(e) => handleChange(e)}
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

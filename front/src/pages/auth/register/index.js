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
    email: '',
    password: '',
  });

  return (
    <>
      <Title title="Inscription" Level="h1" />
      <form onSubmit={(e) => submitRegister(e)}>
        <div className={styles.username}>
          <Input
            label="Firstname"
            type="firstName"
            name="firstName"
            className={styles.first}
            placeholder="veuillez saisir votre prénom"
            required={true}
            onChange={(e) => handleChange(e)}
            value={userForm.firstName}
          />
          <Input
            label="Lastname"
            type="lastName"
            name="lastName"
            className={styles.first}
            placeholder="veuillez saisir votre nom"
            required={true}
            onChange={(e) => handleChange(e)}
            value={userForm.lastName}
          />
        </div>
        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="veuillez saisir votre email"
          required={true}
          onChange={(e) => handleChange(e)}
          value={userForm.email}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="veuillez saisir votre mot de passe"
          required={true}
          onChange={(e) => handleChange(e)}
          value={userForm.password}
        />
        {/* <Button type="submit" title="Se connecter" className="btn__secondary" /> */}
        <BtnStep type="submit" title="Suivant" className="btn__secondary" />
      </form>

      <p>
        Vous avez déjà un compte ?{' '}
        <Link href="/auth/login">Connectez-vous ?</Link>
      </p>
    </>
  );
};

export default Index;

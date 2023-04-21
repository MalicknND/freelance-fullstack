import { useState } from 'react';

import Link from 'next/link';
import Title from '@/components/UI/Title';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';

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
        <Input
          label="Firstname"
          type="firstName"
          name="firstName"
          placeholder="veuillez saisir votre prénom"
          required={true}
          onChange={(e) => handleChange(e)}
          value={userForm.firstName}
        />
        <Input
          label="Lastname"
          type="lastName"
          name="lastName"
          placeholder="veuillez saisir votre nom"
          required={true}
          onChange={(e) => handleChange(e)}
          value={userForm.lastName}
        />
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
        <Button type="submit" title="Se connecter" className="btn__secondary" />
      </form>

      <p>
        Vous avez déjà un compte ?{' '}
        <Link href="/auth/login">Connectez-vous ?</Link>
      </p>
    </>
  );
};

export default Index;

import { useState, useEffect, useContext } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button/';
import Title from '@/components/UI/Title';

const Index = () => {
  const [userForm, setUserForm] = useState({
    email: '',
    password: '',
  });

  return (
    <>
      <Title title="Login" Level="h1" />
      <form onSubmit={(e) => submitLogin(e)}>
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
        Vous n'avez pas de compte ?{' '}
        <Link href="/auth/register">Inscrivez-vous ?</Link>
      </p>
    </>
  );
};

export default Index;

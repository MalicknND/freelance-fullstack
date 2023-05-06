import { useEffect, useState } from 'react';
import useFetch from '@/hooks/useFetch';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button/';
import Title from '@/components/UI/Title';
import Notification from '@/components/UI/Notification';

const index = () => {
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [token, setToken] = useState(null); // initialisé à null

  const { fetchData, data, error, loading } = useFetch({
    url: '/user/reset-password',
    method: 'POST',
    body: { ...passwordForm }, // ajout du token dans le body de la requête
    token: token, // ajout du token dans le header de la requête
  });

  useEffect(() => {
    if (data.token) {
      setToken(data.token);
      localStorage.setItem('token', data.token);
    }
  }, [data]);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleChange = (e) => {
    setPasswordForm({
      ...passwordForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmNewPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }
    fetchData();
  };

  return (
    <>
      <Title title="Réinitialisation de mot de passe" Level="h1" />
      <form onSubmit={handleSubmit}>
        <Input
          label="Ancien mot de passe"
          type="password"
          name="oldPassword"
          placeholder="Entrez votre ancien mot de passe"
          isRequired={true}
          onChange={handleChange}
          value={passwordForm.oldPassword}
        />
        <Input
          label="Nouveau mot de passe"
          type="password"
          name="newPassword"
          placeholder="Entrez votre nouveau mot de passe"
          isRequired={true}
          onChange={handleChange}
          value={passwordForm.newPassword}
        />
        <Input
          label="Confirmer le nouveau mot de passe"
          type="password"
          name="confirmNewPassword"
          placeholder="Confirmez votre nouveau mot de passe"
          isRequired={true}
          onChange={handleChange}
          value={passwordForm.confirmNewPassword}
        />
        <Button
          type="submit"
          title="Réinitialiser"
          className="btn__secondary"
          disabled={loading}
        />
      </form>
      {/* {data && <Notification type="success" message={data.message} />} */}
      {error && <Notification type="warning" message={error.message} />}
    </>
  );
};

export default index;

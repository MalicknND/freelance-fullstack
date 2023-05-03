import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import UserContext from '@/context/UserContext';
import useFetch from '@/hooks/useFetch';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import Modal from '@/components/UI/Modal';
import Loading from '@/components/UI/Loading';
import Title from '@/components/UI/Title';
import Container from '@/components/UI/Container';
import styles from './index.module.scss';
import Alert from '@mui/material/Alert';

const Index = () => {
  const router = useRouter();

  const { isLogged, user, updateUser } = useContext(UserContext);

  const [token, setToken] = useState();

  const [userForm, setUserForm] = useState();

  const [isOpen, setIsOpen] = useState(false);

  const {
    data: dataUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
    fetchData: fetchDataUpdate,
    error,
  } = useFetch({ url: '/user', method: 'PUT', body: userForm, token: token });

  useEffect(() => {
    setUserForm(user);
  }, [user]);

  useEffect(() => {
    if (dataUpdate.success) {
      setIsOpen(false);
      updateUser(dataUpdate.user);
    }
  }, [dataUpdate]);

  if (loadingUpdate) return <Loading />;
  if (errorUpdate) console.log(errorUpdate);

  const handleChange = (e) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    setToken(token);
    fetchDataUpdate();
    if (dataUpdate.success) {
      alert('Votre profil a bien été modifié !');
      setIsOpen(false);
    }
  };
  console.log(userForm);
  return (
    <>
      {isLogged ? (
        <>
          {isOpen && (
            <Modal
              title="Modifier mon profil"
              closeModal={() => setIsOpen(false)}
            >
              {error && (
                <Alert severity="error">
                  Oups, une erreur s'est produite. Veuillez cliquer le bouton
                  puis réinitialiser.
                </Alert>
              )}
              <br />
              <form
                onSubmit={(e) => {
                  submitForm(e);
                }}
              >
                <Input
                  label="Prénom"
                  type="text"
                  name="firstName"
                  value={userForm.firstName}
                  isRequired={true}
                  placeholder="entrer votre prénom"
                  onChange={(e) => handleChange(e)}
                />
                <Input
                  label="Nom"
                  type="text"
                  name="lastName"
                  value={userForm.lastName}
                  isRequired={true}
                  placeholder="entrer votre nom"
                  onChange={(e) => handleChange(e)}
                />
                <Input
                  label="Email"
                  type="text"
                  name="email"
                  value={userForm.email}
                  isRequired={true}
                  placeholder="entrer votre email"
                  onChange={(e) => handleChange(e)}
                />
                <Input
                  label="Numéro de portable"
                  type="tel"
                  name="phone"
                  value={userForm.phone}
                  isRequired={true}
                  placeholder="entrer votre numéro de portable"
                  onChange={(e) => handleChange(e)}
                />
                <Input
                  label="Addresse"
                  type="adress"
                  name="street"
                  placeholder="entrer votre rue"
                  isRequired={true}
                  onChange={(e) => handleChange(e)}
                  value={userForm.address.street}
                />
                <Input
                  label="Code postal"
                  type="zipcode"
                  name="zipCode"
                  maxLength="5"
                  placeholder="entrer votre code postal"
                  isRequired={true}
                  onChange={(e) => handleChange(e)}
                  value={userForm.address.zipCode}
                />
                <Input
                  label="Ville"
                  type="city"
                  name="city"
                  placeholder="entrer votre ville"
                  isRequired={true}
                  onChange={(e) => handleChange(e)}
                  value={userForm.address.city}
                />
                <Button
                  type="submit"
                  title="modifier"
                  className="btn__primary"
                />
              </form>
            </Modal>
          )}
          <Container>
            <div className={styles.formulaire}>
              <div className={styles.title}>
                <Title title="Mon profil" Level="h1" />
              </div>
              {user && (
                <>
                  <p>Le type de votre compte : {user.userType}</p>
                  <br />
                  <p>Prénom : {user.firstName}</p>
                  <br />
                  <p>Nom : {user.lastName}</p>
                  <br />
                  <p>Email : {user.email}</p>
                  <br />
                  <p>Numéro de portable : {user.phone}</p>
                  <br />
                  <p>Adresse : {user.address.street}</p>
                  <br />
                  <p>Code postal : {user.address.zipCode}</p>
                  <br />
                  <p>Ville : {user.address.city}</p>
                  <br />
                </>
              )}
              <div className={styles.wrapper}>
                <div className={styles.buttons_wrapper}>
                  <div className={styles.button_first}>
                    <Button
                      title="Modifier mon profil"
                      className="btn__primary"
                      type="button"
                      handleClick={() => {
                        setIsOpen(true);
                      }}
                    />
                  </div>
                  {user?.userType === 'COMPANY' ? (
                    <>
                      <div className={styles.button_second}>
                        <Button
                          type="button"
                          title="Voir mon entreprise"
                          className="btn__secondary"
                          handleClick={() =>
                            router.push('/account/profil/entreprise')
                          }
                        />
                      </div>
                    </>
                  ) : null}
                  {user?.userType === 'FREELANCE' ? (
                    <>
                      <div className={styles.button_second}>
                        <Button
                          type="button"
                          title="Voir mon poste"
                          className="btn__secondary"
                          handleClick={() =>
                            router.push('/account/profil/freelance')
                          }
                        />
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </Container>
        </>
      ) : null}
    </>
  );
};

export default Index;

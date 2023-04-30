import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import UserContext from '@/context/UserContext';
import useFetch from '@/hooks/useFetch';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import Modal from '@/components/UI/Modal';
import Loading from '@/components/UI/Loading';
import Title from '@/components/UI/Title';

import styles from './index.module.scss';

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
    const token = localStorage.getItem('token');

    setToken(token);
  }, [user]);

  useEffect(() => {
    if (dataUpdate.success) {
      setIsOpen(false);
      updateUser(dataUpdate.user);
    }
  }, [dataUpdate]);

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

  const submitForm = (e) => {
    e.preventDefault();

    fetchDataUpdate();
    if (dataUpdate.success) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {isLogged ? (
        <>
          {isOpen && (
            <Modal
              title="Modifier mon profil"
              closeModal={() => setIsOpen(false)}
            >
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
                  className="btn__secondary"
                />
              </form>
            </Modal>
          )}

          <div className={styles.formulaire}>
            <div className={styles.title}></div>
            {user && (
              <div className={styles.profile_container}>
                <div className={styles.profile_card}>
                  <div className={styles.profile_card_header}>
                    <Title title="Mon profil" Level="h1" />
                    <Button
                      title="Modifier"
                      className="btn__tertiary"
                      type="button"
                      handleClick={() => {
                        setIsOpen(true);
                      }}
                    />
                  </div>
                  <div className={styles.profile_card_body}>
                    <div className={styles.profile_info}>
                      <p className={styles.profile_info_label}>
                        Type de compte :
                      </p>
                      <p className={styles.profile_info_value}>
                        {user.userType}
                      </p>
                    </div>
                    <div className={styles.profile_info}>
                      <p className={styles.profile_info_label}>Prénom :</p>
                      <p className={styles.profile_info_value}>
                        {user.firstName}
                      </p>
                    </div>
                    <div className={styles.profile_info}>
                      <p className={styles.profile_info_label}>Nom :</p>
                      <p className={styles.profile_info_value}>
                        {user.lastName}
                      </p>
                    </div>
                    <div className={styles.profile_info}>
                      <p className={styles.profile_info_label}>Email :</p>
                      <p className={styles.profile_info_value}>{user.email}</p>
                    </div>
                    <div className={styles.profile_info}>
                      <p className={styles.profile_info_label}>
                        Numéro de portable :
                      </p>
                      <p className={styles.profile_info_value}>{user.phone}</p>
                    </div>
                    <div className={styles.profile_info}>
                      <p className={styles.profile_info_label}>Adresse :</p>
                      <p className={styles.profile_info_value}>
                        {user.address.street}
                      </p>
                    </div>
                    <div className={styles.profile_info}>
                      <p className={styles.profile_info_label}>Code postal :</p>
                      <p className={styles.profile_info_value}>
                        {user.address.zipCode}
                      </p>
                    </div>
                    <div className={styles.profile_info}>
                      <p className={styles.profile_info_label}>Ville :</p>
                      <p className={styles.profile_info_value}>
                        {user.address.city}
                      </p>
                    </div>
                    <div className={styles.profile_info}>
                      <p className={styles.profile_info_label}>
                        Taux Journalier :
                      </p>
                      <p className={styles.profile_info_value}>{user.rate}</p>
                    </div>
                    <div className={styles.profile_info}>
                      <p className={styles.profile_info_label}>
                        Année d'éxpérience :
                      </p>
                      <p className={styles.profile_info_value}>
                        {user.yearOfExperience}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className={styles.wrapper}>
              <div className={styles.buttons_wrapper}>
                <div className={styles.button_first}></div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Index;

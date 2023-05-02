import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import UserContext from '@/context/UserContext';
import useFetch from '@/hooks/useFetch';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import Footer from '@/components/partials/Footer';
import Modal from '@/components/UI/Modal';
import Loading from '@/components/UI/Loading';
import Title from '@/components/UI/Title';

import styles from './index.module.scss';

const Index = () => {
  const router = useRouter();

  const { isLogged, user, updateUser } = useContext(UserContext);

  const [token, setToken] = useState();

  const [userForm, setUserForm] = useState();

  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);

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

  const handleClick1 = () => {
    setIsOpen1(true);
  };

  const handleClick2 = () => {
    setIsOpen2(true);
  };
  const handleClick3 = () => {
    setIsOpen3(true);
  };

  return (
    <>
      {isLogged ? (
        <main className={styles.main}>
          <div className={styles.profile}>
            {user && (
              <>
                <span>
                  <img
                    src="/img/edit.png"
                    alt=""
                    className={styles.profile_icon}
                    onClick={handleClick3}
                  />
                </span>
                <img
                  class="malt-plus-banner-dashboard__logo"
                  src="https://us.123rf.com/450wm/tuktukdesign/tuktukdesign1606/tuktukdesign160600120/59070201-user-icon-man-profil-homme-d-affaires-avatar-personne-ic%C3%B4ne-illustration-vectorielle.jpg?ver=6"
                  width="180"
                  height="170"
                />
                <div className={styles.profile_text}>
                  <h1>Malick Siguy Ndiaye</h1>
                  <p>Web Developer</p>
                  <span>Localisation</span>
                </div>
                <div className={styles.rectangles}>
                  <div className={styles.rectangle}>
                    <p>Tarif Journalier</p>
                    <p>350</p>
                  </div>
                  <div className={styles.rectangle}>
                    <p>Expérience</p>
                    <p>350 €/Jour</p>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className={styles.wrapper}>
            <>
              {isOpen1 && (
                <Modal
                  title="Modifier mon profil"
                  closeModal={() => setIsOpen1(false)}
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
              {isOpen2 && (
                <Modal
                  title="Modifier mon profil"
                  closeModal={() => setIsOpen2(false)}
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

                    <Button
                      type="submit"
                      title="modifier"
                      className="btn__secondary"
                    />
                  </form>
                </Modal>
              )}
              {isOpen3 && (
                <Modal
                  title="Modifier mon profil"
                  closeModal={() => setIsOpen3(false)}
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

                    <Button
                      type="submit"
                      title="modifier"
                      className="btn__secondary"
                    />
                  </form>
                </Modal>
              )}

              <div className={styles.formulaire}>
                <div className={styles.profile_container}>
                  <div className={styles.profile_card}>
                    {user && (
                      <>
                        <span>
                          <img
                            src="/img/edit.png"
                            alt=""
                            className={styles.profile_icon}
                            onClick={handleClick1}
                          />
                        </span>
                        <div className={styles.profile_card_body}>
                          <Title title="Profil" Level="h2" />
                          <div className={styles.profile_info}>
                            <p className={styles.profile_info_label}>
                              Type de compte :
                            </p>
                            <p className={styles.profile_info_value}>
                              {user.userType}
                            </p>
                          </div>
                          <div className={styles.profile_info}>
                            <p className={styles.profile_info_label}>
                              Prénom :
                            </p>
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
                            <p className={styles.profile_info_value}>
                              {user.email}
                            </p>
                          </div>
                          <div className={styles.profile_info}>
                            <p className={styles.profile_info_label}>
                              Numéro de portable :
                            </p>
                            <p className={styles.profile_info_value}>
                              {user.phone}
                            </p>
                          </div>
                          <div className={styles.profile_info}>
                            <p className={styles.profile_info_label}>
                              Adresse :
                            </p>
                            <p className={styles.profile_info_value}>
                              {user.address.street}
                            </p>
                          </div>
                          <div className={styles.profile_info}>
                            <p className={styles.profile_info_label}>
                              Code postal :
                            </p>
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
                        </div>
                      </>
                    )}
                  </div>

                  <div className={styles.profile_card}>
                    {user && (
                      <>
                        <span>
                          <img
                            src="/img/edit.png"
                            alt=""
                            className={styles.profile_icon}
                            onClick={handleClick2}
                          />
                        </span>
                        <div className={styles.profile_card_body}>
                          <Title title="Compétences" Level="h2" />
                          <div className={styles.profile_info}>
                            <p className={styles.profile_info_label}>
                              Prénom :
                            </p>
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
                            <p className={styles.profile_info_value}>
                              {user.email}
                            </p>
                          </div>
                          <div className={styles.profile_info}>
                            <p className={styles.profile_info_label}>
                              Numéro de portable :
                            </p>
                            <p className={styles.profile_info_value}>
                              {user.phone}
                            </p>
                          </div>
                          <div className={styles.profile_info}>
                            <p className={styles.profile_info_label}>
                              Adresse :
                            </p>
                            <p className={styles.profile_info_value}>
                              {user.address.street}
                            </p>
                          </div>
                          <div className={styles.profile_info}>
                            <p className={styles.profile_info_label}>
                              Code postal :
                            </p>
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
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </>
          </div>
          <Footer />
        </main>
      ) : null}
    </>
  );
};

export default Index;

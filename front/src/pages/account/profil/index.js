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
  const [freelance_id, setFreelance_id] = useState(null);

  const [userForm, setUserForm] = useState();
  const [freelanceForm, setFreelanceForm] = useState(null);
  const [skillsForm, setSkillsForm] = useState([]);

  //les states isOpen permettent de gérer l'ouverture et la fermeture des modals
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);

  // requete pour modifier le profil
  const {
    data: freelance,
    error: errorFreelance,
    loading: loadingFreelance,
    fetchData: fetchDataFreelance,
  } = useFetch({
    url: '/user/my-freelance',
    method: 'POST',
    body: { freelance_id: freelance_id },
    token: token,
  });
  const {
    data: dataUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
    fetchData: fetchDataUpdate,
    error,
  } = useFetch({ url: '/user', method: 'PUT', body: userForm, token: token });
  const {
    data: freelanceUpdate,
    error: errorUpdateFreelance,
    loading: loadingUpdateFreelance,
    fetchData: fetchFreelanceUpdate,
  } = useFetch({
    url: '/user/freelance',
    method: 'PUT',
    body: userForm,
    token: token,
  });

  const {
    data: skills,
    error: errorSkills,
    loading: loadingSkills,
    fetchData: fetchDataSkills,
  } = useFetch({
    url: '/skill',
    method: 'GET',
    body: null,
    token: null,
  });
  const {
    data: activities,
    error: errorActivities,
    loading: loadingActivities,
    fetchData: fetchDataActivities,
  } = useFetch({
    url: '/activity',
    method: 'GET',
    body: null,
    token: null,
  });

  // all the useEffects
  useEffect(() => {
    setUserForm(user);
    if (user.freelance !== undefined) {
      setFreelance_id(user.freelance._id);
      console.log(user, 'USERR IS HERE');
    }
    const token = localStorage.getItem('token');
    setToken(token);
  }, [user]);

  useEffect(() => {
    if (freelance_id !== null) {
      fetchDataFreelance();
      fetchDataSkills();
      fetchDataActivities();
    }
  }, [freelance_id]);

  useEffect(() => {
    if (freelance !== null) {
      console.log(freelance, 'FREELANCE IS HERE');
      setFreelanceForm(freelance.freelance);
    }
  }, [freelance]);
  useEffect(() => {
    if (skills !== null) {
      console.log(freelance, 'SKILLS ARE HERE');
    }
  }, [skills]);
  useEffect(() => {
    if (activities !== null) {
      console.log(activities, 'ACTIVITIES ARE HERE');
    }
  }, [activities]);

  useEffect(() => {
    if (dataUpdate.success) {
      setIsOpen1(false);

      updateUser(dataUpdate.user);
    }
  }, [dataUpdate]);
  useEffect(() => {
    if (freelanceUpdate.success) {
      fetchDataFreelance();
      setIsOpen1(false);
      setIsOpen2(false);
      setIsOpen2(false);
    }
  }, [freelanceUpdate]);

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
      setIsOpen1(false);
      setIsOpen2(false);
      setIsOpen2(false);
    }
  };
  const submitFormFreelance = (e) => {
    e.preventDefault();

    fetchFreelanceUpdate();
    if (freelanceUpdate.success) {
      setIsOpen1(false);
      setIsOpen2(false);
      setIsOpen2(false);
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
                  className="malt-plus-banner-dashboard__logo"
                  src="https://us.123rf.com/450wm/tuktukdesign/tuktukdesign1606/tuktukdesign160600120/59070201-user-icon-man-profil-homme-d-affaires-avatar-personne-ic%C3%B4ne-illustration-vectorielle.jpg?ver=6"
                  width="180"
                  height="170"
                />
                <div className={styles.profile_text}>
                  <h1>
                    {user.firstName} {user.lastName}
                  </h1>
                  <p>{freelance.freelance.activity.name}</p>
                  <span>
                    {user.address.street} {user.address.zipCode}{' '}
                    {user.address.city}{' '}
                  </span>
                </div>
                <div className={styles.rectangles}>
                  <div className={styles.rectangle}>
                    <p>Tarif Journalier</p>
                    <p>{freelance.freelance.rate}€/Jour</p>
                  </div>
                  <div className={styles.rectangle}>
                    <p>Expérience</p>
                    <p>{freelance.freelance.yearOfExperience} ans</p>
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
                      submitFormFreelance(e);
                    }}
                  >
                    <Input
                      label="test"
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

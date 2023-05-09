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
import UserInfo from '@/components/UI/UserInfo';
import Freelance from '@/components/UI/UserTypeCard/Freelance';
import Company from '@/components/UI/UserTypeCard/Company';

import styles from './index.module.scss';

const Index = () => {
  const router = useRouter();

  const { isLogged, user, updateUser } = useContext(UserContext);

  const [token, setToken] = useState(null);
  const [freelance_id, setFreelance_id] = useState(null);
  const [company_id, setCompany_id] = useState(null);

  const [userForm, setUserForm] = useState();
  const [freelanceForm, setFreelanceForm] = useState(null);
  const [companyForm, setCompanyForm] = useState(null);

  //les states isOpen permettent de gérer l'ouverture et la fermeture des modals
  const [isOpen1, setIsOpen1] = useState(false);

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
    data: company,
    error: errorCompany,
    loading: loadingCompany,
    fetchData: fetchDataCompany,
  } = useFetch({
    url: '/user/my-company',
    method: 'POST',
    body: { company_id: company_id },
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
    body: freelanceForm,
    token: token,
  });

  // all the useEffects
  // ce code surveille le state user et le met à jour dans le state userForm et met le token dans le state token
  useEffect(() => {
    setUserForm(user);
    // console.log(user, 'Test');
    if (user.freelance != undefined) {
      setToken(localStorage.getItem('token'));
      console.log('test');
    }
    if (user.company != undefined) {
      setToken(localStorage.getItem('token'));
      // console.log('test');
    }
  }, [user]);

  useEffect(() => {
    if (token != null) {
      if (user.userType === 'FREELANCE') {
        setFreelance_id(user.freelance._id);
      } else if (user.userType === 'COMAPNY') {
        setCompany_id(user.company_id);
      }
      console.log(user, 'USERR IS HERE');
    }
  }, [token]);

  useEffect(() => {
    if (freelance_id != null) {
      fetchDataFreelance();
    }
    if (company_id != null) {
      fetchDataCompany();
    }
  }, [company_id, freelance_id]);

  useEffect(() => {
    if (freelance != null) {
      console.log(freelance, 'FREELANCE IS HERE');
      setFreelanceForm(freelance.freelance);
    }
  }, [freelance]);

  useEffect(() => {
    if (dataUpdate.success) {
      setIsOpen1(false);
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
      setIsOpen1(false);
    }
  };

  const handleClick1 = () => {
    setIsOpen1(true);
  };

  return (
    <>
      {isLogged ? (
        <main className={styles.main}>
          <Button
            type="submit"
            title="Modifier mot de passe"
            className="btn__profile"
            handleClick={() => router.push('/resetpassword')}
          />
          <div className={styles.profile}>
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
                <img
                  className="malt-plus-banner-dashboard__logo"
                  src="https://us.123rf.com/450wm/tuktukdesign/tuktukdesign1606/tuktukdesign160600120/59070201-user-icon-man-profil-homme-d-affaires-avatar-personne-ic%C3%B4ne-illustration-vectorielle.jpg?ver=6"
                  width="180"
                  height="170"
                />
                {freelance.freelance != null && (
                  <>
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
              </>
            )}
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
          </div>

          <div className={styles.wrapper}>
            <>
              <div className={styles.formulaire}>
                <div className={styles.profile_container}>
                  <UserInfo user={user} handleClick={handleClick1} />
                  {user?.userType === 'FREELANCE' ? <Freelance /> : null}
                  {user?.userType === 'COMPANY' ? <Company /> : null}
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

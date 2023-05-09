import React from 'react';
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
import styles from './index.module.scss';

const index = () => {
  const { user } = useContext(UserContext);

  const [token, setToken] = useState(null);
  const [freelance_id, setFreelance_id] = useState(null);

  const [userForm, setUserForm] = useState();
  const [freelanceForm, setFreelanceForm] = useState(null);

  const [isOpen, setIsOpen] = useState(false);

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
  useEffect(() => {
    setUserForm(user);
    console.log(user, 'Test');
    if (user.freelance != undefined) {
      setToken(localStorage.getItem('token'));
      console.log('test');
    }
  }, [user]);

  useEffect(() => {
    if (token != null) {
      setFreelance_id(user.freelance._id);
      console.log(user, 'USER IS HERE');
    }
  }, [token]);

  useEffect(() => {
    if (freelance_id != null) {
      fetchDataFreelance();
    }
  }, [freelance_id]);

  useEffect(() => {
    if (freelance != null) {
      console.log(freelance, 'Freelaance IS HERE');
      setFreelanceForm(freelance.freelance);
    }
  }, [freelance]);

  useEffect(() => {
    if (freelanceUpdate.success) {
      fetchDataFreelance();
      setIsOpen(false);
    }
  }, [freelanceUpdate]);

  const handleChangeFreelance = (e) => {
    setFreelanceForm({ ...freelanceForm, [e.target.name]: e.target.value });
    console.log(freelanceForm, 'FREELANCE FORM');
  };

  const submitFormFreelaance = (e) => {
    e.preventDefault();
    fetchFreelanceUpdate();
    if (freelanceUpdate.success) {
      setIsOpen(false);
    }
  };
  const handleClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      <div>
        <div className={styles.profile_card}>
          {user && (
            <>
              <span>
                <img
                  src="/img/edit.png"
                  alt=""
                  className={styles.profile_icon}
                  onClick={handleClick}
                />
              </span>
              <div className={styles.profile_card_body}>
                <Title title="Freelance" Level="h2" />
                {freelance.freelance != null && (
                  <>
                    <div className={styles.profile_info}>
                      <p className={styles.profile_info_label}>
                        Taux Journalier :
                      </p>
                      <p className={styles.profile_info_value}>
                        {freelance.freelance.rate}€/Jour
                      </p>
                    </div>
                    <div className={styles.profile_info}>
                      <p className={styles.profile_info_label}>
                        Année d'éxperience :
                      </p>
                      <p className={styles.profile_info_value}>
                        {freelance.freelance.yearOfExperience} ans
                      </p>
                    </div>
                    <div className={styles.profile_info}>
                      <p className={styles.profile_info_label}>Métier :</p>
                      <p className={styles.profile_info_value}>
                        {freelance.freelance.activity.name}
                      </p>
                    </div>
                    <div className={styles.profile_info}>
                      <p className={styles.profile_info_label}>Compétences :</p>
                      <ul className={styles.profile_info_ul}>
                        {freelance.freelance.skills.map((skill, index) => (
                          <li key={index}>{skill.name}</li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
          {isOpen && (
            <Modal
              title="Modifier mon profil"
              closeModal={() => setIsOpen(false)}
            >
              <br />
              <form
                onSubmit={(e) => {
                  submitFormFreelaance(e);
                }}
              >
                <Input
                  label="Taux journalier"
                  type="number"
                  name="rate"
                  value={freelanceForm.rate}
                  isRequired={true}
                  placeholder="taux journalier"
                  onChange={(e) => handleChangeFreelance(e)}
                />
                <Input
                  label="Année d'expérience"
                  type="number"
                  name="yearOfExperience"
                  value={freelanceForm.yearOfExperience}
                  isRequired={true}
                  placeholder="année d'expérience"
                  onChange={(e) => handleChangeFreelance(e)}
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
      </div>
    </>
  );
};

export default index;

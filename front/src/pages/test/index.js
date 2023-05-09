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
  const { isLogged, user, updateUser } = useContext(UserContext);

  const [token, setToken] = useState(null);
  const [company_id, setCompany_id] = useState(null);

  const [companyForm, setCompanyForm] = useState(null);

  const [isOpen, setIsOpen] = useState(false);

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
    data: companyUpdate,
    error: errorUpdateCompany,
    loading: loadingUpdateCompany,
    fetchData: fetchCompanyUpdate,
  } = useFetch({
    url: '/user/company',
    method: 'PUT',
    body: companyForm,
    token: token,
  });
  useEffect(() => {
    if (user.company != undefined) {
      setToken(localStorage.getItem('token'));
      console.log('test');
    }
  }, [user]);

  useEffect(() => {
    if (token != null) {
      setCompany_id(user.company._id);
      console.log(user, 'USER IS HERE');
    }
  }, [token]);

  useEffect(() => {
    if (company_id != null) {
      fetchDataCompany();
    }
  }, [company_id]);

  useEffect(() => {
    if (company != null) {
      console.log(company, 'COMPANY IS HERE');
      setCompanyForm(company.company);
    }
  }, [company]);

  useEffect(() => {
    if (companyUpdate.success) {
      fetchDataCompany();
      setIsOpen(false);
    }
  }, [companyUpdate]);

  const handleChangeCompany = (e) => {
    setCompanyForm({ ...companyForm, [e.target.name]: e.target.value });
    console.log(companyForm, 'COMPANY FORM');
    if (e.target.name === 'zipCode') {
      companyForm.address.zipCode = e.target.value;
    }
    if (e.target.name === 'city') {
      companyForm.address.city = e.target.value;
    }
    if (e.target.name === 'street') {
      companyForm.address.street = e.target.value;
    }
  };

  const submitFormCompany = (e) => {
    e.preventDefault();
    fetchCompanyUpdate();
    if (companyUpdate.success) {
      setIsOpen(false);
    }
  };
  const handleClick = () => {
    setIsOpen(true);
  };

  return (
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
              <Title title="Entreprise" Level="h2" />
              {company.company != null && (
                <>
                  <div className={styles.profile_info}>
                    <p className={styles.profile_info_label}>Company name :</p>
                    <p className={styles.profile_info_value}>
                      {company.company.name}
                    </p>
                  </div>
                  <div className={styles.profile_info}>
                    <p className={styles.profile_info_label}>Status :</p>
                    <p className={styles.profile_info_value}>
                      {company.company.status}
                    </p>
                  </div>
                  <div className={styles.profile_info}>
                    <p className={styles.profile_info_label}>Numéro Siret :</p>
                    <p className={styles.profile_info_value}>
                      {company.company.siret}
                    </p>
                  </div>
                  <div className={styles.profile_info}>
                    <p className={styles.profile_info_label}>Rue :</p>
                    <p className={styles.profile_info_value}>
                      {company.company.address.street}
                    </p>
                  </div>
                  <div className={styles.profile_info}>
                    <p className={styles.profile_info_label}>Code postal :</p>
                    <p className={styles.profile_info_value}>
                      {company.company.address.zipCode}
                    </p>
                  </div>
                  <div className={styles.profile_info}>
                    <p className={styles.profile_info_label}>Ville :</p>
                    <p className={styles.profile_info_value}>
                      {company.company.address.city}
                    </p>
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
                submitFormCompany(e);
              }}
            >
              <Input
                label="Nom de l'entreprise"
                type="text"
                name="name"
                value={companyForm.name}
                isRequired={true}
                placeholder="Nom de l'entreprise"
                onChange={(e) => handleChangeCompany(e)}
              />
              <Input
                label="Status"
                type="text"
                name="status"
                value={companyForm.status}
                isRequired={true}
                placeholder="année d'expérience"
                onChange={(e) => handleChangeCompany(e)}
              />
              <Input
                label="Numéro Siret"
                type="number"
                name="siret"
                value={companyForm.siret}
                isRequired={true}
                placeholder="année d'expérience"
                onChange={(e) => handleChangeCompany(e)}
              />
              <Input
                label="Addresse"
                type="adress"
                name="street"
                placeholder="entrer votre rue"
                isRequired={true}
                onChange={(e) => handleChangeCompany(e)}
                value={companyForm.address.street}
              />
              <Input
                label="Code postal"
                type="zipcode"
                name="zipCode"
                maxLength="5"
                placeholder="entrer votre code postal"
                isRequired={true}
                onChange={(e) => handleChangeCompany(e)}
                value={companyForm.address.zipCode}
              />
              <Input
                label="Ville"
                type="city"
                name="city"
                placeholder="entrer votre ville"
                isRequired={true}
                onChange={(e) => handleChangeCompany(e)}
                value={companyForm.address.city}
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
  );
};

export default index;

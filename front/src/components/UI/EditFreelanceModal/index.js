import React from 'react';
import Modal from '@/components/UI/Modal';
import Button from '@/components/UI/Button';
import Input from '@/components/UI/Input';
const index = ({
  freelanceForm,
  onCloseModal,

  setFreelanceForm,
  onSubmitFreelanceForm,
}) => {
  // cette fonction permet de mettre à jour le state userForm et de gérer les changements dans les inputs
  const handleChangeFreelance = (e) => {
    setFreelanceForm({ ...freelanceForm, [e.target.name]: e.target.value });
    console.log(freelanceForm, 'FREELANCE FORM');
  };

  return (
    <Modal title="Modifier mon profil" closeModal={onCloseModal}>
      <br />
      <form onSubmit={onSubmitFreelanceForm}>
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

        <Button type="submit" title="modifier" className="btn__secondary" />
      </form>
    </Modal>
  );
};

export default index;

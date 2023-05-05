import React from 'react';
import Modal from '@/components/UI/Modal';
import Button from '@/components/UI/Button';
import Input from '@/components/UI/Input';
const index = ({
  userForm,
  onCloseModal,

  setUserForm,
  onSubmitForm,
}) => {
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

  return (
    <Modal title="Modifier mon profil" closeModal={onCloseModal}>
      <br />
      <form onSubmit={onSubmitForm}>
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
        <Button type="submit" title="modifier" className="btn__secondary" />
      </form>
    </Modal>
  );
};

export default index;

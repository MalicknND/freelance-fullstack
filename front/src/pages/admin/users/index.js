import { useState, useEffect, useContext } from 'react';
import useFetch from '@/hooks/useFetch';
import UserContext from '@/context/UserContext';
import styles from './index.module.scss';
import Title from '@/components/UI/Title';
import Button from '@/components/UI/Button/';

const Index = () => {
  const [token, setToken] = useState(null);
  const { isLogged, user, updateUser } = useContext(UserContext);
  const { fetchData, data, error, loading } = useFetch({
    url: '/user/admin/users',
    method: 'GET',
    body: null,
    token: token,
  });

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, []);

  useEffect(() => {
    if (token != null) {
      fetchData();
    }
  }, [token]);

  useEffect(() => {
    if (data.success == true) {
      console.log(data);
    }
  }, [data]);

  return (
    <div>
      <Title title="Tous les utilisateurs" Level="h1" />
      <table className={styles.wrapper}>
        <thead>
          <tr>
            <th>Prénom</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Adresse</th>
            <th>UserType</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.users &&
            data.users.map((user) => (
              <tr key={user._id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>
                  {user.address.street} {user.address.zipCode}{' '}
                  {user.address.city}
                </td>
                <td>{user.userType}</td>
                <td>
                  <Button
                    type="submit"
                    title="Supprimer"
                    className="btn__delete"
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Index;

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
    url: '/skill',
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
      <Title title="Tous les compétences" Level="h1" />
      <table className={styles.wrapper}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th colSpan={2}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.skills &&
            data.skills.map((skills) => (
              <tr key={skills._id}>
                <td>{skills._id}</td>
                <td>{skills.name}</td>

                <td>
                  <Button
                    type="submit"
                    title="Modifier"
                    className="btn__update"
                  />
                </td>
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

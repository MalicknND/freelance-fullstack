import React from 'react';
import Title from '@/components/UI/Title';
import { Avatar } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Link from 'next/link';
const index = () => {
  return (
    <div>
      <Title title="Quelle est votre situation ?" Level="h2" />
      <Link href="/auth/register">
        <div
          style={{
            display: 'flex',
            gap: '15px',
            marginTop: '2vh',
            alignItems: 'center',
            border: '1px solid #ccc',
            padding: '10px',
            width: '450px',
          }}
        >
          <Avatar
            alt="Remy Sharp"
            src="https://img.freepik.com/vecteurs-libre/illustration-concept-experts_114360-451.jpg?size=626&ext=jpg&uid=R15765290&ga=GA1.2.547947235.1680361633&semt=sph"
            sx={{ width: 56, height: 56 }}
          />
          <p style={{ display: 'flex', flexDirection: 'column' }}>
            <span>Client</span>
            <span>Je recherche des freelances</span>
          </p>
          <span
            style={{
              display: 'flex',
              marginLeft: '13px',

              justifyContent: 'flex-end',
            }}
          >
            {' '}
            <ArrowForwardIosIcon />
          </span>
        </div>
      </Link>
      <Link href="/auth/register">
        <div
          style={{
            display: 'flex',
            gap: '15px',
            marginTop: '2vh',
            alignItems: 'center',
            border: '1px solid #ccc',
            padding: '10px',
            width: '450px',
          }}
        >
          <Avatar
            alt="Remy Sharp"
            src="https://img.freepik.com/vecteurs-libre/rencontres-ligne-homme-heureux-via-ordinateur-portable_74855-7495.jpg?size=626&ext=jpg&uid=R15765290&ga=GA1.2.547947235.1680361633&semt=sph"
            sx={{ width: 56, height: 56 }}
          />
          <p style={{ display: 'flex', flexDirection: 'column' }}>
            <span>Freelance</span>
            <span>Je cree mon profil</span>
          </p>
          <span
            style={{
              display: 'flex',
              marginLeft: '13px',

              justifyContent: 'flex-end',
            }}
          >
            {' '}
            <ArrowForwardIosIcon />
          </span>
        </div>
      </Link>
    </div>
  );
};

export default index;

import React from 'react';
import Button from '@/components/UI/Button/';
import { useRouter } from 'next/router';

const index = () => {
  const router = useRouter();
  return (
    <div>
      <Button
        type="submit"
        title="users"
        className="btn__secondary"
        handleClick={() => router.push('/admin/users')}
      />
      <Button type="submit" title="Skills" className="btn__secondary" />
      <Button type="submit" title="Metiers" className="btn__secondary" />
    </div>
  );
};

export default index;

import { useRouter } from 'next/router';
import React from 'react';



export default function posts() {

  const router = useRouter();

  const handleClick = async () => {
    router.push("/");
  };


  return <div onClick={handleClick}>{router.asPath}</div>;
}

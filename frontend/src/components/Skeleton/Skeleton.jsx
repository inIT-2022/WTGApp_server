import React from 'react';
import ContentLoader from 'react-content-loader';
import style from './Skeleton.module.css';

const Skeleton = () => (
  <div className={style.wrapper}>
    <ContentLoader
      speed={2}
      max-width={1110}
      height={345}
      viewBox='0 0 1110 345'
      backgroundColor='#d2d0d0'
      foregroundColor='#bababa'
    >
      <rect x='21' y='17' rx='11' ry='11' width='288' height='315' />
      <rect x='325' y='15' rx='12' ry='12' width='768' height='315' />
    </ContentLoader>
  </div>
);

export default Skeleton;

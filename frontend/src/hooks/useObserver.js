import React from 'react';

// ref - элемент за которым следим
// isLoading - когда грузятся данные
// callback  то что выполняется при обнаружении элемента
// canLoad  проверяет чтобы текущая страница была мньше общего числа страниц
export const useObserver = (ref, canLoad, isLoading, callback) => {
  const observer = React.useRef();

  React.useEffect(() => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();

    let cb = (entries, observer) => {
      if (entries[0].isIntersecting && canLoad) {
        callback();
      }
    };

    observer.current = new IntersectionObserver(cb);
    ref.current && observer.current.observe(ref.current);
  }, [isLoading]);
};

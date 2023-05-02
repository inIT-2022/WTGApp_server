export const getPointsForMap = ({
  locationDTOList: arr,
  longitude,
  latitude,
}) => {
  // Стилизация  метки
  //  https://yandex.ru/dev/maps/staticapi/doc/1.x/dg/concepts/markers.html

  // тип метки
  const type = 'pm2';

  // цвет метки
  const color = 'rd';

  // размер метки
  const size = 'm';

  const point = '' + type + color + size;

  let points = arr
    .map((location, i) => {
      return `${location.longitude},${location.latitude},${point}${i + 1}${
        i === arr.length - 1 ? '' : '~'
      }`;
    })
    .join('');

  const pointGeoUser = `~${longitude},${latitude},ya_ru`;

  points = points + pointGeoUser;

  return points;
};

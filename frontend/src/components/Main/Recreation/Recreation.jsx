import style from './Recreation.module.css';

export const Recreation = () => {
  return (
    <>
      <div className={style.wrapper}>
        <svg
          width='38'
          height='68'
          viewBox='0 0 38 68'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M29.5556 34.64C29.5556 51.6455 32.1538 51.1903 36.7009 67.7405C12.3419 70.4348 0 51.6455 0 34.64C0 17.6346 8.44444 0 38 0C35.4017 5.77334 29.5556 17.6346 29.5556 34.64Z'
            fill='#EEC3FD'
          />
        </svg>

        <h2 className={style.title}>создай свой отдых</h2>
      </div>
      <p className={style.description}>
        выберите ключевый позиции Вашего отдыха
      </p>
      <table className={style.resptab}>
        <tbody>
          <tr>
            <td className={style.tableText}>дата и время</td>
            <td className={style.tableWrapper}>
              <div className={style.data}>
                <input
                  className={style.input}
                  type='date'
                  value='2022-10-22'
                  min='2022-01-01'
                  max='2023-12-31'
                />
                <input
                  className={style.inputTime}
                  type='time'
                  value='08:00'
                  min='08:00'
                  max='00:00'
                  required
                />
              </div>
            </td>
          </tr>
          <tr>
            <td className={style.tableText}>вид</td>
            <td className={style.tableWrapper}>
              <button className={style.btn}>Выбор</button>
            </td>
          </tr>
          <tr>
            <td className={style.tableText}>категория</td>
            <td className={style.tableWrapper}>
              <button className={style.btn}>Выбор</button>
            </td>
          </tr>
          <tr>
            <td className={style.tableText}>место</td>
            <td className={style.tableWrapper}>
              <button className={style.btn}>Выбор</button>
            </td>
          </tr>
          <tr>
            <td className={style.tableText}>мероприятие</td>
            <td className={style.tableWrapper}>
              <button className={style.btn}>Выбор</button>
            </td>
          </tr>
          <tr>
            <td className={style.tableText}>цена</td>
            <td className={style.tableWrapper}>
              <button className={style.btn}>Выбор</button>
            </td>
          </tr>
          <tr>
            <td className={style.tableText}>что-то еще</td>
            <td className={style.tableWrapper}>
              <button className={style.btn}>Выбор</button>
            </td>
          </tr>
        </tbody>
      </table>

      <table className={style.sozTable}>
        <tbody>
          <tr>
            <td className={style.textSoz}>поделиться геолокацией</td>
            <td className={style.tableWrapper}>
              <svg
                width='78'
                height='78'
                viewBox='0 0 105 104'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <g filter='url(#filter0_dd_14765_4995)'>
                  <rect
                    x='12.9668'
                    y='8'
                    width='80'
                    height='80'
                    rx='40'
                    fill='white'
                  />
                  <rect
                    x='14.4668'
                    y='9.5'
                    width='77'
                    height='77'
                    rx='38.5'
                    stroke='black'
                    stroke-opacity='0.2'
                    stroke-width='3'
                  />
                  <path
                    d='M41.5918 67.5H64.3418C65.4251 67.5 65.9668 68.0417 65.9668 69.125C65.9668 70.2083 65.4251 70.75 64.3418 70.75H41.5918C40.5085 70.75 39.9668 70.2083 39.9668 69.125C39.9668 68.0417 40.5085 67.5 41.5918 67.5ZM67.5918 43.125C67.49 38.9942 66.0594 35.5498 63.3002 32.7916C60.5409 30.0335 57.0965 28.6029 52.9668 28.5C48.836 28.6018 45.3916 30.0324 42.6334 32.7916C39.8753 35.5509 38.4447 38.9953 38.3418 43.125C38.3418 46.1377 39.5519 49.5822 41.972 53.4584C44.3922 57.3345 48.0571 61.6256 52.9668 66.3316C57.8754 61.6256 61.5403 57.3345 63.9615 53.4584C66.3828 49.5822 67.5929 46.1377 67.5918 43.125V43.125ZM52.9668 70.75C41.0501 59.9167 35.0918 50.7083 35.0918 43.125C35.2272 38.0463 36.9708 33.8316 40.3227 30.4809C43.6745 27.1301 47.8892 25.3865 52.9668 25.25C58.0455 25.3854 62.2602 27.129 65.6109 30.4809C68.9617 33.8327 70.7053 38.0474 70.8418 43.125C70.8418 50.7083 64.8835 59.9167 52.9668 70.75ZM52.9668 48C54.3545 47.9664 55.5056 47.4925 56.4199 46.5781C57.3343 45.6638 57.7914 44.5127 57.7914 43.125C57.7914 41.7373 57.3343 40.5862 56.4199 39.6719C55.5056 38.7575 54.3545 38.3004 52.9668 38.3004C51.579 38.3004 50.428 38.7575 49.5137 39.6719C48.5993 40.5862 48.1422 41.7373 48.1422 43.125C48.1422 44.5127 48.5993 45.6638 49.5137 46.5781C50.428 47.4925 51.579 47.9664 52.9668 48ZM52.9668 51.25C50.6647 51.1818 48.7521 50.386 47.2289 48.8629C45.7058 47.3397 44.91 45.4271 44.8418 43.125C44.91 40.8229 45.7058 38.9103 47.2289 37.3871C48.7521 35.864 50.6647 35.0682 52.9668 35C55.2689 35.0682 57.1815 35.864 58.7047 37.3871C60.2278 38.9103 61.0235 40.8229 61.0918 43.125C61.0235 45.4271 60.2278 47.3397 58.7047 48.8629C57.1815 50.386 55.2689 51.1818 52.9668 51.25V51.25Z'
                    fill='#A09999'
                    fillOpacity='0.96'
                  />
                </g>
                <defs>
                  <filter
                    id='filter0_dd_14765_4995'
                    x='0.966797'
                    y='0'
                    width='104'
                    height='104'
                    filterUnits='userSpaceOnUse'
                    color-interpolation-filters='sRGB'
                  >
                    <feFlood flood-opacity='0' result='BackgroundImageFix' />
                    <feColorMatrix
                      in='SourceAlpha'
                      type='matrix'
                      values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                      result='hardAlpha'
                    />
                    <feOffset dy='4' />
                    <feGaussianBlur stdDeviation='6' />
                    <feComposite in2='hardAlpha' operator='out' />
                    <feColorMatrix
                      type='matrix'
                      values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0'
                    />
                    <feBlend
                      mode='normal'
                      in2='BackgroundImageFix'
                      result='effect1_dropShadow_14765_4995'
                    />
                    <feColorMatrix
                      in='SourceAlpha'
                      type='matrix'
                      values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                      result='hardAlpha'
                    />
                    <feOffset dy='4' />
                    <feGaussianBlur stdDeviation='2' />
                    <feComposite in2='hardAlpha' operator='out' />
                    <feColorMatrix
                      type='matrix'
                      values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'
                    />
                    <feBlend
                      mode='normal'
                      in2='effect1_dropShadow_14765_4995'
                      result='effect2_dropShadow_14765_4995'
                    />
                    <feBlend
                      mode='normal'
                      in='SourceGraphic'
                      in2='effect2_dropShadow_14765_4995'
                      result='shape'
                    />
                  </filter>
                </defs>
              </svg>
            </td>
          </tr>

          <tr>
            <td className={style.textSoz}>пригласить на мероприятие</td>
            <td className={style.tableWrapper}>
              <svg
                width='78'
                height='78'
                viewBox='0 0 105 104'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <g filter='url(#filter0_dd_14765_4999)'>
                  <rect
                    x='12.9668'
                    y='8'
                    width='80'
                    height='80'
                    rx='40'
                    fill='white'
                  />
                  <rect
                    x='14.4668'
                    y='9.5'
                    width='77'
                    height='77'
                    rx='38.5'
                    stroke='black'
                    stroke-opacity='0.2'
                    stroke-width='3'
                  />
                  <path
                    d='M31.3005 67.4998H48.6338C49.2084 67.4998 49.7595 67.2716 50.1659 66.8652C50.5722 66.4589 50.8005 65.9078 50.8005 65.3332C50.8005 64.7585 50.5722 64.2074 50.1659 63.8011C49.7595 63.3948 49.2084 63.1665 48.6338 63.1665H33.621C34.1467 59.5586 35.9526 56.2602 38.7088 53.8735C41.4651 51.4868 44.9878 50.171 48.6338 50.1665C51.185 50.1886 53.6635 49.3175 55.6399 47.704C57.6162 46.0906 58.9658 43.8365 59.4547 41.3325C59.9436 38.8285 59.541 36.2324 58.3168 33.994C57.0925 31.7556 55.1237 30.0161 52.7516 29.077C50.3794 28.1378 47.7534 28.0582 45.3287 28.8519C42.904 29.6455 40.8334 31.2625 39.4758 33.4226C38.1181 35.5827 37.559 38.1497 37.8952 40.6787C38.2315 43.2077 39.442 45.5394 41.317 47.2697C37.7207 48.7285 34.641 51.2262 32.4709 54.4436C30.3009 57.6611 29.139 61.4523 29.1338 65.3332C29.1338 65.9078 29.3621 66.4589 29.7684 66.8652C30.1747 67.2716 30.7258 67.4998 31.3005 67.4998ZM48.6338 32.8332C49.9194 32.8332 51.1761 33.2144 52.245 33.9286C53.3139 34.6428 54.147 35.658 54.639 36.8457C55.131 38.0334 55.2597 39.3404 55.0089 40.6012C54.7581 41.8621 54.139 43.0203 53.23 43.9294C52.3209 44.8384 51.1628 45.4575 49.9019 45.7083C48.641 45.9591 47.3341 45.8303 46.1463 45.3384C44.9586 44.8464 43.9435 44.0133 43.2292 42.9444C42.515 41.8754 42.1338 40.6187 42.1338 39.3332C42.1338 37.6093 42.8186 35.956 44.0376 34.737C45.2566 33.518 46.9099 32.8332 48.6338 32.8332ZM76.8005 56.6665C76.8005 57.2411 76.5722 57.7922 76.1659 58.1986C75.7595 58.6049 75.2084 58.8332 74.6338 58.8332H68.1338V65.3332C68.1338 65.9078 67.9055 66.4589 67.4992 66.8652C67.0929 67.2716 66.5418 67.4998 65.9671 67.4998C65.3925 67.4998 64.8414 67.2716 64.4351 66.8652C64.0287 66.4589 63.8005 65.9078 63.8005 65.3332V58.8332H57.3005C56.7258 58.8332 56.1747 58.6049 55.7684 58.1986C55.3621 57.7922 55.1338 57.2411 55.1338 56.6665C55.1338 56.0919 55.3621 55.5408 55.7684 55.1344C56.1747 54.7281 56.7258 54.4998 57.3005 54.4998H63.8005V47.9998C63.8005 47.4252 64.0287 46.8741 64.4351 46.4678C64.8414 46.0614 65.3925 45.8332 65.9671 45.8332C66.5418 45.8332 67.0929 46.0614 67.4992 46.4678C67.9055 46.8741 68.1338 47.4252 68.1338 47.9998V54.4998H74.6338C75.2084 54.4998 75.7595 54.7281 76.1659 55.1344C76.5722 55.5408 76.8005 56.0919 76.8005 56.6665Z'
                    fill='#A09999'
                  />
                </g>
                <defs>
                  <filter
                    id='filter0_dd_14765_4999'
                    x='0.966797'
                    y='0'
                    width='104'
                    height='104'
                    filterUnits='userSpaceOnUse'
                    color-interpolation-filters='sRGB'
                  >
                    <feFlood flood-opacity='0' result='BackgroundImageFix' />
                    <feColorMatrix
                      in='SourceAlpha'
                      type='matrix'
                      values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                      result='hardAlpha'
                    />
                    <feOffset dy='4' />
                    <feGaussianBlur stdDeviation='6' />
                    <feComposite in2='hardAlpha' operator='out' />
                    <feColorMatrix
                      type='matrix'
                      values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0'
                    />
                    <feBlend
                      mode='normal'
                      in2='BackgroundImageFix'
                      result='effect1_dropShadow_14765_4999'
                    />
                    <feColorMatrix
                      in='SourceAlpha'
                      type='matrix'
                      values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                      result='hardAlpha'
                    />
                    <feOffset dy='4' />
                    <feGaussianBlur stdDeviation='2' />
                    <feComposite in2='hardAlpha' operator='out' />
                    <feColorMatrix
                      type='matrix'
                      values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'
                    />
                    <feBlend
                      mode='normal'
                      in2='effect1_dropShadow_14765_4999'
                      result='effect2_dropShadow_14765_4999'
                    />
                    <feBlend
                      mode='normal'
                      in='SourceGraphic'
                      in2='effect2_dropShadow_14765_4999'
                      result='shape'
                    />
                  </filter>
                </defs>
              </svg>
            </td>
          </tr>

          <tr>
            <td className={style.textSoz}>поиск арендного транспорта</td>
            <td className={style.tableWrapper}>
              <svg
                width='78'
                height='78'
                viewBox='0 0 105 104'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <g filter='url(#filter0_dd_14765_5004)'>
                  <rect
                    x='12.9668'
                    y='8'
                    width='80'
                    height='80'
                    rx='40'
                    fill='white'
                  />
                  <rect
                    x='14.4668'
                    y='9.5'
                    width='77'
                    height='77'
                    rx='38.5'
                    stroke='black'
                    stroke-opacity='0.2'
                    stroke-width='3'
                  />
                  <path
                    d='M37.8001 67.4998V68.5832C37.8001 69.4451 38.1425 70.2718 38.752 70.8813C39.3615 71.4908 40.1882 71.8332 41.0501 71.8332C41.9121 71.8332 42.7387 71.4908 43.3482 70.8813C43.9577 70.2718 44.3001 69.4451 44.3001 68.5832V67.4998H61.6335V68.5832C61.6335 69.4451 61.9759 70.2718 62.5854 70.8813C63.1949 71.4908 64.0215 71.8332 64.8835 71.8332C65.7454 71.8332 66.5721 71.4908 67.1816 70.8813C67.7911 70.2718 68.1335 69.4451 68.1335 68.5832V67.4998C69.2827 67.4998 70.3849 67.0433 71.1976 66.2306C72.0103 65.418 72.4668 64.3158 72.4668 63.1665V52.3332C72.4611 50.8993 71.9814 49.5075 71.1024 48.3745C70.2234 47.2416 68.9945 46.4312 67.607 46.0693L63.6896 34.3152C63.5459 33.8836 63.2699 33.5081 62.9009 33.2421C62.5318 32.9761 62.0884 32.8331 61.6335 32.8332H44.3001C43.8452 32.8331 43.4018 32.9761 43.0327 33.2421C42.6637 33.5081 42.3877 33.8836 42.244 34.3152L38.3266 46.0693C36.9391 46.4312 35.7102 47.2416 34.8312 48.3745C33.9522 49.5075 33.4725 50.8993 33.4668 52.3332V63.1665C33.4668 64.3158 33.9233 65.418 34.736 66.2306C35.5487 67.0433 36.6509 67.4998 37.8001 67.4998ZM45.8623 37.1665H60.0713L62.9616 45.8332H42.972L45.8623 37.1665ZM37.8001 52.3332C37.8001 51.7585 38.0284 51.2074 38.4347 50.8011C38.8411 50.3948 39.3922 50.1665 39.9668 50.1665H65.9668C66.5414 50.1665 67.0925 50.3948 67.4989 50.8011C67.9052 51.2074 68.1335 51.7585 68.1335 52.3332V63.1665H37.8001V52.3332ZM46.4668 26.3332C46.4668 25.7585 46.6951 25.2074 47.1014 24.8011C47.5077 24.3948 48.0588 24.1665 48.6335 24.1665H57.3001C57.8748 24.1665 58.4259 24.3948 58.8322 24.8011C59.2385 25.2074 59.4668 25.7585 59.4668 26.3332C59.4668 26.9078 59.2385 27.4589 58.8322 27.8652C58.4259 28.2716 57.8748 28.4998 57.3001 28.4998H48.6335C48.0588 28.4998 47.5077 28.2716 47.1014 27.8652C46.6951 27.4589 46.4668 26.9078 46.4668 26.3332ZM44.3001 56.6665C44.3001 57.095 44.1731 57.5139 43.935 57.8702C43.6969 58.2265 43.3585 58.5042 42.9626 58.6682C42.5667 58.8322 42.1311 58.8751 41.7108 58.7915C41.2905 58.7079 40.9044 58.5016 40.6014 58.1986C40.2984 57.8956 40.092 57.5095 40.0084 57.0892C39.9248 56.6689 39.9677 56.2333 40.1317 55.8374C40.2957 55.4414 40.5734 55.1031 40.9297 54.865C41.286 54.6269 41.7049 54.4998 42.1335 54.4998C42.7081 54.4998 43.2592 54.7281 43.6655 55.1344C44.0719 55.5408 44.3001 56.0919 44.3001 56.6665ZM65.9668 56.6665C65.9668 57.095 65.8397 57.5139 65.6017 57.8702C65.3636 58.2265 65.0252 58.5042 64.6293 58.6682C64.2334 58.8322 63.7977 58.8751 63.3774 58.7915C62.9571 58.7079 62.5711 58.5016 62.2681 58.1986C61.9651 57.8956 61.7587 57.5095 61.6751 57.0892C61.5915 56.6689 61.6344 56.2333 61.7984 55.8374C61.9624 55.4414 62.2401 55.1031 62.5964 54.865C62.9527 54.6269 63.3716 54.4998 63.8001 54.4998C64.3748 54.4998 64.9259 54.7281 65.3322 55.1344C65.7385 55.5408 65.9668 56.0919 65.9668 56.6665Z'
                    fill='#A09999'
                  />
                </g>
                <defs>
                  <filter
                    id='filter0_dd_14765_5004'
                    x='0.966797'
                    y='0'
                    width='104'
                    height='104'
                    filterUnits='userSpaceOnUse'
                    color-interpolation-filters='sRGB'
                  >
                    <feFlood flood-opacity='0' result='BackgroundImageFix' />
                    <feColorMatrix
                      in='SourceAlpha'
                      type='matrix'
                      values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                      result='hardAlpha'
                    />
                    <feOffset dy='4' />
                    <feGaussianBlur stdDeviation='6' />
                    <feComposite in2='hardAlpha' operator='out' />
                    <feColorMatrix
                      type='matrix'
                      values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0'
                    />
                    <feBlend
                      mode='normal'
                      in2='BackgroundImageFix'
                      result='effect1_dropShadow_14765_5004'
                    />
                    <feColorMatrix
                      in='SourceAlpha'
                      type='matrix'
                      values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                      result='hardAlpha'
                    />
                    <feOffset dy='4' />
                    <feGaussianBlur stdDeviation='2' />
                    <feComposite in2='hardAlpha' operator='out' />
                    <feColorMatrix
                      type='matrix'
                      values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'
                    />
                    <feBlend
                      mode='normal'
                      in2='effect1_dropShadow_14765_5004'
                      result='effect2_dropShadow_14765_5004'
                    />
                    <feBlend
                      mode='normal'
                      in='SourceGraphic'
                      in2='effect2_dropShadow_14765_5004'
                      result='shape'
                    />
                  </filter>
                </defs>
              </svg>
            </td>
          </tr>
        </tbody>
      </table>
      <button className={style.button}>Подобрать</button>
    </>
  );
};

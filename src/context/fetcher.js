export const getList = () => {
  return fetch('https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/list', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then(res => res.json());
};

export const addItems = () => {
  return fetch('https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/list', {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then(res => res.json())
    .then(
      result => {
        console.log(result);
      },
      error => {
        console.log(error);
      }
    );
};

import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  cloud: {
    name: 'average testing',
  },
  stages: [
    { duration: '2m', target: 5 },
    { duration: '6m', target: 10 },
    { duration: '2m', target: 0 },
  ],
};

export default () => {
  let response = http.get('https://facu-castro.netlify.app/');
  sleep(1);
}
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  cloud: {
    name: 'smoke testing',
  },
  vus: 3,
  duration: '20s',
}

export default function() {
  let response = http.get("https://facu-castro.netlify.app/");
  sleep(1);
}
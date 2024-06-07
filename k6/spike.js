import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  cloud: {
    name: 'spike testing',
  },
  stages: [
    {
      duration: '10s',      
      target: 10
    },
    {
      duration: '1m',
      target: 100,
    },
    {
      duration: '20s',
      target: 0,
    }
  ],
}

export default function() {
  let response = http.get("https://facu-castro.netlify.app/");
  sleep(1);
}
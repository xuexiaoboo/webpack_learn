import '../style/index.css';
import { square } from './test';

function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}

// eslint-disable-next-line
console.log(square(2));

// eslint-disable-next-line
console.log(sum(1, 2, 3, 4, 5));

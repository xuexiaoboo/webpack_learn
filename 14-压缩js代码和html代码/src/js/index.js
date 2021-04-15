// import '@babel/polyfill'

const add = (x, y) => {
  return x + y;
}

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('定时器执行完了~');
    resolve();
  }, 1000)
})

console.log(promise);

console.log(add(2, 3));

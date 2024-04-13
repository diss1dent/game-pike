//const server = 'http://pike.loc/';
const server = 'http://localhost:8085/';
const url = new URL(server + '.well-known/mercure');
url.searchParams.append('topic', 'http://pike.loc/test');

const eventSource = new EventSource(url);
eventSource.onmessage = (event) => {
  // Обработка сообщений
  console.log(JSON.parse(event.data));
};

export default function output(body) {
  console.log(JSON.stringify({ // eslint-disable-line no-console
    body,
    status: 200,
    error: null,
  }));
  process.exit(0);
}

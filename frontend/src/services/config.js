const api = process.env.DEVELOPMENT
  ? 'http://localhost:3000/api/v1/'
  : '/api/v1/'
const config = {
  api
}

export default config

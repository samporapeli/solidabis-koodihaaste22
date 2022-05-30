const base = process.env.PUBLIC_URL
  ? process.env.PUBLIC_URL
  : ''
const api = process.env.DEVELOPMENT
  ? 'http://localhost:3000' + '/api/v1'
  : base + '/api/v1'

const config = {
  api
}

export default config

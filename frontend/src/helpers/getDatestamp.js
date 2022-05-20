const getDatestamp = () => (new Date()).toISOString().split('T')[0]

export default getDatestamp

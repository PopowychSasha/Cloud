export const callAPI = ({
  url = '/',
  method = 'GET',
  headers = {
    'Content-Type': 'application/json',
  },
  body = undefined,
}) => {
  const options =
    method === 'GET' || method === 'DELETE'
      ? {
          method,
          headers,
        }
      : {
          method,
          headers,
          body: JSON.stringify(body),
        }
  return fetch(url, options)
    .then(async (data) => {
      if (data.ok) {
        return data.json()
      }
      const { message } = await data.json()

      throw new Error(message)
    })
    .catch((err) => {
      alert(err.message)
    })
}

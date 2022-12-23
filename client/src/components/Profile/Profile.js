import { change, jsx, useEffect } from '../../../lib/hooks.js'
import { useContext } from '../../../lib/hooks.js'
import { callAPI } from '../../api/callAPI.js'
import { Button } from '../Button/Button.js'
import './Profile.css'

export const Profile = () => {
  const context = useContext()
  useEffect(() => {
    if (context.key) {
      callAPI({
        url: `/api/user/${context.id}/${context.key}`,
        method: 'GET',
        context,
      }).then(({ id, name, email, key }) => {
        change(() => {
          context.login(id, name, email, key)
        })
      })
    }
  }, [])
  return (
    <div class={{ 'profile-wrapper': true }}>
      <h1 class={{ title: true }}>User profile</h1>
      <hr />
      <h2>name is {context.name}</h2>
      <h2>email is {context.email}</h2>
      <Button
        title="LOGOUT"
        action={() => change(() => context.logout())}
        type="profile-btn"
      />
    </div>
  )
}

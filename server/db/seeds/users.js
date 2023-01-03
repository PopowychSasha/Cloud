/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export const seed = async function (knex) {
  await knex('users').del()
  await knex('roles').del()

  await knex('roles').insert([
    { id: 1, role: 'user' },
    { id: 2, role: 'admin' },
  ])

  await knex('users').insert([
    {
      id: 1,
      name: 'Sasha',
      email: 'sasha@gmail.com',
      password: '11111qQ!',
      email_confirmation_token: 'djwe#*(3edjk#@*(#@Hjkdha',
      is_confirmed: false,
      role_id: 1,
    },
    {
      id: 2,
      name: 'Vova',
      email: 'vova@gmail.com',
      password: '11111qQ!',
      email_confirmation_token: 'ieuwqyr9384ry234uiid23h4iod',
      is_confirmed: false,
      role_id: 2,
    },
  ])

  await knex('recover_password_tokens').del()
  await knex('recover_password_tokens').insert([
    { id: 1, token: 'hythtyepj#*jkdwoquimvl#@', user_id: 1 },
    {
      id: 2,
      token: 'wepoiu2309uf234opf234234f2',
      user_id: 1,
    },
  ])
}

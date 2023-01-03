/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function (knex) {
  await knex.schema.createTable('users', (table) => {
    table.increments('id').unsigned().primary()
    table.string('name').notNullable()
    table.string('email').unique().notNullable()
    table.string('password').notNullable()
    table.string('email_confirmation_token').notNullable()
    table.boolean('is_confirmed').defaultTo(false)
    table.integer('role_id').unsigned().notNullable()
    table.timestamps(true, true)

    table.foreign('role_id').references('roles.id')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function (knex) {
  await knex.schema.dropTable('users')
}

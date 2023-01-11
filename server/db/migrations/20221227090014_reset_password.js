/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function (knex) {
  await knex.schema.createTable('reset_password_tokens', (table) => {
    table.increments('id').unsigned().primary()
    table.string('token').notNullable()
    table.boolean('isUsed').notNullable().defaultTo(false)
    table.timestamp('activeUntil').notNullable()
    table.integer('user_id').unsigned().notNullable()
    table.timestamps(true, true)

    table
      .foreign('user_id')
      .references('users.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')

    table.index(['token'], 'idx_token')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function (knex) {
  await knex.schema.dropTable('reset_password_tokens')
}

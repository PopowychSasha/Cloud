/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function (knex) {
  await knex.schema.createTable('folders', (table) => {
    table.increments('id').unsigned().primary()
    table.string('name').notNullable()
    table.integer('parent_id')
    table.integer('user_id').notNullable().unsigned()
    table.timestamps(true, true)

    table.foreign('user_id').references('users.id')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function (knex) {
  await knex.schema.dropTable('folders')
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function (knex) {
  await knex.schema.createTable('favorite_files', (table) => {
    table.increments('id').unsigned().primary()
    table.integer('file_id').unsigned().notNullable()
    table.integer('user_id').unsigned().notNullable()
    table.timestamps(true, true)

    table
      .foreign('file_id')
      .references('files.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')

    table
      .foreign('user_id')
      .references('users.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function (knex) {
  await knex.schema.dropTable('favorite_files')
}

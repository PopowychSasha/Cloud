/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function (knex) {
  await knex.schema.createTable('share_by_links', (table) => {
    table.increments('id').unsigned().primary()
    table.string('token').notNullable()
    table.integer('file_id').unsigned().notNullable()
    table.timestamps(true, true)

    table
      .foreign('file_id')
      .references('files.id')
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
  await knex.schema.dropTable('share_by_links')
}

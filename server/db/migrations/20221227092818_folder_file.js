/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function (knex) {
  await knex.schema.createTable('folder_files', (table) => {
    table.increments('id').unsigned().primary()
    table.integer('folder_id').unsigned().notNullable()
    table.integer('file_id').unsigned().notNullable()
    table.timestamps(true, true)

    table
      .foreign('folder_id')
      .references('folders.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
    table
      .foreign('file_id')
      .references('files.id')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function (knex) {
  await knex.schema.dropTable('folder_files')
}

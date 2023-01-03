export const up = async function (knex) {
  await knex.schema.createTable('user_file_accesses', (table) => {
    table.increments('id').unsigned().primary()
    table.boolean('readonly').defaultTo(true).notNullable()
    table.integer('file_id').notNullable().unsigned()
    table.integer('user_id').notNullable().unsigned()
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
  await knex.schema.dropTable('user_file_accesses')
}

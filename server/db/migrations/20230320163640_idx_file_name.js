/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async function (knex) {
  await knex.schema.alterTable('files', (table) => {
    table.index(['name'], 'idx_name', {
      indexType: 'FULLTEXT',
    })
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async function (knex) {
  await knex.schema.table('files', (table) => {
    table.dropIndex(null, 'idx_name')
  })
}

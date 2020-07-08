exports.up = function(knex) {
    return knex.schema
        .createTable('account', tbl => {
            tbl.increments();
            tbl.string('name', 128)
                .unique()
                .notNullable()
            tbl.string('password', 128)
                .notNullable()
            tbl.string('email', 128)
                .unique()
                .notNullable()
        })

        .createTable('user', tbl => {
            tbl.increments();
            tbl.integer('account_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('account')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')

            tbl.string('username', 128)
                .unique()
                .notNullable()
            tbl.string('avatar', 128)
        })

        .createTable('picture', tbl => {
            tbl.increments();
            tbl.integer('account_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('account')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')

            tbl.string('picture', 256)
            tbl.timestamps(true, true);
        })

        .createTable('likes', tbl => {
            tbl.increments();
            tbl.integer('account_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('account')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')

            tbl.integer('picture_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('picture')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')
        })

        .createTable('comments', tbl => {
            tbl.increments();
            tbl.integer('account_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('account')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')

            tbl.integer('picture_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('picture')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')

            tbl.string('comment', 128)
                .notNullable()
        })

        .createTable('settings', tbl => {
            tbl.increments();
            tbl.integer('account_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('account')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')

            tbl.string('new_name', 128)
            tbl.string('new_username', 128)
            tbl.string('new_password', 128)
            tbl.boolean('dark_mode')
                .defaultTo(false);
        })

};

exports.down = function(knex) {
  return knex.schema
      .dropTableIfExists('settings')
      .dropTableIfExists('comments')
      .dropTableIfExists('likes')
      .dropTableIfExists('picture')
      .dropTableIfExists('user')
      .dropTableIfExists('account')
};

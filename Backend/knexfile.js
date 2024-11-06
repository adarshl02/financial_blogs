// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "postgresql",
    connection:
      "postgresql://neondb_owner:MmtnKkB2rOX8@ep-billowing-king-a5zgcz2l.us-east-2.aws.neon.tech/neondb?sslmode=require",
    pool: {
      min: 2,
      max: 10,
    },
    migrations: { directory: "./migrations" },
    seeds: { directory: "./seeds" },
  },
};

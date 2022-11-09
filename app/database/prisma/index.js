const { createSchema } = require("schemix");

createSchema({
  // basePath should be a path to the folder containing models/, enums/, and mixins/.
  basePath: __dirname,
  datasource: {
    provider: "postgresql",
    url: { env: "DATABASE_URL" },
  },
  generator: {
    provider: "prisma-client-js",
  },
}).export(__dirname, "schema");

const Sentry = require("@sentry/node");
const { nodeProfilingIntegration } = require("@sentry/profiling-node");
require("dotenv").config();

Sentry.init({
  dsn: process.env.SENTRY_DSN || "https://8f5e6bb617227c6beba3939f20d69c37@o4511825282269184.ingest.de.sentry.io/4511825353637968",
  integrations: [
    nodeProfilingIntegration(),
  ],
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
});

module.exports = Sentry;

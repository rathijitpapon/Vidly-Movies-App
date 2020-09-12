// import Raven from "raven-js";

function init() {
  // Raven.config("https://e8c44c20201a44bb90f79d9850515fc8@o446601.ingest.sentry.io/5425352", {
  //   release: "1-0-0",
  //   environment: "development-test"
  // }).install();
}

function log(error) {
  console.log(error);
  // Raven.captureException(error);
}

export default {
  init,
  log
};
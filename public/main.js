const CLIENT_KEY = "";
const SESSION_ID = "";
const SESSION_DATA = "";

async function init() {
  const globalConfiguration = {
    session: {
      id: SESSION_ID,
      sessionData: SESSION_DATA,
    },
    environment: "test",
    locale: "en-US",
    countryCode: "US",
    clientKey: CLIENT_KEY,
    onPaymentCompleted: (result, component) => {
      console.info(result, component);
    },
    onPaymentFailed: (result, component) => {
      console.info(result, component);
    },
    onError: (error, component) => {
      console.error(error.name, error.message, error.stack, component);
    },
  };
  const { AdyenCheckout, Card, Dropin } = window.AdyenWeb;

  const checkout = await AdyenCheckout(globalConfiguration);

  const dropinConfiguration = {
    // Required if you import individual payment methods.
    paymentMethodComponents: [Card],
    // Optional configuration.
    onReady: () => {},
    instantPaymentTypes: ["applepay", "googlepay"],
    paymentMethodsConfiguration: {
      card: {
        styles: { base: { color: "white", background: "black" } },
      },
    },
  };

  new Dropin(checkout, dropinConfiguration).mount("#dropin-container");
}

window.addEventListener("DOMContentLoaded", init);

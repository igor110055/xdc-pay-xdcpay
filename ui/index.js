const render = require('react-dom').render
const h = require('react-hyperscript')
const Root = require('./app/root')
const actions = require('./app/actions')
const configureStore = require('./app/store')
const txHelper = require('./lib/tx-helper')
const { fetchLocale } = require('./i18n-helper')
const log = require('loglevel')

module.exports = launchMetamaskUi

log.setLevel(global.METAMASK_DEBUG ? 'debug' : 'warn')

function launchMetamaskUi (opts, cb) {
  var accountManager = opts.accountManager
  actions._setBackgroundConnection(accountManager)
  // check if we are unlocked first
  accountManager.getState(function (err, metamaskState) {
    if (err) return cb(err)
    startApp(metamaskState, accountManager, opts)
      .then((store) => {
        cb(null, store)
      })
  })
}

async function startApp (metamaskState, accountManager, opts) {
  // parse opts
  if (!metamaskState.featureFlags) metamaskState.featureFlags = {}

  const currentLocaleMessages = metamaskState.currentLocale
    ? await fetchLocale(metamaskState.currentLocale)
    : {}
  const enLocaleMessages = await fetchLocale('en')

  const store = configureStore({

    // metamaskState represents the cross-tab state
    metamask: metamaskState,

    // appState represents the current tab's popup state
    appState: {},

    localeMessages: {
      current: currentLocaleMessages,
      en: enLocaleMessages,
    },

    // Which blockchain we are using:
    networkVersion: opts.networkVersion,
  })

  // if unconfirmed txs, start on txConf page
  const unapprovedTxsAll = txHelper(metamaskState.unapprovedTxs, metamaskState.unapprovedMsgs, metamaskState.unapprovedPersonalMsgs, metamaskState.unapprovedTypedMessages, metamaskState.network)
  const numberOfUnapprivedTx = unapprovedTxsAll.length
  if (numberOfUnapprivedTx > 0) {

    store.dispatch(actions.showConfTxPage({
      id: unapprovedTxsAll[numberOfUnapprivedTx - 1].id,
    }))
  }

  const convertToXDC = (address) => {
    return address.replace('0x', 'xdc').toLowerCase();
  }

  accountManager.on('update', function (metamaskState) {
    // if (metamaskState.accountTokens) {
    //   const accountTokens = Object.keys(metamaskState.accountTokens).reduce((acc, account) => {
    //     const xdcAccount = convertToXDC(account);
    //     acc[xdcAccount] = metamaskState.accountTokens[account];
    //     return acc;
    //   }, {});
    //   metamaskState = {...metamaskState, accountTokens}
    // }
    // if (metamaskState.accounts) {
    //   const accounts = Object.keys(metamaskState.accounts).reduce((acc, account) => {
    //     const xdcAccount = convertToXDC(account);
    //     acc[xdcAccount] = {};
    //     if (metamaskState.accounts[account].address) {
    //       acc[xdcAccount] = {...metamaskState.accounts[account], address: xdcAccount };
    //     }
    //     return acc;
    //   }, {});
    //   metamaskState = {...metamaskState, accounts}
    // }
    // // if (metamaskState.identities) {
    // //   const identities = Object.keys(metamaskState.identities).reduce((acc, account) => {
    // //     const xdcAccount = convertToXDC(account);
    // //     acc[xdcAccount] = {};
    // //     if (metamaskState.identities[account].address) {
    // //       acc[account] = {...metamaskState.identities[account], address: xdcAccount };
    // //     }
    // //     return acc;
    // //   }, {});
    // //   metamaskState = {...metamaskState, identities}
    // // }

    // if (metamaskState.selectedAddress) {
    //   metamaskState = {...metamaskState, selectedAddress: convertToXDC(metamaskState.selectedAddress)}
    // }
    store.dispatch(actions.updateMetamaskState(metamaskState))
  })

  // global metamask api - used by tooling
  global.metamask = {
    updateCurrentLocale: (code) => {
      store.dispatch(actions.updateCurrentLocale(code))
    },
    setProviderType: (type) => {
      store.dispatch(actions.setProviderType(type))
    },
  }

  // start app
  render(
    h(Root, {
      // inject initial state
      store: store,
    }
  ), opts.container)

  return store
}
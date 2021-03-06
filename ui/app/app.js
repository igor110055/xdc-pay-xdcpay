const { Component } = require('react')
const PropTypes = require('prop-types')
const connect = require('react-redux').connect
const { Route, Switch, withRouter } = require('react-router-dom')
const { compose } = require('recompose')
const h = require('react-hyperscript')
const actions = require('./actions')
const classnames = require('classnames')
const log = require('loglevel')
const { getMetaMaskAccounts } = require('./selectors')

// init
const InitializeScreen = require('../../mascara/src/app/first-time').default
// accounts
const SendTransactionScreen = require('./components/send/send.container')
const ConfirmTransaction = require('./components/pages/confirm-transaction')

// slideout menu
const Sidebar = require('./components/sidebars').default

// other views
import Home from './components/pages/home'
import Settings from './components/pages/settings'
const Authenticated = require('./components/pages/authenticated')
const Initialized = require('./components/pages/initialized')
const RestoreVaultPage = require('./components/pages/keychains/restore-vault').default
// const RevealSeedConfirmation = require('./components/pages/keychains/reveal-seed')
const AddTokenPage = require('./components/pages/add-token')
const ConfirmAddTokenPage = require('./components/pages/confirm-add-token')
const ConfirmAddSuggestedTokenPage = require('./components/pages/confirm-add-suggested-token')
const CreateAccountPage = require('./components/pages/create-account')
const NoticeScreen = require('./components/pages/notice')

const Loading = require('./components/loading-screen')
const NetworkDropdown = require('./components/dropdowns/network-dropdown')
const AccountMenu = require('./components/account-menu')

// Global Modals
const Modal = require('./components/modals/index').Modal
// Global Alert
const Alert = require('./components/alert')

import AppHeader from './components/app-header'
import UnlockPage from './components/pages/unlock-page'

// Routes
const {
  DEFAULT_ROUTE,
  UNLOCK_ROUTE,
  SETTINGS_ROUTE,
  REVEAL_SEED_ROUTE,
  RESTORE_VAULT_ROUTE,
  ADD_TOKEN_ROUTE,
  CONFIRM_ADD_TOKEN_ROUTE,
  CONFIRM_ADD_SUGGESTED_TOKEN_ROUTE,
  NEW_ACCOUNT_ROUTE,
  SEND_ROUTE,
  CONFIRM_TRANSACTION_ROUTE,
  INITIALIZE_ROUTE,
  NOTICE_ROUTE,
} = require('./routes')

class App extends Component {
  componentWillMount () {
    const { currentCurrency, setCurrentCurrencyToUSD } = this.props

    if (!currentCurrency) {
      setCurrentCurrencyToUSD()
    }
  }

  renderRoutes () {
    const exact = true

    return (
      h(Switch, [
        h(Route, { path: INITIALIZE_ROUTE, component: InitializeScreen }),
        h(Initialized, { path: UNLOCK_ROUTE, exact, component: UnlockPage }),
        h(Initialized, { path: RESTORE_VAULT_ROUTE, exact, component: RestoreVaultPage }),
        h(Authenticated, { path: REVEAL_SEED_ROUTE, exact, component: RevealSeedConfirmation }),
        h(Authenticated, { path: SETTINGS_ROUTE, component: Settings }),
        h(Authenticated, { path: NOTICE_ROUTE, exact, component: NoticeScreen }),
        h(Authenticated, {
          path: `${CONFIRM_TRANSACTION_ROUTE}/:id?`,
          component: ConfirmTransaction,
        }),
        h(Authenticated, { path: SEND_ROUTE, exact, component: SendTransactionScreen }),
        h(Authenticated, { path: ADD_TOKEN_ROUTE, exact, component: AddTokenPage }),
        h(Authenticated, { path: CONFIRM_ADD_TOKEN_ROUTE, exact, component: ConfirmAddTokenPage }),
        h(Authenticated, { path: CONFIRM_ADD_SUGGESTED_TOKEN_ROUTE, exact, component: ConfirmAddSuggestedTokenPage }),
        h(Authenticated, { path: NEW_ACCOUNT_ROUTE, component: CreateAccountPage }),
        h(Authenticated, { path: DEFAULT_ROUTE, exact, component: Home }),
      ])
    )
  }

  render () {
    const {
      isLoading,
      alertMessage,
      loadingMessage,
      network,
      isMouseUser,
      provider,
      frequentRpcList,
      currentView,
      setMouseUserState,
      sidebar,
    } = this.props
    const isLoadingNetwork = network === 'loading' && currentView.name !== 'config'
    const loadMessage = loadingMessage || isLoadingNetwork ?
      this.getConnectingLabel(loadingMessage) : null
    log.debug('Main ui render function')

    return (
      h('.flex-column.full-height', {
        className: classnames({ 'mouse-user-styles': isMouseUser }),
        style: {
          overflowX: 'hidden',
          position: 'relative',
          alignItems: 'center',
        },
        tabIndex: '0',
        onClick: () => setMouseUserState(true),
        onKeyDown: (e) => {
          if (e.keyCode === 9) {
            setMouseUserState(false)
          }
        },
      }, [

        // global modal
        h(Modal, {}, []),

        // global alert
        h(Alert, {visible: this.props.alertOpen, msg: alertMessage}),

        h(AppHeader),

        // sidebar
        h(Sidebar, {
          sidebarOpen: sidebar.isOpen,
          hideSidebar: this.props.hideSidebar,
          transitionName: sidebar.transitionName,
          type: sidebar.type,
        }),

        // network dropdown
        h(NetworkDropdown, {
          provider,
          frequentRpcList,
        }, []),

        h(AccountMenu),

        h('div.main-container-wrapper', [
          (isLoading || isLoadingNetwork) && h(Loading, {
            loadingMessage: loadMessage,
          }),

          // content
          this.renderRoutes(),
        ]),
      ])
    )
  }

  toggleMetamaskActive () {
    if (!this.props.isUnlocked) {
      // currently inactive: redirect to password box
      var passwordBox = document.querySelector('input[type=password]')
      if (!passwordBox) return
      passwordBox.focus()
    } else {
      // currently active: deactivate
      this.props.dispatch(actions.lockMetamask(false))
    }
  }

  getConnectingLabel = function (loadingMessage) {
    if (loadingMessage) {
      return loadingMessage
    }
    const { provider } = this.props
    const providerName = provider.type

    let name

    if (providerName === 'mainnet') {
      name = this.context.t('connectingToMainnet')
    } else if (providerName === 'ropsten') {
      name = this.context.t('connectingToRopsten')
    } else if (providerName === 'kovan') {
      name = this.context.t('connectingToKovan')
    } else if (providerName === 'rinkeby') {
      name = this.context.t('connectingToRinkeby')
    } else if (providerName === 'poa') {
      name = this.context.t('connectingToPOA')
    } else {
      name = this.context.t('connectingToUnknown')
    }

    return name
  }

  getNetworkName () {
    const { provider } = this.props
    const providerName = provider.type

    let name

    if (providerName === 'mainnet') {
      name = this.context.t('mainnet')
    } else if (providerName === 'ropsten') {
      name = this.context.t('ropsten')
    } else if (providerName === 'kovan') {
      name = this.context.t('kovan')
    } else if (providerName === 'rinkeby') {
      name = this.context.t('rinkeby')
    } else if (providerName === 'poa') {
      name = this.context.t('poa')
    } else {
      name = this.context.t('unknownNetwork')
    }

    return name
  }
}

App.propTypes = {
  currentCurrency: PropTypes.string,
  setCurrentCurrencyToUSD: PropTypes.func,
  isLoading: PropTypes.bool,
  loadingMessage: PropTypes.string,
  alertMessage: PropTypes.string,
  network: PropTypes.string,
  provider: PropTypes.object,
  frequentRpcList: PropTypes.array,
  currentView: PropTypes.object,
  sidebar: PropTypes.object,
  alertOpen: PropTypes.bool,
  hideSidebar: PropTypes.func,
  isMascara: PropTypes.bool,
  isOnboarding: PropTypes.bool,
  isUnlocked: PropTypes.bool,
  networkDropdownOpen: PropTypes.bool,
  showNetworkDropdown: PropTypes.func,
  hideNetworkDropdown: PropTypes.func,
  history: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  toggleAccountMenu: PropTypes.func,
  selectedAddress: PropTypes.string,
  noActiveNotices: PropTypes.bool,
  lostAccounts: PropTypes.array,
  isInitialized: PropTypes.bool,
  forgottenPassword: PropTypes.bool,
  activeAddress: PropTypes.string,
  unapprovedTxs: PropTypes.object,
  seedWords: PropTypes.string,
  unapprovedMsgCount: PropTypes.number,
  unapprovedPersonalMsgCount: PropTypes.number,
  unapprovedTypedMessagesCount: PropTypes.number,
  welcomeScreenSeen: PropTypes.bool,
  isPopup: PropTypes.bool,
  betaUI: PropTypes.bool,
  isMouseUser: PropTypes.bool,
  setMouseUserState: PropTypes.func,
  t: PropTypes.func,
}

function mapStateToProps (state) {
  const { appState, metamask } = state
  const {
    networkDropdownOpen,
    sidebar,
    alertOpen,
    alertMessage,
    isLoading,
    loadingMessage,
  } = appState

  const accounts = getMetaMaskAccounts(state)

  const {
    identities,
    address,
    keyrings,
    isInitialized,
    noActiveNotices,
    seedWords,
    unapprovedTxs,
    nextUnreadNotice,
    lostAccounts,
    unapprovedMsgCount,
    unapprovedPersonalMsgCount,
    unapprovedTypedMessagesCount,
  } = metamask
  const selected = address || Object.keys(accounts)[0]

  return {
    // state from plugin
    networkDropdownOpen,
    sidebar,
    alertOpen,
    alertMessage,
    isLoading,
    loadingMessage,
    noActiveNotices,
    isInitialized,
    isUnlocked: state.metamask.isUnlocked,
    selectedAddress: state.metamask.selectedAddress,
    currentView: state.appState.currentView,
    activeAddress: state.appState.activeAddress,
    transForward: state.appState.transForward,
    isMascara: state.metamask.isMascara,
    isOnboarding: Boolean(!noActiveNotices || seedWords || !isInitialized),
    isPopup: state.metamask.isPopup,
    seedWords: state.metamask.seedWords,
    unapprovedTxs,
    unapprovedMsgs: state.metamask.unapprovedMsgs,
    unapprovedMsgCount,
    unapprovedPersonalMsgCount,
    unapprovedTypedMessagesCount,
    menuOpen: state.appState.menuOpen,
    network: state.metamask.network,
    provider: state.metamask.provider,
    forgottenPassword: state.appState.forgottenPassword,
    nextUnreadNotice,
    lostAccounts,
    frequentRpcList: state.metamask.frequentRpcList || [],
    currentCurrency: state.metamask.currentCurrency,
    isMouseUser: state.appState.isMouseUser,
    betaUI: state.metamask.featureFlags.betaUI,
    isRevealingSeedWords: state.metamask.isRevealingSeedWords,
    Qr: state.appState.Qr,
    welcomeScreenSeen: state.metamask.welcomeScreenSeen,

    // state needed to get account dropdown temporarily rendering from app bar
    identities,
    selected,
    keyrings,
  }
}

function mapDispatchToProps (dispatch, ownProps) {
  return {
    dispatch,
    hideSidebar: () => dispatch(actions.hideSidebar()),
    showNetworkDropdown: () => dispatch(actions.showNetworkDropdown()),
    hideNetworkDropdown: () => dispatch(actions.hideNetworkDropdown()),
    setCurrentCurrencyToUSD: () => dispatch(actions.setCurrentCurrency('usd')),
    toggleAccountMenu: () => dispatch(actions.toggleAccountMenu()),
    setMouseUserState: (isMouseUser) => dispatch(actions.setMouseUserState(isMouseUser)),
  }
}

App.contextTypes = {
  t: PropTypes.func,
}

module.exports = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(App)

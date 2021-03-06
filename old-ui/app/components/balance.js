const Component = require('react').Component
const h = require('react-hyperscript')
const inherits = require('util').inherits
const formatBalance = require('../util').formatBalance
const generateBalanceObject = require('../util').generateBalanceObject
const Tooltip = require('./tooltip.js')
const FiatValue = require('./fiat-value.js')

module.exports = EthBalanceComponent

inherits(EthBalanceComponent, Component)
function EthBalanceComponent () {
  Component.call(this)
}

EthBalanceComponent.prototype.render = function () {
  var props = this.props
  let { value } = props
  const { style, width, network } = props
  var needsParse = this.props.needsParse !== undefined ? this.props.needsParse : true
  value = value ? formatBalance(value, 6, needsParse, network) : '...'

  return (

    h('.ether-balance.ether-balance-amount', {
      style: style,
    }, [
      h('div', {
        style: {
          display: 'inline',
          width: width,
        },
      }, this.renderBalance(value)),
    ])

  )
}
EthBalanceComponent.prototype.renderBalance = function (value) {
  var props = this.props
  if (value === 'None') return value
  if (value === '...') return value
  var balanceObj = generateBalanceObject(value, props.shorten ? 1 : 3)
  var balance
  var splitBalance = value.split(' ')
  var ethNumber = splitBalance[0]
  var ethSuffix = splitBalance[2]
  const showFiat = 'showFiat' in props ? props.showFiat : true

  if (props.shorten) {
    balance = balanceObj.shortBalance
  } else {
    balance = balanceObj.balance
  }

  var label = balanceObj.label

  return (
    h(Tooltip, {
      position: 'bottom',
      title: `${ethNumber} ${ethSuffix}`,
    }, h('div.flex-column', [
      h('.flex-row', {
        style: {
          alignItems: 'flex-end',
          lineHeight: '14px',
          fontFamily: 'Nunito Bold',
          textRendering: 'geometricPrecision',
        },
      }, [
        h('div', {
          style: {
            width: '100%',
            textAlign: 'right',
          },
        }, this.props.incoming ? `+${balance}` : balance),
        h('div', {
          style: {
            color: ' #AEAEAE',
            fontSize: '12px',
            marginLeft: '5px',
          },
        }, label),
      ]),

      showFiat ? h(FiatValue, { value: props.value, network: props.network }) : null,
    ]))
  )
}

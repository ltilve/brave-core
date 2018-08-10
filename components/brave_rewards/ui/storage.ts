/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

// Utils
import { debounce } from '../common/debounce'

const keyName = 'rewards-data'

const defaultState: Rewards.State = {
  createdTimestamp: null,
  enabledMain: false,
  enabledAds: true,
  enabledContribute: true,
  firstLoad: null,
  wasFunded: false,
  walletCreated: false,
  walletCreateFailed: false,
  contributionMinTime: 8000,
  contributionMinVisits: 1,
  contributionMonthly: 10,
  contributionNonVerified: true,
  contributionVideos: true,
  donationAbilityYT: true,
  donationAbilityTwitter: true,
  walletInfo: {
    balance: 0,
    choices: [5.0, 7.5, 10.0, 17.5, 25.0, 50.0, 75.0, 100.0],
    probi: '0'
  },
  connectedWallet: false,
  recoveryKey: '',
  ui: {
    walletRecoverySuccess: null
  }
}

const cleanData = (state: Rewards.State) => state

export const load = (): Rewards.State => {
  const data = window.localStorage.getItem(keyName)
  let state: Rewards.State = defaultState
  if (data) {
    try {
      state = JSON.parse(data)
    } catch (e) {
      console.error('Could not parse local storage data: ', e)
    }
  }
  return cleanData(state)
}

export const debouncedSave = debounce((data: Rewards.State) => {
  if (data) {
    window.localStorage.setItem(keyName, JSON.stringify(cleanData(data)))
  }
}, 50)
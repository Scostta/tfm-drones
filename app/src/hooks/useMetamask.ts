import { useState, useEffect, useCallback } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';

import {
  CUSTOM_ERRORS,
  CHAIN_NETWORKS,
  ETH,
  SUPPORTED_CHAIN_ID,
} from '../constants';

export function useMetamask() {
  const [error, setError] = <any>useState();
  const [isConnected, setIsConnected] = useState(() =>
    window.ethereum?.isConnected()
  );
  const [currentAccount, setCurrentAccount] = useState();

  useEffect(() => {
    if (window.ethereum) {
      setIsConnected(window.ethereum.isConnected());
    }
  }, [currentAccount]);

  useEffect(() => {
    setIsConnected(!!window?.ethereum?._state?.accounts?.length);
  }, [window?.ethereum?._state?.accounts?.length]);

  const handleAccountsChanged = useCallback(
    (accounts) => {
      let account = currentAccount;
      if (!accounts.length) {
        setError(new Error(CUSTOM_ERRORS.NO_CONNECTED));
      } else if (accounts[0] !== currentAccount) {
        account = accounts[0];
        setCurrentAccount(accounts[0].toLowerCase());
      }
      return account;
    },
    [currentAccount]
  );

  const handleChainChanged = useCallback((chainId) => {
    const decimal = parseInt(chainId);
    if (CHAIN_NETWORKS[decimal]) {
      console.log(`You are on the ${CHAIN_NETWORKS[decimal]} network :)`);
    }
    setError(
      decimal === SUPPORTED_CHAIN_ID
        ? null
        : new Error(CUSTOM_ERRORS.UNSUPPORTED_NETWORK)
    );
  }, []);

  useEffect(() => {
    if (!window.ethereum) {
      return setError(new Error(CUSTOM_ERRORS.NO_METAMASK));
    }

    detectEthereumProvider().then((provider: any) => {
      if (!provider) {
        setError(new Error(CUSTOM_ERRORS.NO_METAMASK));
      } else if (provider !== window.ethereum) {
        setError(new Error(CUSTOM_ERRORS.MULTIPLE_WALLETS));
      }
    });

    window.ethereum.request({ method: ETH.CHAIN_ID }).then(handleChainChanged);
    window.ethereum.on(ETH.CHAIN_CHANGED, handleChainChanged);

    window.ethereum
      .request({ method: ETH.ACCOUNTS })
      .then(handleAccountsChanged)
      .catch((err: any) => {
        setError(err);
      });
    window.ethereum.on(ETH.ACCOUNTS_CHANGED, handleAccountsChanged);
  }, [handleChainChanged, handleAccountsChanged]);

  const connect = useCallback(async () => {
    return window.ethereum
      .request({ method: ETH.REQ_ACCOUNTS })
      .then(handleAccountsChanged)
      .catch((err: any) => {
        console.log(err);
        if (err.code === 4001) {
          setError(new Error(CUSTOM_ERRORS.NO_CONNECTED));
        } else {
          setError(err);
        }
      });
  }, [handleAccountsChanged]);

  return {
    error,
    connect,
    isConnected,
    currentAccount,
  };
}

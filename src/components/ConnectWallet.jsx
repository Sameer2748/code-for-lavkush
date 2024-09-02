import React, { useMemo, useState } from 'react';
import { ConnectionProvider, WalletProvider, useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl, LAMPORTS_PER_SOL } from '@solana/web3.js';
import '@solana/wallet-adapter-react-ui/styles.css';
import SolDrop from './SolDrop';
import TransferSol from './TransferSol';

export const ConnectWalletButton = () => {
    const network = WalletAdapterNetwork.Devnet;
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);
    const wallet = useWallet()

    const wallets = useMemo(() => [
        new PhantomWalletAdapter()
    ], [network]);


    return (
        <div>
            <ConnectionProvider endpoint={endpoint}>
                <WalletProvider wallets={wallets} autoConnect>
                    <WalletModalProvider className='flex gap-4'>
                        <div className='flex gap-4'>
                            <WalletMultiButton />
                            { wallet && <WalletInfo />}
                        </div>
                        <div>
                            <TransferSol />
                            <SolDrop />
                        </div>
                    </WalletModalProvider>
                </WalletProvider>
            </ConnectionProvider>
        </div>
    );
};

export const WalletInfo = ({ wallet }) => {
    const { connection } = useConnection();
    const { publicKey } = useWallet();
    const [balance, setBalance] = useState(0);

    React.useEffect(() => {
        if (publicKey) {
            connection.getBalance(publicKey).then(balance => {
                setBalance(balance / LAMPORTS_PER_SOL);
            }).catch(error => {
                console.error("Error fetching balance:", error);
            });
        } else {
            setBalance(0);
        }
    }, [publicKey, connection]);

    if (!publicKey) {
        return <div>Please connect your wallet.</div>;
    }

    return (
        <div>
            <p>Your public key: {publicKey.toString()}</p>
            <p>SOL Balance: {balance}</p>
        </div>
    );
};

"use client";
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import React, { useState } from 'react';

const TransferSol = ({}) => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    const [to, setTo] = useState('');
    const [amount, setAmount] = useState('');

    const sendToken = async () => {
        if (!to || !amount) {
            alert("Please fill in all fields");
            return;
        }

        try {
            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: publicKey,
                    toPubkey: new PublicKey(to),
                    lamports: parseFloat(amount) * LAMPORTS_PER_SOL,
                })
            );

            await sendTransaction(transaction, connection);
            setAmount('');
            setTo('');
            alert(`Sent ${amount} SOL to ${to}`);
        } catch (error) {
            console.error("Error sending transaction:", error);
            alert("Failed to send transaction");
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="To"
                value={to}
                onChange={(e) => setTo(e.target.value)}
            />
            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={sendToken}>Send Token</button>
        </div>
    );
};

export default TransferSol;

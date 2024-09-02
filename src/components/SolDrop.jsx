import React, { useState } from "react"
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

const SolDrop = () => {
    const wallet= useWallet();
    const [amount, setAmount] = useState();

    const {connection} = useConnection();

    async function sendairdroptouser(){
        await connection.requestAirdrop(wallet.publicKey, amount * LAMPORTS_PER_SOL);
        alert("airdropped sol");
    }

  return (
    <>
    <input type="number" onChange={(e)=>setAmount(e.target.value)} />
    <button onClick={sendairdroptouser}>drop sol</button>
    </>
  )
}

export default SolDrop;
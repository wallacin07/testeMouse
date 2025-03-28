"use client"

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Router } from "next/router";
import { useState } from "react";



export default function Home() {
  const [username,setUsername] = useState<string>("");
  const router = useRouter()
  
  const saveUsername = (username : string) =>
    {
      localStorage.setItem("username", username);
      router.push("/Hub")
    }
  return (
    <div >
      <input className="border-black border-2 border-solid" type="text" onChange={e => setUsername(e.target.value)}  />
      <button className="border-red-600 border-2 border-solid w-20 h-20" type="button" onClick={() => saveUsername(username)}>clica</button>
    </div>
  );
}

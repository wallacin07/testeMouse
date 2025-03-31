
"use client"

import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";

export default function Hub() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
    const [remoteMouse, setRemoteMouse] = useState({ x: 0, y: 0 });
    const [username,setUsername] = useState<string | null>("");
    const [anotherUsername,setAnotherUsername] = useState<string | null>("");

    useEffect(() => {
        const connectSignalR = async () => {
            const conn = new signalR.HubConnectionBuilder()
                .withUrl("https://testemouse-production.up.railway.app/mouse") // URL do backend
                .withAutomaticReconnect()
                .build();

            await conn.start();
            console.log("Conectado ao SignalR");

            // Atualiza o estado com a conexão estabelecida
            setConnection(conn);

            // Adiciona o listener depois que a conexão estiver pronta
            conn.on("ReceiveMousePosition", (username,x, y) => {
                setRemoteMouse({ x, y });
                setAnotherUsername(username)
            });

            return conn;
        };

        let connInstance: signalR.HubConnection | null = null;

        connectSignalR().then(conn => {
            connInstance = conn;
        });

        return () => {
            connInstance?.stop().then(() => console.log("Desconectado do SignalR"));
        };
    }, []);

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            const { clientX, clientY } = event;
            setMousePos({ x: clientX, y: clientY });
            setUsername(localStorage.getItem("username"))

            // Enviar posição do mouse para o servidor
            connection?.send("SendMousePosition", username, clientX, clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [connection]);



    return (
        <div>
            <div
             style={{
                position: "absolute",
                left: remoteMouse.x,
                top: remoteMouse.y,
                width: 20,
                height: 20,
                backgroundColor: "red",
                borderRadius: "50%",
                pointerEvents: "none",
                transform: "translate(-50%, -50%)",
                transition: "left 0.1s linear, top 0.1s linear"
            }}>
                <p>Seu Mouse: {mousePos.x}, {mousePos.y}</p>
            </div>

            {/* Representação visual do cursor remoto */}
            <div 
                style={{
                    position: "absolute",
                    left: remoteMouse.x,
                    top: remoteMouse.y,
                    width: 20,
                    height: 20,
                    backgroundColor: "red",
                    borderRadius: "50%",
                    pointerEvents: "none",
                    transform: "translate(-50%, -50%)",
                    transition: "left 0.1s linear, top 0.1s linear"
                }}
            />
            {anotherUsername}: {remoteMouse.x}, {remoteMouse.y}
        </div>
    );
}

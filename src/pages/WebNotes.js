import React, {useState, useEffect} from "react";
import {Badge, Button, ButtonGroup, Typography} from "@mui/material";

function WebNotes() {
    const [initialRecords, setInitialRecords] = useState([]);
    const [initialCount, setIinitialCount] = useState(0);
    const [message, setMessage] = useState("");
    const [ws, setWs] = useState(null);

    useEffect(() => {
        // const newWs = new WebSocket("wss://fs-web-backend.onrender.com/notes/");
        const newWs = new WebSocket("ws://127.0.0.1:8002/notes/");
        setWs(newWs);

        return () => {
            newWs.close(); // close the WebSocket when the component unmounts
        };
    }, []); // empty dependency array to run this effect only once

    useEffect(() => {
        if (!ws) return;

        ws.onmessage = (event) => {
            const json = JSON.parse(event.data);
            console.log(json);

            try {
                setMessage(json.message);
                setInitialRecords(json.data);
                setIinitialCount(json.data.length);
            } catch (err) {
                console.log(err);
            }
        };
    }, [ws]);

    const handleGetLatestRecords = () => {
        if (ws) {
            const apiCall = {
                action: "get_latest_records",
            };
            ws.send(JSON.stringify(apiCall));
        }
    };
    const handleActiveRecords = () => {
        if (ws) {
            const apiCall = {
                action: "get_active_records",
            };
            ws.send(JSON.stringify(apiCall));
        }
    };

    const initialRecordsList = initialRecords.map((record) => (
        <div key={record.id}>
            <p>Title: {record.title} ---- Body: {record.body}</p>
        </div>
    ));

    return (
        <div>
            <h2>WebSocket Message</h2>
            <Typography>{message} ====
                <Badge color="secondary" badgeContent={initialCount}>
<span className="material-icons-outlined">
notifications
</span> </Badge>

            </Typography>

            <h2>Initial Records</h2>
            {initialRecordsList}
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button variant="contained" color="success" onClick={handleGetLatestRecords}>Latest Records</Button>
                <Button variant="contained" color="error" onClick={handleActiveRecords}>Active Records</Button>
            </ButtonGroup>
        </div>
    );
}

export default WebNotes;

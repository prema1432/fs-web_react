import React, { useState, useEffect } from "react";

function WebNotes() {
  const [initialRecords, setInitialRecords] = useState([]);
  const [message, setMessage] = useState("");
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const newWs = new WebSocket("ws://127.0.0.1:8001/notes/");
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

  const initialRecordsList = initialRecords.map((record) => (
    <div key={record.id}>
      <p>Title: {record.title} ---- Body: {record.body}</p>
    </div>
  ));

  return (
    <div>
      <h2>WebSocket Message</h2>
      <p>{message}</p>

      <h2>Initial Records</h2>
      {initialRecordsList}

      <button onClick={handleGetLatestRecords}>Get Latest Records</button>
    </div>
  );
}

export default WebNotes;

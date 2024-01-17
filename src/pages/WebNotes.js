import React, { useState, useEffect } from "react";

function WebNotes() {
  const [bids, setBids] = useState([0]);
  const [initialRecords, setInitialRecords] = useState([]);

  const ws = new WebSocket("ws://127.0.0.1:8001/notes/");

  useEffect(() => {
    const apiCall = {
      action: "get_latest_records",
    };

    ws.onopen = () => {
      ws.send(JSON.stringify(apiCall));
    };

    ws.onmessage = (event) => {
      const json = JSON.parse(event.data);
      console.log(json)
      try {
        if (json.message === "Initial records") {
          setInitialRecords(json.data);
        } else if (json.event === "data") {
          setBids(json.data.bids.slice(0, 5));
        }
      } catch (err) {
        console.log(err);
      }
    };

    return () => {
      ws.close(); // close the WebSocket when the component unmounts
    };
  }, []); // empty dependency array to run this effect only once

  const firstBids = bids.map((item, index) => (
    <div key={index}>
      <p>{item}</p>
    </div>
  ));

  const initialRecordsList = initialRecords.map((record) => (
    <div key={record.id}>
      <p>Title: {record.title}</p>
      <p>Body: {record.body}</p>
      {/* Add other fields as needed */}
    </div>
  ));

  return (
    <div>
      <h2>First 5 Bids</h2>
      {firstBids}
      <h2>Initial Records</h2>
      {initialRecordsList}
    </div>
  );
}

export default WebNotes;

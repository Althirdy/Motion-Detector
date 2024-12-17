import React, { useEffect, useState } from "react";
import { database } from "./firebase";
import { ref, onValue } from "firebase/database";
import Stack from "@mui/material/Stack";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import toast from "react-hot-toast";

function App() {
  const [sensorValue, setSensorValue] = useState(null);
  useEffect(() => {
    const sensorRef = ref(database, "Sensor/ldr_data");

    const unsubscribe = onValue(sensorRef, (snapshot) => {
      const value = snapshot.val();
      setSensorValue(value);
    });

    return () => unsubscribe();
  }, []);
  
// Customize the toast inside useEffect
useEffect(() => {
  if (sensorValue > 1000) {
    toast.custom(
      (t) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px",
            background: "red",
            color: "#FFFFFF", // Text in black for contrast
            borderRadius: "8px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            fontWeight: "bold",
          }}
        >
          <strong>⚠️ WARNING!</strong>
          <span style={{ marginLeft: "8px" }}>Gas leak detected!</span>
        </div>
      )
    );
  }
}, [sensorValue]);
  return (
    <div className="max-w-screen-lg mx-auto flex items-center min-h-screen justify-center">
      <div>
        <h1 className="text-4xl font-bold text-gray-900">
          Gas Leak Detector Simple IoT
        </h1>
        <p
          className={`text-center text-2xl font-medium ${
            sensorValue > 1000 ? "text-red-600" : " text-gray-800"
          }`}
        >
          {sensorValue !== null ? `Gas level: ${sensorValue}` : "Loading..."}
        </p>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 1, md: 3 }}
        >
          <Gauge
            width={200}
            height={200}
            value={sensorValue}
            valueMin={0}
            valueMax={1000}
            sx={(theme) => ({
              [`& .${gaugeClasses.valueText}`]: {
                fontSize: 15,
              },
              [`& .${gaugeClasses.valueText} text`]: {
                fill: "#000000", // <-- change text color
              },
            })}
          />
        </Stack>
      </div>
    </div>
  );
}

export default App;

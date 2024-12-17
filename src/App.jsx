import React, { useEffect, useState } from "react";
import { database } from "./firebase";
import { ref, onValue } from "firebase/database";
import Stack from "@mui/material/Stack";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import toast from "react-hot-toast";

function App() {
  const [motion, setMotion] = useState(null);
  const [motionCount,setMotionCount] = useState(0)

  useEffect(() => {
    const sensorRef = ref(database, "Sensor/data");

    const unsubscribe = onValue(sensorRef, (snapshot) => {
      const value = snapshot.val();
      setMotion(value);
    });

    
    return () => unsubscribe();
  
  }, []);

  // Customize the toast inside useEffect
  useEffect(() => {
    if (motion == 1) {
      toast.custom((t) => (
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
          <strong>⚠️</strong>
          <span style={{ marginLeft: "8px" }}>Motion Detected</span>
        </div>
      ));
      setMotionCount(prev => prev + 1 );
    }
  }, [motion]);
  return (
    <div className="max-w-screen-lg mx-auto flex items-center min-h-screen justify-center">
      <div className="flex flex-col items-center p-4">
        <h1 className="text-4xl font-bold text-gray-900 text-center">
          Motion Detector
        </h1>
        <p>Motion Count: {motionCount}</p>
      </div>
    </div>
  );
}

export default App;

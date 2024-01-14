import React, { useState, useEffect } from "react";

export default function Predictions() {
    const [predictions, setPredictions] = useState({ status: "loading" });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://127.0.0.1:5000/process_and_save");
                const data = await response.json();
                setPredictions(data);
            } catch (error) {
                console.error("Error fetching predictions:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container">
            <h1>Predictions</h1>
            {predictions.status === "loading" && <p>Loading predictions...</p>}
            {predictions.status === "success" && (
                <div>
                    <div>
                        <p>Drink Item: {predictions.output_drink}</p>
                        <p>Food Item: {predictions.output_food}</p>
                    </div>
                </div>
            )}
            {predictions.status === "error" && (
                <p>Error fetching predictions: {predictions.message}</p>
            )}
        </div>
    );
}

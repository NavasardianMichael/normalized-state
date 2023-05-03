import React from "react";
import { Chart } from "react-google-charts";


export function ProfilerChart({ chartData }) {
    
    return (
        <div className="chart-wrapper">
            <Chart chartType="ColumnChart" width="100%" height="80vh" data={chartData} />
        </div>
    );
}

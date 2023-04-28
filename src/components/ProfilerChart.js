import React, { Profiler, useEffect, useState } from "react";
import { Chart } from "react-google-charts";

const colors = {
    long: 'red',
    normal: 'orange',
    short: 'green'
}

const detectColorByValue = (duration) => {
    if(duration > 1) return colors.long
    if(duration > .5) return colors.normal
    console.log({duration});
    return colors.short
}

export function ProfilerChart({ list }) {
    
    const [data, setData] = useState([
        ["Element", "Density", { role: "style" }],
    ])

    function onRender(id, phase, actualDuration, baseDuration, startTime, commitTime) {
        console.log({
          id, phase, actualDuration, baseDuration, startTime, commitTime
        });
        if(!list.length) return;
        if(phase === 'nested-update' || phase === 'mount') return;
        setData(prev => ([
            ...prev,
            [
                "",
                baseDuration, 
                detectColorByValue(baseDuration)
            ]
        ]))
    }
    
    return (
        <Profiler id="profiler-chart" onRender={onRender}>
            <Chart chartType="ColumnChart" width="100%" height="auto" data={data} />
        </Profiler>
    );
}

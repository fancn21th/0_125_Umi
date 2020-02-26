import React from 'react';
import {
  // G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  // Coord,
  // Label,
  // Legend,
  // View,
  // Guide,
  // Shape,
  // Facet,
  // Util,
} from 'bizcharts';

const BarChart = ({ data }) => {
  // const { data } = props;
  const cols = {
    Time: { alias: '日期' },
    Cp: { alias: '空闲率' },
  };
  return (
    <div>
      <Chart height={400} data={data} scale={cols} forceFit>
        <Axis name="Time" />
        <Axis name="Cp" />
        <Tooltip
          crosshairs={{
            type: 'y',
          }}
        />
        <Geom type="interval" position="Time*Cp" />
      </Chart>
    </div>
  );
};

export default BarChart;

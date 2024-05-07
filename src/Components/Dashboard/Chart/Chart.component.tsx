// import React, { PureComponent, ReactNode } from 'react';
// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from 'recharts';

// interface ChartData {
//   name: string;
//   revenue: number;
//   occupancy: number;
  
// }

// const data: ChartData[] = [
//   { name: 'January', revenue: 400, occupancy: 240 },
//   { name: 'February', revenue: 300, occupancy: 139 },
//   { name: 'March', revenue: 200, occupancy: 980 },

// ];

// interface ExampleProps {}

// class Example extends PureComponent<ExampleProps> {
//   static demoUrl = 'https://codesandbox.io/s/stacked-area-chart-ix341';

//   renderTooltip = (props: any): ReactNode => {
//     const { active, payload } = props;

//     if (active && payload && payload.length) {
//       return (
//         <div style={{ background: 'white', border: '1px solid #f5f5f5', padding: '10px' }}>
//           <p>{`Name: ${payload[0].payload.name}`}</p>
//           <p>{`UV: ${payload[0].payload.revenue}`}</p>
//           <p>{`PV: ${payload[0].payload.occupancy}`}</p>
         
//         </div>
//       );
//     }

//     return null;
//   };

//   render() {
//     return (
//       <ResponsiveContainer width="100%" height="100%">
//         <AreaChart
//           width={500}
//           height={400}
//           data={data}
//           margin={{
//             top: 10,
//             right: 30,
//             left: 0,
//             bottom: 0,
//           }}
//         >
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="name" />
//           <YAxis />
//           <Tooltip content={this.renderTooltip} />
//           <Area type="monotone" dataKey="uv" stackId="1" stroke="#8884d8" fill="#0088FE" opacity={0.6} />
//           <Area type="monotone" dataKey="pv" stackId="1" stroke="#82ca9d" fill="#00C49F" opacity={0.6}/>
        
//         </AreaChart>
//       </ResponsiveContainer>
//     );
//   }
// }

// export default Example;


import React, { PureComponent, ReactNode, useEffect, useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface ChartData {
  name: string;
  revenue: number;
  occupancy: number;
}

interface ExampleProps {
  data: ChartData[];
}

const Example: React.FC<ExampleProps> = ({ data }) => {
  const [chartData, setChartData] = useState<ChartData[]>([]);

  // Assuming you want to re-render the chart if the data prop changes
  useEffect(() => {
    setChartData(data);
  }, [data]);

  const renderTooltip = (props: any): ReactNode => {
    const { active, payload } = props;

    if (active && payload && payload.length) {
      return (
        <div style={{ background: 'white', border: '1px solid #f5f5f5', padding: '10px' }}>
          <p>{`Name: ${payload[0].payload.name}`}</p>
          <p>{`Revenue: ${payload[0].payload.revenue}`}</p>
          <p>{`Occupancy: ${payload[0].payload.occupancy}%`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <ResponsiveContainer width="105%" height="70%" minHeight="200px" minWidth="250px" >
    <AreaChart
      width={500}
      height={400}
      data={chartData}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis yAxisId="revenue" />
      <YAxis yAxisId="occupancy" orientation="right" domain={[0, 100]} />
      <Tooltip content={renderTooltip} />
      <Area
        type="monotone"
        dataKey="revenue"
        stackId="1"
        stroke="#8884d8"
        fill="#0088FE"
        opacity={0.8}
        yAxisId="revenue"
      />
      <Area
        type="monotone"
        dataKey="occupancy"
        stackId="1"
        stroke="#82ca9d"
        fill="#00C49F"
        opacity={0.8}
        yAxisId="occupancy"
      />
    </AreaChart>
    
  </ResponsiveContainer>
  );
};

export default Example;

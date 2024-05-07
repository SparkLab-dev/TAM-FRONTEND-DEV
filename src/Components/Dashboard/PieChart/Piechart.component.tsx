// File: Example.tsx

import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Label, Tooltip } from 'recharts';

interface ExampleProps {
    data: { name: string; value: string | number }[];
  }
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  export default class Example extends PureComponent<ExampleProps> {
    static demoUrl = 'https://codesandbox.io/s/pie-chart-with-padding-angle-7ux0o';

    
    renderTooltip = (props: any) => {
      const { active, payload } = props;
  
      if (active && payload && payload.length) {
        return (
          <div style={{ background: 'white', border: '1px solid #f5f5f5', padding: '10px' }}>
            <p>{`${payload[0].payload.name}: ${payload[0].payload.value}%`}</p>
          </div>
        );
      }
  
      return null;
    };
  
    render() {
      const { data } = this.props;
  
      return (
        <ResponsiveContainer width="100%" height="80%" minHeight="200px">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
          
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              
              ))}
                <Label value="Nights/Portal" position="center" />
            </Pie>
            <Tooltip content={this.renderTooltip} />
          </PieChart>
        </ResponsiveContainer>
      );
    }
  }
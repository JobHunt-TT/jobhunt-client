import { Pie } from "react-chartjs-2";
import { ChartData } from "chart.js/auto";
import "chart.js/auto";
import { ItemChart } from "../../types";
import { useEffect } from "react";

interface ChartPieProps {
  dataChart: ItemChart[];
}

interface DataChart {
  labels: string[];
  datasets: Datasets[];
}

interface Datasets {
  label: string;
  data: number[];
  backgroundColor: string[];
  borderColor: string[];
  borderWidth: number;
}

export const ChartPie = ({ dataChart }: ChartPieProps) => {
  const data: DataChart = {
    labels: [],
    datasets: [
      {
        label: "# of Votes",
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Gráfica de Pastel",
      },
    },
  };

  useEffect(() => {
    console.log(dataChart);
    
    for (let index = 0; index < dataChart.length; index++) {
      const { label, value, color } = dataChart[index];
      data.labels.push(label);
      data.datasets[0].data.push(value);
      data.datasets[0].backgroundColor.push(color);
      data.datasets[0].borderColor.push(color);
    }
  }, []);

  return <Pie data={data} options={options} />;
};

"use client";
import React, { useState, useRef } from "react";
import BarChartComponent from "./barChart";
import LineChartComponent from "./lineChart";
import PieChartComponent from "./pieChart";
import DoughnutChartComponent from "./doughnutChart";
import Table from "./table";
import html2canvas from "html2canvas";

interface ISingleCoachDiscoveryProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  report_data: any[]; 
  report_type: string;
  report_name: string;
}

const formatReportName = (name: string): string => {
  if (!name) return '';
  
  // Replace underscores with spaces and capitalize each word
  return name
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

const Reports: React.FC<ISingleCoachDiscoveryProps> = ({
  report_data,
  report_type,
  report_name,
}) => {
  const [selectedView, setSelectedView] = useState<"table" | "chart">("table");
  const chartRef = useRef<HTMLDivElement>(null);
  const formattedReportName = formatReportName(report_name);

  if (report_data.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4 text-left">{formattedReportName}</h1>
        <p className="font-bold text-black-800 text-xl flex flex-col items-center mt-8">No data found.</p>
      </div>
    );
  }

  const xKey = report_data.length > 0 ? Object.keys(report_data[0])[0] : "x";
  const yKey = report_data.length > 0 ? Object.keys(report_data[0])[1] : "y";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hasNullValues = (data: any[], xKey: string, yKey: string): boolean => {
    return data.some((row) => row[xKey] === null || row[yKey] === null);
  };

  const isDataUnavailableForCharts = hasNullValues(report_data, xKey, yKey);

  const exportTableToCSV = () => {
    const escapeCSV = (value: string | number | null): string => {
      if (value === null) return "";
  
      let stringValue = value.toString().replace(/"/g, '""').replace(/[\r\n]+/g, " ");
      if (/^[-=]/.test(stringValue)) {
        stringValue = `'${stringValue}`;
      }
  
      return `"${stringValue}"`;
    };
  
    const headers = Object.keys(report_data[0]).map(escapeCSV).join(",");
    const rows = report_data.map((row) =>
      Object.values(row).map((value) => escapeCSV(value as string | number | null)).join(",")
    );
  
    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${formattedReportName}.csv`);
    document.body.appendChild(link);
    link.click();
  };

  const exportChartAsImage = async () => {
    if (chartRef.current) {
      const canvas = await html2canvas(chartRef.current);
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `${formattedReportName}.png`;
      document.body.appendChild(link);
      link.click();
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4 text-left">{formattedReportName}</h1>
      <div className="p-6">
        {/* Buttons to Toggle View */}
        <div className="flex space-x-4 mb-4">
          <button
            onClick={() => setSelectedView("table")}
            className={`px-4 py-2 rounded ${
              selectedView === "table" ? "bg-gray-700 text-white" : "bg-gray-400 text-black"
            }`}
          >
            Table
          </button>
          {report_type !== "table chart" && (
            <button
              onClick={() => setSelectedView("chart")}
              className={`px-4 py-2 rounded ${
                selectedView === "chart" ? "bg-gray-700 text-white" : "bg-gray-400 text-black"
              }`}
            >
              Chart
            </button>
          )}
        </div>

        {/* Table View */}
        {selectedView === "table" && (
          <div className="mt-6 p-4 bg-white rounded-lg shadow-md w-full text-left">
            <button
              onClick={exportTableToCSV}
              className="mt-4 px-4 py-2 mb-5 bg-blue-500 text-white rounded"
            >
              Export Table as CSV
            </button>
            <Table list={report_data} />
          </div>
        )}

        {/* Chart View */}
        {selectedView === "chart" && (
          <>
            <div className="flex space-x-4 mb-4">
              {report_type === "bar chart" && (
                <button className="px-4 py-2 bg-blue-500 text-white rounded">Bar Chart</button>
              )}
              {report_type === "line chart" && (
                <button className="px-4 py-2 bg-green-500 text-white rounded">Line Chart</button>
              )}
              {report_type === "pie chart" && (
                <button className="px-4 py-2 bg-yellow-500 text-white rounded">Pie Chart</button>
              )}
              {report_type === "doughnut chart" && (
                <button className="px-4 py-2 bg-purple-500 text-white rounded">Doughnut Chart</button>
              )}
            </div>
            <button
              onClick={exportChartAsImage}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
            >
              Export Chart as Image
            </button>
            {/* Chart Display */}
            <div
              ref={chartRef}
              className="w-[800px] max-w-6xl mt-6 h-[400px] border p-4 rounded-lg bg-white shadow-md text-left"
            >
              {isDataUnavailableForCharts ? (
                <p className="font-bold text-red-500 text-xl flex flex-col items-center mt-8">
                  Data not available in charts.
                </p>
              ) : (
                <>
                  {report_type === "bar chart" && (
                    <BarChartComponent list={report_data} xKey={xKey} yKey={yKey} />
                  )}
                  {report_type === "line chart" && (
                    <LineChartComponent list={report_data} xKey={xKey} yKey={yKey} />
                  )}
                  {report_type === "pie chart" && (
                    <PieChartComponent list={report_data} xKey={xKey} yKey={yKey} />
                  )}
                  {report_type === "doughnut chart" && (
                    <DoughnutChartComponent list={report_data} xKey={xKey} yKey={yKey} />
                  )}
                </>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Reports;
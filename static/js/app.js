// Function to read samples.json using D3
function readSamplesJSON() {
    const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
    d3.json(url)
      .then(function (data) {
        const testSubjectIds = data.names;
        const dropdown = d3.select("#selDataset");
        testSubjectIds.forEach(subjectId => {
          dropdown.append("option").text(subjectId).property("value", subjectId);
        });
        optionChanged(testSubjectIds[0], data);
        dropdown.on("change", function () {
          const selectedSubjectId = dropdown.property("value");
          optionChanged(selectedSubjectId, data);
        });
      })
      .catch(function (error) {
        console.log("Error loading data:", error);
      });
  }
  
  // Call the function to read samples.json
  readSamplesJSON();
  
  // Function to create the horizontal bar chart
  function createBarChart(selectedSubjectId, data) {
    const selectedData = data.samples.find(sample => sample.id === selectedSubjectId);
    const top10SampleValues = selectedData.sample_values.slice(0, 10).reverse();
    const top10OtuIds = selectedData.otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse();
    const top10OtuLabels = selectedData.otu_labels.slice(0, 10).reverse();
    const trace = {
      x: top10SampleValues,
      y: top10OtuIds,
      text: top10OtuLabels,
      type: "bar",
      orientation: "h"
    };
    const layout = {
      title: `Top 10 OTUs Found in Test Subject ${selectedSubjectId}`,
      xaxis: { title: "Sample Values" },
      yaxis: { title: "OTU IDs" }
    };
    Plotly.newPlot("bar", [trace], layout);
  }
  
  // Function to create the bubble chart
  function createBubbleChart(selectedSubjectId, data) {
    const selectedData = data.samples.find(sample => sample.id === selectedSubjectId);
    const trace = {
      x: selectedData.otu_ids,
      y: selectedData.sample_values,
      text: selectedData.otu_labels,
      mode: "markers",
      marker: {
        size: selectedData.sample_values,
        color: selectedData.otu_ids,
        colorscale: "Earth"
      }
    };
    const layout = {
      title: `Sample Values for Test Subject ${selectedSubjectId}`,
      xaxis: { title: "OTU IDs" },
      yaxis: { title: "Sample Values" }
    };
    Plotly.newPlot("bubble", [trace], layout);
  }
  
  // Function to create the gauge chart
  function createGaugeChart(washingFrequency) {
    const data = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: washingFrequency,
        title: { text: "Weekly Washing Frequency" },
        type: "indicator",
        mode: "gauge+number",
        gauge: {
          axis: { range: [null, 9] },
          bar: { color: "#000" },
          steps: [
            { range: [0, 1], color: "#f7f7f7" },
            { range: [1, 2], color: "#f0f0f0" },
            { range: [2, 3], color: "#e8e8e8" },
            { range: [3, 4], color: "#e0e0e0" },
            { range: [4, 5], color: "#d8d8d8" },
            { range: [5, 6], color: "#d0d0d0" },
            { range: [6, 7], color: "#c8c8c8" },
            { range: [7, 8], color: "#c0c0c0" },
            { range: [8, 9], color: "#b8b8b8" },
            // Add more range-color pairs here
            { range: [9, 10], color: "#b0b0b0" },
            { range: [10, 11], color: "#a8a8a8" },
            // Add more range-color pairs as needed
          ]
        }
      }
    ];
    const layout = {
      width: 400,
      height: 300,
      margin: { t: 0, b: 0 }
    };
    Plotly.newPlot("gauge", data, layout);
  }
  
  
  // Function to display the sample metadata
  function displayMetadata(selectedSubjectId, data) {
    const selectedMetadata = data.metadata.find(metadata => metadata.id === parseInt(selectedSubjectId));
    const metadataDiv = d3.select("#sample-metadata");
    metadataDiv.html("");
    Object.entries(selectedMetadata).forEach(([key, value]) => {
      metadataDiv.append("p").text(`${key}: ${value}`);
    });
    const washingFrequency = selectedMetadata.wfreq || 0;
    createGaugeChart(washingFrequency);
  }
  
  // Function to handle changes in the dropdown menu
  function optionChanged(selectedSubjectId, data) {
    createBarChart(selectedSubjectId, data);
    createBubbleChart(selectedSubjectId, data);
    displayMetadata(selectedSubjectId, data);
    
  }
  
// Function to read samples.json using D3
function readSamplesJSON() {
    const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
  
    // Fetch data using D3's json() method
    d3.json(url)
      .then(function (data) {
        // Process the data here, or call other functions to work with the data
        console.log(data); // For demonstration, printing the data to the console
  
        // Assuming you have the Test Subject IDs available in the data
        const testSubjectIds = data.names;
  
        // Create the dropdown options with Test Subject IDs
        const dropdown = d3.select("#selDataset");
        testSubjectIds.forEach(subjectId => {
          dropdown.append("option").text(subjectId).property("value", subjectId);
        });
  
        // Initially, load the data for the first Test Subject ID and create the visualizations
        optionChanged(testSubjectIds[0], data);
  
        // Set up the event listener for the dropdown menu
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
    // Get the data for the selected subject ID
    const selectedData = data.samples.find(sample => sample.id === selectedSubjectId);
  
    // Get the top 10 OTUs
    const top10SampleValues = selectedData.sample_values.slice(0, 10).reverse();
    const top10OtuIds = selectedData.otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse();
    const top10OtuLabels = selectedData.otu_labels.slice(0, 10).reverse();
  
    // Create the trace for the bar chart
    const trace = {
      x: top10SampleValues,
      y: top10OtuIds,
      text: top10OtuLabels,
      type: "bar",
      orientation: "h"
    };
  
    // Layout for the bar chart
    const layout = {
      title: `Top 10 OTUs Found in Test Subject ${selectedSubjectId}`,
      xaxis: { title: "Sample Values" },
      yaxis: { title: "OTU IDs" }
    };
  
    // Plot the chart using Plotly
    Plotly.newPlot("bar", [trace], layout);
  }
  
  // Function to create the bubble chart
  function createBubbleChart(selectedSubjectId, data) {
    // Get the data for the selected subject ID
    const selectedData = data.samples.find(sample => sample.id === selectedSubjectId);
  
    // Create the trace for the bubble chart
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
  
    // Layout for the bubble chart
    const layout = {
      title: `Sample Values for Test Subject ${selectedSubjectId}`,
      xaxis: { title: "OTU IDs" },
      yaxis: { title: "Sample Values" }
    };
  
    // Plot the chart using Plotly
    Plotly.newPlot("bubble", [trace], layout);
  }
  
  // Function to handle changes in the dropdown menu
  function optionChanged(selectedSubjectId, data) {
    // Call the function to create the bar chart with the selected subject ID
    createBarChart(selectedSubjectId, data);
  
    // Call the function to create the bubble chart with the selected subject ID
    createBubbleChart(selectedSubjectId, data);
  
    // You can also implement functions to update other visualizations or metadata info here
    // createGaugeChart(selectedSubjectId, data);
    // updateDemographicInfo(selectedSubjectId, data);
  }
  
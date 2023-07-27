// Function to read samples.json using D3
function readSamplesJSON() {
  const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
  d3.json(url)
    .then(function (data) {
      init(data);
    })
    .catch(function (error) {
      console.log("Error loading data:", error);
    });
}

// Function to initialize the dashboard
function init(data) {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  var sampleNames = data.names;
  sampleNames.forEach((sample) => {
    selector.append("option").text(sample).property("value", sample);
  });

  // Use the first sample from the list to build the initial plots
  var firstSample = sampleNames[0];
  buildCharts(data, firstSample);
  buildMetadata(data, firstSample);

  // Add event listener for the dropdown menu
  selector.on("change", function () {
    var newSample = selector.property("value");
    buildCharts(data, newSample);
    buildMetadata(data, newSample);
  });
}

// Call the function to read samples.json
readSamplesJSON();

// Function to handle changes in the dropdown menu
function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  d3.json("samples.json").then((data) => {
    buildCharts(data, newSample);
    buildMetadata(data, newSample);
  });
}

// Function to build the metadata panel
function buildMetadata(data, sample) {
  var metadata = data.metadata;
  // Filter the data for the object with the desired sample number
  var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
  var result = resultArray[0];
  // Use d3 to select the panel with id of `#sample-metadata`
  var PANEL = d3.select("#sample-metadata");

  // Use `.html("") to clear any existing metadata
  PANEL.html("");

  // Use `Object.entries` to add each key and value pair to the panel
  
  Object.entries(result).forEach(([key, value]) => {
    PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
  });
}

// Function to build the charts
function buildCharts(data, sample) {
  var samplesArray = data.samples;
  // Create a variable that filters the samples for the object with the desired sample number.
  var selectedId = samplesArray.filter(data => data.id == sample);
  var firstSample = selectedId[0];
  var otuIds = firstSample.otu_ids;
  var otuLabels = firstSample.otu_labels;
  var sampleValues = firstSample.sample_values;

  // Create the yticks for the bar chart.
  var yticks = otuIds.slice(0, 10).map(id => "OTU " + id).reverse();

  // Create the trace for the bar chart.
  var barData = [{
    x: sampleValues.slice(0, 10).reverse(),
    text: otuLabels.slice(0, 10).reverse(),
    type: "bar",
    orientation: "h"
  }];

  // Create the layout for the bar chart.
  var barLayout = {
    title: "Top 10 Bacteria Strains",
    yaxis: {
      tickmode: "array",
      tickvals: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      ticktext: yticks
    },
    annotations: [{
      xref: 'paper',
      yref: 'paper',
      x: 0.5,
      xanchor: 'center',
      y: -0.25,
      yanchor: 'center',
      text: 'This chart shows the Top 10 most prominent strains of bacteria found in this sample',
      showarrow: false
    }]
  };

  // Use Plotly to plot the data with the layout.
  Plotly.newPlot("bar", barData, barLayout, { responsive: true });

  // Create Trace for bubble chart
  var bubbleData = [{
    x: otuIds,
    y: sampleValues,
    text: otuLabels,
    mode: 'markers',
    marker: {
      size: sampleValues,
      color: otuIds,
      colorscale: "plasma"
    }
  }];

  // Create the layout for the bubble chart.
  var bubbleLayout = {
    title: "Bacteria Cultures per Sample",
    showlegend: false,
    xaxis: { title: "OTU ID", automargin: true },
    yaxis: { automargin: true },
    hovermode: "closest"
  };

  // Use Plotly to plot the data with the layout.
  Plotly.newPlot("bubble", bubbleData, bubbleLayout, { responsive: true });

  // Create a variable that filters metadata for chosen sample
  var metadata_SelId = data.metadata.filter(data => data.id == sample);
  var washFreq = +metadata_SelId[0].wfreq;

  // Create the trace for the gauge chart.
  var gaugeData = [{
    domain: { x: [0, 1], y: [0, 1] },
    value: washFreq,
    title: { text: "<b>Belly Button Washing Frequency</b><br>Scrubs per week" },
    type: "indicator",
    mode: "gauge+number",
    gauge: {
      axis: {
        range: [null, 10],
        tickmode: "array",
        tickvals: [0, 2, 4, 6, 8, 10],
        ticktext: [0, 2, 4, 6, 8, 10]
      },
      bar: { color: "black" },
      steps: [
        { range: [0, 2], color: "red" },
        { range: [2, 4], color: "orange" },
        { range: [4, 6], color: "yellow" },
        { range: [6, 8], color: "lime" },
        { range: [8, 10], color: "green" }]
    }
  }];

  // Create the layout for the gauge chart.
  var gaugeLayout = {
    autosize: true,
    annotations: [{
      xref: 'paper',
      yref: 'paper',
      x: 0.5,
      xanchor: 'center',
      y: 0,
      yanchor: 'center',
      text: "This gauge shows the washing frequency of the selected sample.",
      showarrow: false
    }]
  };

  // Use Plotly to plot the gauge data and layout.
  Plotly.newPlot("gauge", gaugeData, gaugeLayout, { responsive: true });
}

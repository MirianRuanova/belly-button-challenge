# belly-button-challenge

**Belly Button Biodiversity Dashboard**

The Belly Button Biodiversity Dashboard is an interactive web application that allows users to explore and visualize the biodiversity of belly button microbes for different test subjects. The data used in the dashboard is provided in a JSON format and reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

**Features:**

1. Dropdown Select: The dashboard provides a dropdown menu that allows users to select a test subject ID number. When a new test subject is selected, the dashboard updates all the plots and demographic information accordingly.

2. Bar Chart: The bar chart displays the top 10 bacteria strains found in the selected test subject's belly button. The bars are sorted in descending order, with the most prominent strains shown first.

3. Bubble Chart: The bubble chart displays all the bacteria strains found in the selected test subject's belly button. The size of each bubble represents the quantity of the respective bacteria, and the color represents the OTU ID of the bacteria.

4. Gauge Chart: The gauge chart displays the washing frequency of the selected test subject's belly button. The gauge chart helps users understand how frequently the test subject washes their belly button, measured in scrubs per week.

5. Demographic Info: The dashboard displays demographic information about the selected test subject, including their age, gender, ethnicity, and belly button type. The information is dynamically updated when a new test subject is selected.

**Technologies Used:**

The Belly Button Biodiversity Dashboard is built using HTML, CSS (via Bootstrap), and JavaScript. The JavaScript libraries D3.js and Plotly.js are used for data manipulation and visualization. The JSON data containing the microbial samples is fetched using D3.json and processed to update the charts and demographic information.

**How to Use:**

To use the Belly Button Biodiversity Dashboard, simply open the HTML file in a web browser. Upon loading, the dashboard will display the bar chart, bubble chart, and gauge chart for the first test subject. Use the dropdown menu labeled "Test Subject ID No." to select a different test subject. The dashboard will update all the visualizations and demographic information based on the selected test subject.


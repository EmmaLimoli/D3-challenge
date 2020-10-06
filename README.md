# D3-challenge
Use D3 to create a scatterplot

![filter search](https://github.com/EmmaLimoli/D3-challenge/blob/master/d3_data_journalism/completed_images/Screen%20Shot%202020-10-05%20at%2010.37.30%20AM.png)


<h2>The Goal:</h2> 
The goal for this project was to use D3 to create a scatterplot using healthcare and poverty data of the 50 states in the United States.

I analyzed age, poverty, income, healthcare, obesity, and smoking in each of the 50 states. When the mouse hovers over each plot point, the state name is pulled up as well as the abbreviation printed on each circle. You can also find an in-depth analysis of the relationship that was found between poverty and healthcare.

![filter search](https://github.com/EmmaLimoli/D3-challenge/blob/master/d3_data_journalism/completed_images/Screen%20Shot%202020-10-05%20at%2010.37.44%20AM.png)

<h2>How This Was Achieved:</h2> 
This was achieved by creating a SVG using D3. I chose poverty and healthcare as the X and Y axes because it was the most comparable for the scatterplot. Initially, to test the scatterplot, I started off comparing the percentage of smokers and average percent of obesity in each state. However, I felt that providing all six data points would help tell the story of the correlation between poverty and healthcare in the US.

I created separate functions for the X and Y scales, and the X and Y axes. I also created functions for the circles and the text to be able to plot the circles and ensure the state abbreviations show up when the user hovers over the scatterplot points. In both the functions for circles and text, I call on the parameters I set for healthcare and poverty. 

I also created a function for the D3 Tool Tip. In this function, I called on the parameters I created as well as the circles and text groups. In this function, I used a conditional to set the parameters to the X axis and the Y axis. I also used D3 Tool Tip to create the ability to hover over the scatterplots and show the state abbreviations. I called on the Tool Tip to use a mouseover and mouseout to create the hover ability for users.

![filter search](https://github.com/EmmaLimoli/D3-challenge/blob/master/d3_data_journalism/completed_images/Screen%20Shot%202020-10-05%20at%2010.38.25%20AM.png)

After, I imported the data using d3.csv and a then function. I used a throw error conditional to ensure that if the code is wrong, then the page wouldn't load correctly. I know that I could create a 404 Error page, but I didn't have enough time to do so.

![filter search](https://github.com/EmmaLimoli/D3-challenge/blob/master/d3_data_journalism/completed_images/Screen%20Shot%202020-10-05%20at%2010.41.11%20AM.png)

In the conditional, I used a forEach to go through the data for the six factors to include in the scatterplot.

I also created the linear scales and the left and bottom axis to call on later to create the plot. Once the axes were created, I appended the axes and the circles and text group. I included the hover option for the states because it creates a bit more clarification in addition to state abbreviations printed out in each circle.  

Now, it was time to create the label groups for X and Y groups. In X group, is the poverty, age, and income. In Y group, there's obesity, healthcare, and smoking. In both of these groups, I created the measurements to make sure the labels were set correctly. I also created the classes to make them active when clicked on. With text, I created the labels that the user will see when they click on it.

Lastly, for both of these groups, I created the event to change the scatterplot labels when clicked on. I used a conditional and implemented the classes to make them active or inactive for each label. 

![filter search](https://github.com/EmmaLimoli/D3-challenge/blob/master/d3_data_journalism/completed_images/Screen%20Shot%202020-10-05%20at%2010.37.44%20AM.png)

<h2>What I Learned:</h2> 
One area I had difficulties with were the classes. The incorrect labels were highlighted when clicked on after clicking around a few times. I tried to change the active and inactive classes, but I was unable to get the right information after clicking around the labels. Also, while coding, I found multiple elements that needed to be duplicated, which could get confusing since you had to do the same thing to the X and Y axes. Overall, I'm proud of the scatterplot since I achieved the initial project and went above and beyond to implement the animations when clicked between the labels. 

<strong>Tools Used: HTML, CSS, D3, and JavaScript </strong>

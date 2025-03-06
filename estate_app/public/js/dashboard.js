console.log("script added");



const data = {
    labels: ["12am-3am", "3am-6pm", "6am-9am", "9am-12am",
        "12pm-3pm", "3pm-6pm", "6pm-9pm", "9am-12am"    ],    datasets: [
        {            name: "Some Data", type: "line",
            values: [25, 40, 30, 35, 8, 52, 17, -4]
        },        {            name: "Another Set", type: "line",
            values: [25, 50, -10, 15, 18, 32, 27, 14]
        }    ]
}

console.log("chart added");
const chart = new frappe.Chart("#chart1", {  // or a DOM element,// new Chart() in case of ES6 module with above usagetitle: "My Awesome Chart",
    data: data,
    type: 'line', // or 'bar', 'line', 'scatter', 'pie', 'percentage'height: 250,
    colors: ['#7cd6fd', '#743ee2']
})



const data3 = {
    labels: ["12am-3am", "3am-6pm", "6am-9am", "9am-12am",
        "12pm-3pm", "3pm-6pm", "6pm-9pm", "9am-12am"    ],    datasets: [
        {            name: "Some Data", type: "line",
            values: [25, 40, 30, 35, 8, 52, 17, -4]
        },        {            name: "Another Set", type: "line",
            values: [25, 50, -10, 15, 18, 32, 27, 14]
        }    ]
}

console.log("chart added");
const chart3 = new frappe.Chart("#chart3", {  // or a DOM element,// new Chart() in case of ES6 module with above usagetitle: "My Awesome Chart",
    data: data,
    height: 450,
    type: 'pie', // or 'bar', 'line', 'scatter', 'pie', 'percentage'height: 250,
    colors: ['#7cd6fd', '#743ee2']
})








// Fetching data from the and creating the chart 2 bar chart on DOM load

document.addEventListener("DOMContentLoaded",async function() {
    try {
        console.log("Fetching workflow state...");

        let response = await fetch('/api/method/estate_app.api.get_workflow_state', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-Frappe-CSRF-Token': csrfToken,
                'Authorization': 'token 74d98a9ac4c69e6:5c6d7ab3936c1f0' // Replace with actual token
            },
        });

        let data = await response.json(); // Wait for JSON conversion

        if (data.message) {
            console.log(data);
            var newdata = data.message; // Store response in a variable
        } else {
            console.log(data);
            alert("Error: " + JSON.stringify(data));
        }
        render_chart2(newdata)

    } catch (error) {
        console.error("Error:", error);
    }
});


// Fetching data from the and creating the chart 2 bar chart on Button click


document.getElementById("Generate").addEventListener("click", async function () {
    try {
        console.log("Fetching workflow state...");

        let response = await fetch('/api/method/estate_app.api.get_workflow_state', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-Frappe-CSRF-Token': csrfToken,
                'Authorization': 'token 74d98a9ac4c69e6:5c6d7ab3936c1f0' // Replace with actual token
            },
        });

        let data = await response.json(); // Wait for JSON conversion

        if (data.message) {
            console.log(data);
            var newdata = data.message; // Store response in a variable
        } else {
            console.log(data);
            alert("Error: " + JSON.stringify(data));
        }
        render_chart2(newdata)

    } catch (error) {
        console.error("Error:", error);
    }
});







// Function to render the chart 1 bar chart

function render_chart2(){

};







// Function to render the chart 2 bar chart

function render_chart2(newdata){
        console.log(newdata);
        const data2 = {
            labels: [newdata[0].workflow_state, newdata[1].workflow_state, newdata[2].workflow_state, newdata[3].workflow_state,newdata[4].workflow_state],
            datasets: [
                {  name: "Indent Status", type: "bar",
                    values: [newdata[0].count, newdata[1].count, newdata[2].count, newdata[3].count,newdata[4].count]
                }   
            ],
            yMarkers: [
                {
                    label: "Threshold",
                    value: 2,
                    options: { labelPos: 'right' } // default: 'right'
                }
            ],
            yRegions: [
                {
                    label: "Optimum Value",
                    start: 0,
                    end: 5,
                    options: { labelPos: 'right' }
                }
            ],
        }

        console.log("chart added");
        const chart2 = new frappe.Chart("#chart2", {  // or a DOM element,// new Chart() in case of ES6 module with above usagetitle: "My Awesome Chart",
            data: data2,
            height:400,
            type: 'bar', // or 'bar', 'line', 'scatter', 'pie', 'percentage'height: 250,
            colors: ['#13571d'],
            barOptions: {
                spaceRatio: 0.7  // Adjust the value (0 to 1), lower means thicker bars
            },
            axisOptions: {
                xAxisMode: "tick",
                xIsSeries: true,
                dotSize: 8,
                yDivisions:6
            }
        })


};
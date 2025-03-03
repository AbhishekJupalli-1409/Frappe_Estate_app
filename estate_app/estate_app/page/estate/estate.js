frappe.pages['estate'].on_page_load = function (wrapper) {
	new MyPage(wrapper);
}


//PAGE CONTENT

MyPage = Class.extend({

	//INITIALIZE PAGE
	init: function (wrapper) {
		this.page = frappe.ui.make_app_page({
			parent: wrapper,
			title: 'Estate Home',
			single_column: true // this line si for sidebar collapsable
		});
		this.make();
	},

	//MAKE PAGE CONTENT
	make: function () {
		//Grab the class
		let me = $(this);  //jquery to grab entire class page
		// let body = `<h1>hello world!</h1>`

		//MOney formatter
		function currency(n){
			let money = new Intl.NumberFormat('en-IN',
				{style:'currency',currency:'INR'}).format(n);

			return money;
			
		}

		//GET Total by making a Ajax call
		let total = function(){
			frappe.call({
				method: "estate_app.estate_app.page.estate.estate.get_total_price", //dotted path to server method
				callback: function(r) {
				// code snippet
				console.log(r.message);
				money = currency(r.message);
				//Set the price value
				$("#total-price")[0].innerHTML = money;
				}
				});
				
		}





		// Line chart 
		let line_chart = function(){
			const data = {
				labels: ["12am-3am", "3am-6pm", "6am-9am", "9am-12am",
					"12pm-3pm", "3pm-6pm", "6pm-9pm", "9am-12am"
				],
				datasets: [
					{
						name: "Some Data", type: "bar",
						values: [25, 40, 30, 35, 8, 52, 17, -4]
					},
					{
						name: "Another Set", type: "line",
						values: [25, 50, -10, 15, 18, 32, 27, 14]
					}
				]
			}
			
			const chart = new frappe.Chart("#line_chart", {  // or a DOM element,
														// new Chart() in case of ES6 module with above usage
				title: "Line Chart",
				data: data,
				type: 'axis-mixed', // or 'bar', 'line', 'scatter', 'pie', 'percentage'
				height: 250,
				colors: ['#7cd6fd', '#743ee2']
			})
		};

		//Pie chart
		let pie_chart = function(){
			const data = {
				labels: ["12am-3am", "3am-6pm", "6am-9am", "9am-12am",
					"12pm-3pm", "3pm-6pm", "6pm-9pm", "9am-12am"
				],
				datasets: [
					{
						name: "Some Data", type: "bar",
						values: [25, 40, 30, 35, 8, 52, 17, -4]
					},
					{
						name: "Another Set", type: "line",
						values: [25, 50, -10, 15, 18, 32, 27, 14]
					}
				],
				yMarkers: [{ label: "Marker", value: 180000000,
					options: { labelPos: 'left' }}],
				yRegions: [{ label: "Region", start: 0,
					end: 300000000,
					options: { labelPos: 'right' }}]
				
			}
			
			const chart = new frappe.Chart("#pie_chart", {  // or a DOM element,
														// new Chart() in case of ES6 module with above usage
				title: "Pie Chart",
				data: data,
				type: 'pie', // or 'bar', 'line', 'scatter', 'pie', 'percentage'
				height: 450,
				colors: ['#7cd6fd', '#743ee2']
			})
		};



		//Get status by AJAX Call
		let statuses = [];
		let prices = [];
		let approved = 0;
		let new_state = [];
		let pending_approval = [];
		let pending_review = [];
		let rejected = [];


		let lease = [];
		let sale = [];
		let rent = [];



		// for the approved
		frappe.call({
			method: "estate_app.estate_app.page.estate.estate.get_work_state_Approved", //dotted path to server method
			callback: function(r) {
			// code snippet
			console.log(r.message);

			approved = r.message[0].count;

			// console.log(rent);
			
			console.log(approved);
			}
		});


		// for the new state

		frappe.call({
			method: "estate_app.estate_app.page.estate.estate.get_work_state_new", //dotted path to server method
			callback: function(r) {
			// code snippet
			// console.log(r.message);
			new_state = r.message[0].count;
			// console.log(sale);
			}
		});



		// for the pending approval

		frappe.call({
			method: "estate_app.estate_app.page.estate.estate.get_work_state_pending_approval", //dotted path to server method
			callback: function(r) {
			// code snippet
			// console.log(r.message);
			pending_approval = r.message[0].count;
			// console.log(lease);
			}
		});




		
		// for the pending approval

		frappe.call({
			method: "estate_app.estate_app.page.estate.estate.get_work_state_pending_approval", //dotted path to server method
			callback: function(r) {
			// code snippet
			// console.log(r.message);
			pending_approval = r.message[0].count;
			// console.log(lease);
			}
		});



		// for the pending review


		frappe.call({
			method: "estate_app.estate_app.page.estate.estate.get_work_state_pending_review", //dotted path to server method
			callback: function(r) {
			// code snippet
			// console.log(r.message);
			pending_review = r.message[0].count;
			// console.log(lease);
			}
		});



		// for the Rejected


		frappe.call({
			method: "estate_app.estate_app.page.estate.estate.get_work_state_rejected", //dotted path to server method
			callback: function(r) {
			// code snippet
			// console.log(r.message);
			rejected = r.message[0].count;
			// console.log(lease);
			}
		});

		let status = function(){
			frappe.call({
				method: "estate_app.estate_app.page.estate.estate.get_work_state", //dotted path to server method
				callback: function(r) {
				// code snippet
				// console.log(r.message);
				workflow = [];
			
				r.message.forEach((element) => {
					workflow.push(element.workflow_state);
					
				});
				// console.log(workflow);
				const data = {
					labels: workflow,
					datasets: [
						{
							name: "record", type: "bar",
							values: [approved,new_state,pending_approval,pending_review,rejected]
						}
					],
					
				}
	
				const chart = new frappe.Chart("#chart", {  // or a DOM element,
															// new Chart() in case of ES6 module with above usage
					title: "Orders status",
					data: data,
					type: 'bar', // or 'bar', 'line', 'scatter', 'pie', 'percentage'
					height: 280,
					colors: ['#7cd6fd', '#743ee2','#433ee2','orange','green'],
					axisOptions: {
						xAxisMode: "tick",
						xIsSeries: true
					  }
				})
				}
				
			});

		}

	

		//Add the refresh button

		//Frappe chart

		//Append the body to the page
		//frappe --> pages --> page --> main in developer tools console
		$(frappe.render_template(frappe.estate_app_page.body, this)).appendTo(this.page.main); //attach the body to main element 
		total();//Execute the function before the refresh
		status();
		// page_chart(); // execute the chart after status is updated
		line_chart();

		pie_chart();


		//Refresh button
		$("#refresh-total").click(function(){
			total();//Execute the function after the refresh to get new updates
		});

		

	}

})


//HTML CONTENT


body = `
<div class="widget-group ">
	<div class="widget-group-head">

		<div class="widget-group-control"></div>
	</div>
	<div class="widget-group-body grid-col-3">
		<div class="widget number-widget-box" data-widget-name="Total Stock Value">
			<div class="widget-head">
				<div class="widget-label">
					<div class="widget-title"><span class="ellipsis text-danger" title="Total Property Price">Total Property Price</span>
					</div>
					<div class="widget-subtitle"></div>
				</div>
				<div class="widget-control">
					<div class="card-actions dropdown pull-right">
						<a data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							...
						</a>
						<ul class="dropdown-menu" style="max-height: 300px; overflow-y: auto;">
							<li class="dropdown-item">
								<a data-action="action-refresh" id="refresh-total">Refresh</a>
							</li>
							<li class="dropdown-item">
								<a data-action="action-edit">Edit</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="widget-body">
				<div class="widget-content">
					<div class="number" id="total-price">185377685.66</div>
					<div class="card-stats grey-stat">
						<span class="percentage-stat-area">
							0 % since yesterday
						</span>
					</div>
				</div>
			</div>
			<div class="widget-footer"></div>
		</div>
		<div class="widget number-widget-box" data-widget-name="Total Active Items">
			<div class="widget-head">
				<div class="widget-label">
					<div class="widget-title"><span class="ellipsis" title="Total Active Items">Total Active
							Items</span></div>
					<div class="widget-subtitle"></div>
				</div>
				<div class="widget-control">
					<div class="card-actions dropdown pull-right">
						<a data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							...
						</a>
						<ul class="dropdown-menu" style="max-height: 300px; overflow-y: auto;">
							<li class="dropdown-item">
								<a data-action="action-refresh">Refresh</a>
							</li>
							<li class="dropdown-item">
								<a data-action="action-edit">Edit</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="widget-body">
				<div class="widget-content">
					<div class="number">10</div>
				</div>
			</div>
			<div class="widget-footer"></div>
		</div>
		<div class="widget number-widget-box" data-widget-name="Total Warehouses">
			<div class="widget-head">
				<div class="widget-label">
					<div class="widget-title"><span class="ellipsis" title="Total Warehouses">Total Warehouses</span>
					</div>
					<div class="widget-subtitle"></div>
				</div>
				<div class="widget-control">
					<div class="card-actions dropdown pull-right">
						<a data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							...
						</a>
						<ul class="dropdown-menu" style="max-height: 300px; overflow-y: auto;">
							<li class="dropdown-item">
								<a data-action="action-refresh">Refresh</a>
							</li>
							<li class="dropdown-item">
								<a data-action="action-edit">Edit</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="widget-body">
				<div class="widget-content">
					<div class="number">5</div>
				</div>
			</div>
			<div class="widget-footer"></div>
		</div>
		
	</div>
</div>

<div id="chart"></div>
<hr style="border: 1px solid #808080; width: 100%; margin: 20px auto;">
<div id="line_chart"></div>
<hr style="border: 1px solid #808080; width: 100%; margin: 20px auto;">
<div id="pie_chart"></div>


`



frappe.estate_app_page = {
	body: body,	
}
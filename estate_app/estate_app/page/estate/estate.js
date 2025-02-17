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

		//Add the refresh button
		

		//Append the body to the page
		//frappe --> pages --> page --> main in developer tools console
		$(frappe.render_template(frappe.estate_app_page.body, this)).appendTo(this.page.main); //attach the body to main element 
		total();//Execute the function before the refresh

		$("#refresh-total").click(function(){
			total();//Execute the function after the refresh to get new updates
		});

		

	}

})


//HTML CONTENT


body = `<div class="widget-group ">
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
</div>`



frappe.estate_app_page = {
	body: body,
}
// Copyright (c) 2025, Abhishek Jupalli(abhi) and contributors
// For license information, please see license.txt



frappe.ui.form.on('Property', {
	setup: function (frm) {



		// console.log(frm);
		frm.check_for_amenity_duplicates = function (frm, row) {
			let amenityExists = false;
			frm.doc.amenities.forEach((item) => {
				// console.log(item.amenity); 
				//check in the browser u can access curr_frm --> frm.doc.amenitites . so it is looping through all amenities..  //shortcut-->alt + z
				if (row.amenity == item.amenity && row.idx != item.idx) {
					row.amenity = ''; // making it empty because it already exists
					frm.refresh_field('amenities'); // refreshing the field to clear the input
					frappe.throw(__(`${item.amenity} already exists in row ${item.idx}`));

				}
			});
			// working on this error throw func is stoping the execution of the code after it throws the error ////check this 
		};



		//this is validation if the property type is flat then outdoor kitchen should not be there

		frm.check_flat_against_outdoor_kitchen = function (frm, row) {
			if (row.amenity = "Outdoor Kitchen" && frm.doc.property_ype == "Flat") {
				let amenity = row.amenity
				row.amenity = '',
					frappe.throw((`${amenity} cannot exist in a flat`));
				frm.refresh_field('amenities');
			}
		};



		//compute the grand total of the property
		frm.compute_total = function (frm,row) {
			let total = 0;
			//loop through all the amenities and add the cost
			frm.doc.amenities.forEach((item) => {
				total += item.amenity_price;
			});
			//set the new total by adding amenities cost and property cost
			let new_total =  frm.doc.property_price + total;
			if(frm.doc.discount > 0){
				let discount = (frm.doc.discount / 100) * new_total;
				new_total = new_total - discount;
			}
			console.log(new_total);
			frm.set_value('grand_total', new_total);
			frm.refresh_field('grand_total');


			// whenever discount is change the cumpute total function called n the discunt should update in the grand total


		}

		frm.copy_discount =  (frm) => {
			frm.doc.amenities.forEach((item) => {
				item.discount = frm.doc.discount;
			}
			);
			frm.refresh_field('amenities');
		};


	},





	refresh: function (frm) {
		// frm.add_custom_button('say hi', ()=> {
		// 	console.log('hello');
		// 	},"Action");
		// frm.add_custom_button('ping', ()=> {
		// 	console.log('ping');
		// 	},"Action");
		// frm.add_custom_button('pong', ()=> {
		// 	console.log('pong');
		// 	},"Action");
		// frm.add_custom_button('saved msg', ()=> {
		// 	// frappe.msgprint('Document Saved');
		// 	frappe.prompt('address', ({ value }) => {
		// 		frm.set_value('address', value); // this only saved in the html page not in the database
		// 		frm.refresh_field('address'); 
		// 		frappe.msgprint(`Address saved to ${value}`);
		// 	})

		// 	});



		//Check property type and show/hide fields
		frm.add_custom_button('Check Similar properties', () => {

			let property_type = frm.doc.property_type;
			console.log(property_type);
			//make ajax call to fetch the fields
			frappe.call({
				method: "estate_app.estate_app.doctype.property.api.check_property_types", //dotted path to server method
				args: {
					property_type: property_type
				},
				callback: function (r) {
					// code snippet
					console.log(r);
					let data = r.message;
					if (data.length > 0) {
						let html = `<h3>Below properties are as same type as ${property_type} </h3>`;
						let body = '';
						data.forEach((item) => {
							let count = `<p><b>Name:</b> ${item.name} <a href='/app/property/${item.name}'>Visit </a></p>`;
							body += count;
						});
						let all = html + body;
						frappe.msgprint(all);
					}
					//print them in the messages of same property
				}
			});
			console.log('hello');
		}, "Action");

	},
	//this is the code for the property price if it edited the grand total should be updated and also for the discount
	property_price: function (frm) {
		frm.compute_total(frm);
	},
	discount: function (frm) {
		frm.copy_discount(frm);
		frm.compute_total(frm);
	},

});


frappe.ui.form.on('Property Amenity Detail', {
	setup: function (frm) {


	},


	//this is a code for eventhadler only invoked when the amenity field is
	amenity: function (frm, cdt, cdn) {   //cdt - child doctype, cdn - child docname
		//grab the value of the amenity field
		let row = locals[cdt][cdn]; // getting the entire row / child doctype and child docname
		console.log(row); //row.amenity //getting this amenity from table and verifying it with property doctype getting the table value
		frm.check_for_amenity_duplicates(frm, row);
		frm.compute_total(frm, row);

	},
	//writing above code in child doctype Property Amenity Detail
	//and this below code should be linked with parent Property doctype
	amenities_remove: function (frm, cdt, cdn) {
		frm.compute_total(frm);
	},

});





//The setup function is used to define custom functions and initialize properties when the form is first loaded. This ensures that the custom functions are available for use throughout the form's lifecycle.
//The refresh function is called every time the form is refreshed. This can happen when the form is loaded, saved, or when certain field values are changed. By calling frm.compute_total from the refresh function, you ensure that the total is recalculated whenever the form is refreshed.
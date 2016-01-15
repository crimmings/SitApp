/**
 * Created by crimmings on 1/12/16.
 */

/** Function to fill table with sitter request appointments on page load
 *
 */

function fillAppointmentsTable() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/appointments', function( data ) {

        console.log("sitterRequestData: " + sitterRequestData);

        //Stick request data array into a sitterRequestList variable in the global object
        sitterRequestData = data;


        // For each item in JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td class="requesttimestampsitter">' + this.timeField + '</td>';
            tableContent += '<td class="requestshowsitter">' + this.name + '</td>';
            tableContent += '<td class="requestwhensitter">' + this.when + '</td>';
            tableContent += '<td class="requesttimesitter">' + this.start + ' to ' + this.end + '</td>';
            tableContent += '<td class="requestwheresitter">' + this.where + '</td>';
            tableContent += '<td class="requestmessagesitter">' + this.message + '</td>';
            tableContent += '<td><a href="#" class="deleterequestsitter" rel="' + this._id + '">Delete</a></td>';
            tableContent += '</tr>';
        });
        console.log(sitterRequestData);

        // Inject the whole content string into existing table
        $('#sitterRequestList table tbody').html(tableContent);
    });
    setTimeout(fillAppointmentsTable,5000); // setTimeout to 5 seconds for auto page reload/table refresh

} // end of fill Appointments table function


/** Function to delete sitter request appointments
 *
 * @param event
 * @returns {boolean}
 */

function deleteAppointment(event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this appointment?');


    // Check confirmation
    if (confirmation === false) {
        return false;
    } else {

        // If they did, delete and do that Ajax thang
        $.ajax({
            type: 'DELETE',
            url: '/deleteappointment/' + $(this).attr('rel')
        }).done(function (response) {

            // Check for a successful (blank) response
            if (response.msg === '') {
                // console.log('response.msg: ' + response.msg);
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            fillAppointmentsTable();


        });

    };

};

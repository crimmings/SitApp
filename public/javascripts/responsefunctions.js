/**
 * Created by crimmings on 1/14/16.
 */

function fillResponseTable() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/responsetable', function( data ) {

        console.log("sitterResponseData: " + sitterResponseData);
        //Stick babysitter array into a sitterList variable in the global object
        sitterResponseData = data;

        /* Sticking all of returned sitter data, from the database, into global variable so it can be accessed without
         repeatedly hitting on database each time sitter name clicked in table.*/

        // For each item in JSON, add a table row and cells to the content string
        $.each(data, function(){
            console.log(this.From);
            tableContent += '<tr>';
            //tableContent += '<td class="requesttimestampsitter">' + this.timeField + '</td>';
            tableContent += '<td class="responseshowsitter">' + this.From + '</td>';
            //tableContent += '<td class="requestwhensitter">' + this.when + '</td>';
            //tableContent += '<td class="requesttimesitter">' + this.start + ' to ' + this.end + '</td>';
            //tableContent += '<td class="requestwheresitter">' + this.where + '</td>';
            tableContent += '<td class="responseresponsesitter">' + this.Body + '</td>';
            //tableContent += '<td class="responseid" display="none" rel=" ' + this._id + '</td>';

            tableContent += '<td><a href="#" class="deleteresponsesitter" rel="' + this._id + '">Delete</a></td>';

            //tableContent += '<td><select name="Availability"><option value="None" selected></option><option value="Yes">Yes</option><option value="No">No</option><option value="Maybe">Maybe</option></td>';
            //tableContent += '<td><a href="#" class="confirmsitterrequest" rel="' + this.who + '">Confirm</a></td>';
            tableContent += '</tr>';


            //table data drafts
            //tableContent += '<tr>';
            //tableContent += '<td><a href="#" class="linkshowsitter" id="' + this._id + '" rel="' + this.babysitter + '">' + this.babysitter + '</a></td>';
            //tableContent += '<td>' + this.phone + '</td>';
            //tableContent += '<td class="linkemail">' + this.email + '</td>';
            //tableContent += '<td><a href="#" class="linkdeletesitter" rel="' + this._id + '">Delete</a>/<a href="#" class="linkupdatesitter" rel="' + this._id + '">Update</a></td>';
            //tableContent += '</tr>';

        });
        console.log(sitterResponseData);

        // Inject the whole content string into existing table
        $('#sitterResponseList table tbody').html(tableContent);
    });//end of getjson
    setTimeout(fillResponseTable,5000);
} // end of fill Appointments table function

// *** DELETE SITTER

function deleteResponse(event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confim('Are you sure you want to delete this response?');

    //

    // Check and make sure the sitter is confirmed
    if (confirmation === true) {

        //false first



        // If they did, delete and do that Ajax thang
        $.ajax({
            type: 'DELETE',
            url: '/deleteresponse/' + $(this).attr('rel')
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === '') {
                console.log('response.msg: ' + response.msg);
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            fillResponseTable();


        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;
    }
}

// set interval and clear


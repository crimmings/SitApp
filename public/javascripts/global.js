/**
 * Created by crimmings on 12/30/15.
 */

// sitterListData array for filling in info box
var sitterListData = [];

// DOM

$(document).ready(function() {

    // Fill table with sitters on page load
    fillTable();

    // Babysitter name link click
    $('#sitterList table tbody').on('click', 'td a.linkshowuser', showSitterInfo);
});

    // Add Sitter Button Click
    $('#btnAddSitter').on('click', addSitter);
f
    // Delete Sitter link click
    $('#sitterList table tbody').on('click', 'td a.linkdeleteuser', deleteSitter);

// Functions

// Fill table with data
function fillTable() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/users/babysitters', function( data ) {

        //Stick babysitter array into a sitterList variable in the global object
        sitterListData = data;

        /*sticking all of returned sitter data, from the database, into global variable so it can be accessed without
        repeatedly hitting on database each time sitter name clicked in table.*/

        // For each item in JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.babysitter + '">' + this.babysitter + '</a></td>';
            tableContent += '<td>' + this.phone + '</td>';
            tableContent += '<td><a href="#" class="linkemail" rel="' + this.email + '">' + this.email + '</a></td>';
            tableContent += '<td><a href="#" class="linkdeleteuser" rel="' + this._id + '">Delete</a></td>';
            tableContent += '</tr>';

        });

        // Inject the whole content string into existing HTML table
        $('#sitterList table tbody').html(tableContent);
    });
};

// Show Sitter Info
function showSitterInfo(event) {

    // Prevent Link from Firing
    event.preventDefault();

    // Retrieve sitter's name from link rel attribute
    var thisSitterName = $(this).attr('rel');

    // Get Index of object based on id value
    var arrayPosition = sitterListData.map(function(arrayItem) { return arrayItem.babysitter; }).indexOf(thisSitterName);


    // Get Sitter Object
    var thisSitterObject = sitterListData[arrayPosition];

    //Populate Info Box
    $('#sitterInfoName').text(thisSitterObject.babysitter);
    $('#sitterInfoPhone').text(thisSitterObject.phone);
    $('#sitterInfoEmail').text(thisSitterObject.email);
    //$('#userInfoLocation').text(thisUserObject.location);

};


// Add Sitter

function addSitter(event){
    event.preventDefault();

    //basic validation -- increase errorCount variable if any fields are blank

    var errorCount = 0;

    $('#addSitter input').each(function(index, val){
        if($(this).val() === ''){errorCount++;}
    });

    //Check and make sure errorCount's still at zero

    if(errorCount === 0) {

        //if it is, compile all sitter info into one object
        var newSitter = {
            'babysitter': $('#addSitter fieldset input#inputSitterName').val(),
            'phone': $('#addSitter fieldset input#inputPhone').val(),
            'email': $('#addSitter fieldset input#inputEmail').val()
        }

        // Use AJAX to post the object to addSitter service
        $.ajax({
            type: 'POST',
            data: newSitter,
            url: '/users/addsitter',
            dataType: 'JSON'
        }).done(function (response) {

            // Check for successful (empty) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#addSitter fieldset input').val('');

                // update the table
                fillTable();
            }
            else {

                // If something goes wrong, alert the error message that service returned
                alert('Error Error Error:' + response.msg);
            }
        });
    }
    else {
        // if errorCount is more than 0, error out
        alert("If you want some freedom, you'll need to fill out the form.");
        return false;
    }

};

// Delete Sitter
function deleteSitter(event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this sitter?');

    // Check and make sure the sitter is confirmed
    if (confirmation === true) {

        // If they did, delete
        $.ajax({
            type: 'DELETE',
            url: '/users/deletesitter/' + $(this).attr('rel')
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === '') {
            }
            else {
                alert('Error: ' + response.msg);
            }

            // Update the table
            fillTable();

        });

    }
    else {

        // If they said no to the confirm, do nothing
        return false;

    }

};


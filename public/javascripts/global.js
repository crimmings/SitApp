/**
 * Created by crimmings on 12/30/15.
 */


// sitterListData array for filling in info box
var sitterListData = [];


/*** DOM HANDLERS ***/

$(document).ready(function() {

    // Date Picker
   // $( "#datepicker" ).datepicker();

    // Click link of babysitter name
    $('#sitterList table tbody').on('click', 'td a.linkshowsitter', showSitterInfo);

    // Button click to add babysitter
    $('#btnAddSitter').on('click', addSitter);

    // Click link to delete babysitter
    $('#sitterList table tbody').on('click', 'td a.linkdeletesitter', deleteSitter);

    // Click link to update sitter
    $('#sitterList table tbody').on('click', 'td a.linkupdatesitter', changeSitterInfo);

    // Button click to cancel update of sitter information
    $('#btnCancelUpdateSitter').on('click', togglePanels);

    // add class to update fields
    $('#updateSitter input').on('change', function(){$(this).addClass('updated')});

    // Button click to update sitter information
    $('#btnUpdateSitter').on('click', updateSitter);

    // Populate Request Form Email By Clicking on Babysitter Name
    $('#sitterList').on('click', '.linkshowsitter', function() {
        event.preventDefault();
        var id = $(this).attr("id");
        console.log("this is var id: " + id);
        console.log("john _id: " + sitterListData[0]._id);
        console.log("john email: " + sitterListData[0].email);
        //console.log("this is sitterListData.length: " + sitterListData.length);
        //console.log("this is sitterListData[3]._id: " + sitterListData[3]._id);
        var i = sitterListData.length;
        while (sitterListData.length > 0) {
            i--;
            if (sitterListData[i]._id === id) {
                console.log("This is sitterListData[i]._id: " + sitterListData[i]._id);
                console.log("This is the person you clicked on: " + sitterListData[i].babysitter);
                console.log("This is the email you were looking for: " + sitterListData[i].email);
                var email = sitterListData[i].email;
                console.log(email);

                $('input#requestSitterWho.requestwho').val(email);
            }
        }

    });


    // Function to fill table with sitters on page load
    fillTable();
});



/*** FUNCTIONS ***/

// popup test



// Fill table with data
function fillTable() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/babysitters', function( data ) {

        console.log("sitterListData: " + sitterListData);
        //Stick babysitter array into a sitterList variable in the global object
        sitterListData = data;

        /* Sticking all of returned sitter data, from the database, into global variable so it can be accessed without
        repeatedly hitting on database each time sitter name clicked in table.*/

        // For each item in JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowsitter" id="' + this._id + '" rel="' + this.babysitter + '">' + this.babysitter + '</a></td>';
            tableContent += '<td>' + this.phone + '</td>';
            tableContent += '<td class="linkemail"> ' + this.email + ' </td>';
            tableContent += '<td><a href="#" class="linkdeletesitter" rel="' + this._id + '">Delete</a> / <a href="#" class="linkupdatesitter" rel="' + this._id + '">Update</a></td>';
            //tableContent += '<td><input type="checkbox" class="checkbox" />&nbsp;</td>';
            tableContent += '</tr>';

        });
        console.log(sitterListData);
        // tableContent += '<td><a href="#" class="linkemail" rel="' + this.email + '">' + this.email + '</a></td>';
        // Inject the whole content string into existing table
        $('#sitterList table tbody').html(tableContent);
    });
}


// Show Sitter Info in Info Panel
function showSitterInfo(event) {

    event.preventDefault();

    // Retrieve sitter's name from link rel attribute
    var thisSitterName = $(this).attr('rel');
    console.log("thisSitterName: " + thisSitterName);

    // Get Index of object based on id value (learn more about this)
    var arrayPosition = sitterListData.map(function(arrayItem) { return arrayItem.babysitter; }).indexOf(thisSitterName);
    console.log("arrayPosition: " + arrayPosition);

    // Get Sitter Object
    var thisSitterObject = sitterListData[arrayPosition];

    // Populate Sitter Info Box
    $('#sitterInfoName').text(thisSitterObject.babysitter);
    $('#sitterInfoPhone').text(thisSitterObject.phone);
    $('#sitterInfoEmail').text(thisSitterObject.email);
    //$('#userInfoLocation').text(thisUserObject.location); // add something else? drive? age?

}
// Add sitter to database and table

function addSitter(event){

    event.preventDefault();


    // basic validation -- increase errorCount variable if any fields are blank

    var errorCount = 0;

    $('#addSitter input').each(function(index, val){
       if($(this).val() === ''){errorCount++;}
    });

    //Check and make sure errorCount's still at zero

    if(errorCount === 0) {

        // if it is, compile all sitter info into one object
        var newSitter = {
            'babysitter': $('#addSitter fieldset input#inputSitterName').val(),
            'phone': $('#addSitter fieldset input#inputSitterPhone').val(),
            'email': $('#addSitter fieldset input#inputSitterEmail').val()
        }

        // Use AJAX to post the object to addSitter service
        $.ajax({
           type: 'POST',
           data: newSitter,
           url: '/addsitter',
           dataType: 'JSON'
        }).done(function (response) {
           console.log("This is response.msg: " + response.msg);

            // Check for successful (empty) response -- clarify what response.msg is)
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

}

// put sitter info into the "update sitter panel"
function changeSitterInfo(event){

    event.preventDefault();

    // If the addSitter panel is visible, hide it and show updateSitter panel
    if($('#addSitterPanel').is(":visible")){
        togglePanels();
    }

    // Get index of object based on _id value
    var _id = $(this).attr('rel');
    var arrayPosition = sitterListData.map(function(arrayItem){ return arrayItem._id; }).indexOf(_id);
console.log("this is JSON.stringify(arrayPosition) " + JSON.stringify(arrayPosition));

    // Get Sitter Object
    var thisSitterObject = sitterListData[arrayPosition];
console.log("updatesitter =" + JSON.stringify(thisSitterObject));

    // Fill info box
    $('#updateSitterName').val(thisSitterObject.babysitter);
    $('#updateSitterPhone').val(thisSitterObject.phone);
    $('#updateSitterEmail').val(thisSitterObject.email);

    // Put the id into the REL of tbe 'update sitter' block
    $('#updateSitter').attr('rel', thisSitterObject._id);
}
// update Sitter information
function updateSitter(event) {
    console.log("oh hi, i'm in ur update sitter function");

    event.preventDefault();

    // confirm dialog
    var confirmation = confirm('Are you sure you want to update this sitter?');

    // check to make sure user confirmed

    if (confirmation === true) {
        // if confirmed do update

        // set _id of sitter to be update (look into this syntax)
        var _id = $(this).parentsUntil('div').parent().attr('rel');
        console.log("Sitter ID = "+ _id);

        // create a collection of the updated fields
        var fieldsToBeUpdated = $('#updateSitter input.updated');

        // create object of the pairs (check syntax on 'pairs')
        var updatedFields = {};
        $(fieldsToBeUpdated).each(function () {
            var key = $(this).attr('placeholder').replace('', '').toLowerCase();
            console.log("Attribute " + $(this).attr('placeholder'));
            var value = $(this).val();
            console.log("Value =" + value);
            updatedFields[key] = value;
        });

        // do that AJAX thang
        $.ajax({
            type: 'PUT',
            url: '/updatesitter/' + _id,
            data: updatedFields
        }).done(function (response) {

            // check for a successful(empty) response
            if (response.msg === '') {
                console.log("response.msg: " + response.msg);
                togglePanels();
            }
            else {
                alert('ERROR error ERROR: ' + response.msg);
            }
            // Update the table
            fillTable();
        });
    }
    else {
        // if no to confirm, do nothing
        return false;
    }
}
// Delete Sitter
function deleteSitter(event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this sitter?');

    // Check and make sure the sitter is confirmed
    if (confirmation === true) {

        // If they did, delete and do that Ajax thang
        $.ajax({
            type: 'DELETE',
            url: '/deletesitter/' + $(this).attr('rel')
        }).done(function( response ) {

            // Check for a successful (blank) response
            if (response.msg === '') {
                console.log('response.msg: ' + response.msg);
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
}
// Toggle addSitter and updateSitter panels

function togglePanels(){
    $('#addSitterPanel').toggle();
    $('#updateSitterPanel').toggle();
}

// POP UP TEST




console.log(sitterListData);
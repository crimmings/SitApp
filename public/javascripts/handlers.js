/**
 * Created by crimmings on 12/30/15.
 */


// sitterListData array for filling in info box
var sitterListData = [];
var sitterRequestData = [];
var sitterResponseData = [];

/*** DOM HANDLERS ***/

$(document).ready(function() {

    // Click link of babysitter name
    $('#sitterList table tbody').on('click', 'td a.linkshowsitter', showSitterInfo);

    // Button click to add babysitter
    $('#btnAddSitter').on('click', addSitter);

    // Click link to delete babysitter
    $('#sitterList table tbody').on('click', 'td a.linkdeletesitter', deleteSitter);

    // click link to delete appointment
    $('#sitterRequestList table tbody').on('click', 'td a.deleterequestsitter', deleteAppointment);

    // click link to delete sitter response
    $('#sitterResponseList table tbody').on('click', 'td a.deleteresponsesitter', deleteResponse);

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
            console.log("this is sitterListData.length: " + sitterListData.length);
            console.log("this is sitterListData[0]._id: " + sitterListData[0]._id);
            var sitterEmail = '';
            var sitterName = '';
            var sitterPhone = '';
            for (var i = 0; i < sitterListData.length; i++) {
                if (sitterListData[i]._id === id) {
                    sitterEmail = sitterListData[i].email;
                    sitterName = sitterListData[i].babysitter;
                    sitterPhone = sitterListData[i].phone;
                    $('input#requestSitterWho.requestwho').val(sitterPhone);
                    $('input#requestSitterName.requestname').val(sitterName);
                    console.log(sitterPhone);
                    console.log(sitterName);
                }

            }
            popup(sitterPhone, sitterName);

        }); // end of request form handler

    // Function to fill table with sitters on page load
    fillTable();
    fillAppointmentsTable();
    fillResponseTable();
});







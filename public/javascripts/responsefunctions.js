/**
 * Created by crimmings on 1/14/16.
 */

/** Function to fill sitter response table on page load
 *
 */

function fillResponseTable() {

    // Empty content string
    var tableContent = '';

    // jQuery AJAX call for JSON
    $.getJSON( '/responsetable', function( data ) {

        console.log("sitterResponseData: " + sitterResponseData);

        //Stick response array into a sitterResponseList variable in the global object
        sitterResponseData = data;

        // For each item in JSON, add a table row and cells to the content string
        $.each(data, function(){
            console.log(this.From);
            tableContent += '<tr>';
            tableContent += '<td class="responseshowsitter" id="' + this._id + '">' + this.From + '</td>';
            tableContent += '<td class="responseresponsesitter">' + this.Body + '</td>';
            tableContent += '<td><a href="#" class="responsedeclinesitter" id="' + this._id +'" rel="' + this._id + '">Decline</a></td>';
            tableContent += '<td><a href="#" class="responseconfirmsitter" id="' + this._id + '" rel="' + this._id + '">Confirm</a></td>';
            tableContent += '<td><a href="#" class="deleteresponsesitter" rel="' + this._id + '">Delete</a></td>';
            tableContent += '</tr>';
        });
        console.log(sitterResponseData);


        // Inject the whole content string into existing table
        $('#sitterResponseList table tbody').html(tableContent);
    });//end of getjson
    setTimeout(fillResponseTable,5000); //setTimeout to 5 seconds for autorefresh table data

} // end of fill Appointments table function


/** Function to delete sitter responses
 *
 * @param event
 * @returns {boolean}
 */

function deleteResponse(event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = popupS.confirm({
        content: 'Are you sure you want to delete this response?',
        labelOk: 'Yes',
        labelCancel: 'No'
    });


    // Check and make sure the sitter is confirmed
    if (confirmation === false) {

        return false;

    } else {

        // If confirmed, delete and do that Ajax thang
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

    };
};



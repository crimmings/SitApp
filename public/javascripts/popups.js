function popup(sitterEmail) {

    popupS.modal({
        content: '<div id="requestSitter">' + '<h2>Request A Sitter</h2>' +
        '<form id="request" action="/request" name="requestsitter" method="post"><fieldset>' +
        '<label>Who?</label><input id="requestSitterWho" type="text" name="who" class="requestwho" placeholder="Who?"><br />' +
        '<label>Date?</label><input id="datepicker" type="text" name="when" placeholder="When?"><br />' +
        '<label>Start Time?</label><input id="requestSitterTimeStart" type="text" name="start" placeholder="Start Time?"><br />' +
        '<label>End Time?</label><input id="requestSitterTimeEnd" type="text" name="end" placeholder="End Time?"><br />' +
        '<label>Where?</label><input id="requestSitterWhere" type="text" name="where" placeholder="Where?"><br /> ' +
        '<label>Message?</label><textarea id="requestSitterNotes" name="message" cols="15" rows="5" placeholder="Notes?"></textarea>' +
        '<br /><input type="submit" name="request" value="Send" id="requestinput">',
        onClose: function(){
            console.log("Close popup")
        },
        onSubmit: function(){
            console.log("submit popup")
        }
    });
    $('input#requestSitterWho.requestwho').val(sitterEmail);
};
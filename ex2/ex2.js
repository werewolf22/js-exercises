var NotesManager = (function(){

	function addNote(note) {
		$notes.prepend(
			$("<a href='#'></a>")
			.addClass("note")
			.text(note)
		);
	}

	function addCurrentNote() {
		var current_note = $new_note.val();

		if (current_note) {
			notes.push(current_note);
			addNote(current_note);
			$new_note.val("");
		}
	}

	function showHelp() {
		$help.show();

		document.addEventListener("click",function __handler__(evt){
			evt.preventDefault();
			evt.stopPropagation();
			evt.stopImmediatePropagation();

			document.removeEventListener("click",__handler__,true);
			hideHelp();
		},true);
	}

	function hideHelp() {
		$help.hide();
	}

	function handleOpenHelp(evt) {
		if (!$help.is(":visible")) {
			evt.preventDefault();
			evt.stopPropagation();

			showHelp();
		}
	}

	function handleAddNote(evt) {
		addCurrentNote();
	}

	function handleEnter(evt) {
		if (evt.which == 13) {
			addCurrentNote();
		}
	}

	function handleDocumentClick(evt) {
		$notes.removeClass("active");
		$notes.children(".note").removeClass("highlighted");
	}

	function handleNoteClick(evt) {
		evt.preventDefault();
		evt.stopPropagation();

		$notes.addClass("active");
		$notes.children(".note").removeClass("highlighted");
		$(evt.target).addClass("highlighted");
	}

	function init(doms) {
		$notes = $(doms.notes);
		console.log($notes);
		$open_help = $(doms.open_help);
		$add_note = $(doms.add_note);
		$new_note = $(doms.new_note);
		$help = $(doms.help);

		// build the initial list from the existing `notes` data
		var html = "";
		for (i=0; i<notes.length; i++) {
			html += "<a href='#' class='note'>" + notes[i] + "</a>";
		}
		$notes.html(html);

		// listen to "help" button
		$open_help.bind("click",handleOpenHelp);

		// listen to "add" button
		$add_note.bind("click",handleAddNote);

		// listen for <enter> in text box
		$new_note.bind("keypress",handleEnter);

		// listen for clicks outside the notes box
		$(document).bind("click",handleDocumentClick);

		// listen for clicks on note elements
		$notes.on("click",".note",handleNoteClick);
	}

	function loadNotes(notesData) {
		for (var i = 0 ; i < notesData.length ; i++) {
			notes[i] = notesData[i];
		}
	}

	var	notes = [], // for newly added notes used in loadNotes
	// variabls to grabbing dom
		$add_note,
		$new_note,
		$help,
		$open_help,
		$notes,
		// public api module
		NotesManagerApi = {
		init: init,
		loadNotes: loadNotes
	};
	return NotesManagerApi;

})();
// assume this data came from the database
NotesManager.loadNotes([
	"This is the first note I've taken!",
	"Now is the time for all good men to come to the aid of their country.",
	"The quick brown fox jumped over the moon."
]);
$(document).ready(function(){
	NotesManager.init({
		notes: "#notes",
		open_help: "#open_help",
		add_note: "#add_note",
		new_note: "#note",
		help: "#help"
	});
});

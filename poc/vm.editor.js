window.EditorVM = (function () {
	

	return function (ko, services) {

		var noFieldNoSave = 'vous n\'avez aucun champ la sauvegarde ne sera donc pas possible';
		var whatToDoWith = function (nbInputs){
			if(nbInputs === 0 ) return noFieldNoSave;
			return 'vous avez ' + nbInputs + ' champ'+ (nbInputs > 1? 's':'') +', remplissez le formulaire et cliquez sur "Ajouter" pour en ajouter, sinon cliquez sur "Sauvegarder" pour terminer la creation' ;
		};
		var self = this;
		var openAction = function(){};
		var selectedtype = ko.observable({name:"text", selected: ko.observable(true)});
		var inputs = ko.observableArray([]);
		var inputChoices = ko.observableArray([]);
		var label = ko.observable('');
		var title = ko.observable('');
		var helptext = ko.observable(noFieldNoSave);
		var newchoice = ko.observable('');


		var reset = function() {

			self.selectInputType(self.availableInputTypes[0]);
			inputs([]);
			label('');
			title('');
			helptext(noFieldNoSave);
			inputChoices([]);
			newchoice('');
		}

		this.inputs = inputs;

		this.inputChoices = inputChoices;

		this.helptext = helptext;

		this.title = title;

		this.label = label;

		this.newchoice = newchoice;

		this.activate = function(){};
		this.deactivate = function(){
			reset();
		};

		this.whenOpenForm = function (openForm) {
			openAction = openForm;
		};

		this.availableInputTypes = [
			selectedtype(), 
			{name:"boolean", selected: ko.observable(false)}, 
			{name:"multipleChoice", selected: ko.observable(false)}, 
			{name:"singleChoice", selected: ko.observable(false)}];


		this.selectInputType = function(input) {
			selectedtype().selected(false);
			selectedtype(input);
			selectedtype().selected(true);
		};

		this.inputNeedChoice = ko.computed(function() {
			return selectedtype().name === 'multipleChoice' || selectedtype().name === 'singleChoice';
		});

		this.addNewChoice = function() {
			inputChoices.push(newchoice());
			newchoice('');
		};

		this.addInput = function () {
			inputs.push({
				label: label(),
				type: selectedtype().name,
				choices: inputChoices()
			});
			label('');
			newchoice('')
			inputChoices([])
			self.selectInputType(self.availableInputTypes[0]);
			helptext(whatToDoWith(inputs().length));
		};

		this.saveForm = function () {
			services("forms").post(ko.toJS({
				title: title(),
				inputs:inputs(),
			}));
			reset();
		};

		this.saveFormAndTryIt = function () {
			var ftitle = title();
			var id = services("forms").post(ko.toJS({
				title: ftitle,
				inputs:inputs(),
			}));
			reset();
			openAction({
				id:id,
				title: ftitle
			});
		};

		this.reset = reset;
	};

})();
window.FormVM = (function () {
	

	return function (ko, form, services) {

		var defaultValueFor = function(type) {
			if(input.type === 'text') return input.value = '';
			if(input.type === 'boolean') return input.value = false;
		};

		var selectedChoicesIn = function(choices) {
			var result = [];
			for(var i = 0; i < choices.length; ++i){
				var choice = choices[i];
				if(choice.selected) result.push(choice.choiceValue);
			}
			return result;
		};

		var inputChoices = function (choices, group) {
			var result =[];
			for(var i = 0; i < choices.length; ++i) {
				var text = choices[i];
				result.push({
					choiceValue: text,
					selected: false,
					group: group
				});
			}
			return result;
		};

		var getAnswers = function (inputs) {
			var result =[];
			for(var i = 0; i < inputs.length; ++i) {
				var input = inputs[i];
				result.push({
					label:input.label,
					type:input.type,
					value: (input.choices.length > 0 && input.type === 'multipleChoice' ? selectedChoicesIn(input.choices) : input.value)
				});
			}
			return result;
		};

		var resultSavedAction = function(){};
		var self = this;
		this.title = form.title;
		this.inputs = [];


		var details = services('forms').get(form.id);

		for (var i = 0; i< details.inputs.length; ++i){
			var input = details.inputs[i];
			this.inputs.push({
				label: input.label,
				type: input.type,
				value: defaultValueFor(input.type),
				choices: inputChoices(input.choices, 'inputChoices' + i)
			});
		}

		this.saveResult = function() {
			services('forms/results').post({
				id: form.id,
				answers: getAnswers(self.inputs),
				title: self.title
			});
			resultSavedAction();
		};

		this.saveAndShowResult = function() {
			var rid = services('forms/results').post({
				id: form.id,
				answers: getAnswers(self.inputs),
				title: self.title
			});
			displayResultAction({
				id:rid, title:self.title
			});
		}

		this.closeWithoutSaving = function() {
			resultSavedAction();
		};

		this.whenResultIsSaved = function(action) {
			resultSavedAction = action;
		};

		this.whenShowResult = function(action) {
			displayResultAction = action;
		};
	};

})();
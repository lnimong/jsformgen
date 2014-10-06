window.ResultVM = (function () {
	

	return function (ko, result, services) {

		var defaultValueFor = function(type) {
			if(input.type === 'text') return input.value = '';
			if(input.type === 'boolean') return input.value = false;
		};

		var finishReadingAction = function(){};
		var self = this;
		this.title = result.title;
		this.answers = [];


		var details = services('forms/results').get(result.id);

		for (var i = 0; i< details.answers.length; ++i){
			var answer = details.answers[i];
			this.answers.push({
				label: answer.label,
				type: answer.type,
				value: answer.value
			});
		}

		this.finishReading = function() {
			finishReadingAction();
		}

		this.whenFinishReading = function(action) {
			finishReadingAction = action;
		}
	};

})();
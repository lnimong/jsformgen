window.ResultsBrowserVM = (function () {
	

	return function (ko, services) {

		var results = ko.observable([]);
		var openAction = function(){};

		this.results = results;

		this.whenOpenResult = function (openForm) {
			openAction = openForm;
		};

		this.open = function (result) {
			openAction(result);
		};
		
		this.activate = function(){
			results(services("forms/results").get());
		};

		this.deactivate = function(){};
	};

})();
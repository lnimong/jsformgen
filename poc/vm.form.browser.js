window.FormsBrowserVM = (function () {
	

	return function (ko, services) {

		var forms = ko.observable([]);
		var openAction = function(){};

		this.forms = forms;

		this.whenOpenForm = function (openForm) {
			openAction = openForm;
		};

		this.open = function (form) {
			openAction(form);
		};
		
		this.activate = function(){
			forms(services("forms").get());
		};

		this.deactivate = function(){};
	};

})();
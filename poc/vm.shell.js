window.ShellVM = (function () {
	

	return function (ko, FormVMCtor, ResultVMCtor, services) {

		var self = this;
		var FormVM = FormVMCtor;
		var ResultVM = ResultVMCtor;
		var selectedid = ko.observable(1);
		var emptyForm = {title:'', inputs:[], saveAnswers:function(){}, id:0};
		var emptyResult = {title:'', answers:[], finishReading:function(){}, id:0};
		var formContext = ko.observable(emptyForm);
		var resultContext = ko.observable(emptyResult);

		var vm = function (index) {
			return [self.editorContext, self.formsBrowserContext, self.resultsBrowserContext][index];
		};

		var closeForm = function() {
			formContext(emptyForm);
		};

		var closeResult = function() {
			resultContext(emptyResult);
		};

		var closeFormAndOpenResult = function (result) {
			closeForm();
			self.openResult(result);
		} 

		this.closeAll = function () {
			if(resultContext().id !== 0) closeResult();
			if(formContext().id !== 0) closeForm();
		}

		this.sections = [
			{header : "Editeur de Forms", id : 1}, 
			{header : "Mes Forms", id : 2}, 
			{header : "Mes Reponse", id : 3}];

		this.selectSection = function (section) {
			vm(selectedid() - 1).deactivate();
			selectedid(section.id);
			vm(selectedid() - 1).activate();
		};

		this.selectedid = selectedid;
		this.formContext = formContext;
		this.resultContext = resultContext;

		this.showForm = ko.computed(function() {
			return formContext().id !== 0;
		});

		this.showResult = ko.computed(function() {
			return resultContext().id !== 0;
		});

		this.editor = ko.computed (function () {
			return selectedid() === 1;
		});

		this.showForms = ko.computed (function () {
			return selectedid() === 2;
		});

		this.showResults = ko.computed (function () {
			return selectedid() === 3;
		});

		this.openForm = function(form) {
			var formVM = new FormVM(ko, form, services);
			formVM.whenResultIsSaved(closeForm);
			formVM.whenShowResult(closeFormAndOpenResult);
			self.formContext(formVM);
		};

		this.openResult = function(result) {
			var resultVM = new ResultVM(ko, result, services);
			resultVM.whenFinishReading(closeResult);
			self.resultContext(resultVM);
		};
	};

})();
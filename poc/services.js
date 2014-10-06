window.ServicesManager = (function () {
	
	return function (_) {

		var allforms = [];
		var allResults = [];

		var toTitleAndIdOnly = function (f, i) {
			return {
				title: f.title,
				id : i+1 
			};
		};

		var addNewForm = function(f) {
			allforms.push(f);
			return allforms.length;
		};

		var getAllForms = function() {
			return _.map(allforms, toTitleAndIdOnly);
		};

		var getFormDetailsById = function(i) {
			var f = allforms[i - 1];
			f.id = i;
			return f;
		};

		var getAllResults = function() {
			return _.map(allResults, toTitleAndIdOnly);
		};

		var getResultDetailsById = function(i) {
			var a = allResults[i - 1];
			a.id = i;
			return a;
		};

		var addNewResult = function (fa) {
			allResults.push(fa);
			return allResults.length;
		}

		return function (name) {
			var services = {
				'forms/results' : {
					post: function (formans) {
						return addNewResult(formans);
					},
					get: function(id) {
						if(id) {
							return getResultDetailsById(id);
						}
						return getAllResults();
					}
				},
				'forms' : {
					post: function (formdesc) {
						return addNewForm(formdesc);
					},
					get: function(id) {
						if(id) {
							return getFormDetailsById(id);
						}
						return getAllForms();
					}
				},
			}
			return services[name];
		};
	}
})();
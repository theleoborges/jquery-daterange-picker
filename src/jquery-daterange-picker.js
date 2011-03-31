(function($) {
  function daterangepicker(options) {
    var fromSelector = options.fromSelector;
    var onSelectFrom = options.onSelectFrom || function(){};
    var onSelectTo = options.onSelectTo || function(){};
    var toSelector = options.toSelector;
    var readOnly = options.readOnly || false;
	
	  cleanupOptions(options);
	
	  var fromDatepickerOptions = $.extend(options,{
		  onSelect:function(dateText, inst) {
	      $(toSelector).datepicker("option", "minDate", dateText);
	      onSelectFrom(dateText, inst);
	    }	
	  });
	
    $(fromSelector).datepicker(fromDatepickerOptions);

	  var toDatepickerOptions = $.extend(options, {
      onSelect:function(dateText, inst) {
        $(fromSelector).datepicker("option", "maxDate", dateText);
        onSelectTo(dateText, inst);
      }
	  });
    $(toSelector).datepicker(toDatepickerOptions);

    if (readOnly) {
      $.each([fromSelector, toSelector], function(index, value) {
        $(value).keydown(function(event) {
          event.preventDefault();
        });
      });
    }

    $.datepicker._selectDate($(fromSelector), $(fromSelector).val());
    $.datepicker._selectDate($(toSelector), $(toSelector).val());
  }
	
	function cleanupOptions(options) {
		delete options.fromSelector;
		delete options.toSelector;
		delete options.onSelectFrom;
		delete options.toSelectFrom;
		delete options.readOnly;
	}

  $.daterangepicker = daterangepicker;
})(jQuery);

describe('jquery-daterange-picker', function () {
  it('should not pass daterangepicker specific options down to the jQuery datepicker', function () {
    var spy = spyOn($.fn, 'datepicker');
    spyOn($.datepicker, '_selectDate');
    $.daterangepicker({
      fromSelector: "#dummyFromSelector",
      toSelector: "#dummyToSelector",
      dateFormat: "anything",
      onSelectFrom: function() {},
      onSelectTo: function() {},
      readOnly: true
    });
    expect(spy.callCount).toEqual(2);
    expect(spy.argsForCall[0][0].dateFormat).toEqual("anything");
    expect(spy.argsForCall[0][0].fromSelector).not.toBeDefined();
    expect(spy.argsForCall[0][0].toSelector).not.toBeDefined();
    expect(spy.argsForCall[0][0].onSelectFrom).not.toBeDefined();
    expect(spy.argsForCall[0][0].toSelectFrom).not.toBeDefined();
    expect(spy.argsForCall[0][0].readOnly).not.toBeDefined();

    expect(spy.argsForCall[1][0].dateFormat).toEqual("anything");
    expect(spy.argsForCall[1][0].fromSelector).not.toBeDefined();
    expect(spy.argsForCall[1][0].toSelector).not.toBeDefined();
    expect(spy.argsForCall[1][0].onSelectFrom).not.toBeDefined();
    expect(spy.argsForCall[1][0].toSelectFrom).not.toBeDefined();
    expect(spy.argsForCall[1][0].readOnly).not.toBeDefined();
  });

  it('it should narrow the date options by setting the minDate and maxDate datepicker options', function () {
    loadFixtures('text_inputs.html');

    $.daterangepicker({
      fromSelector: "#fromDate",
      toSelector: "#toDate"
    });

    $.datepicker._selectDate($("#fromDate"), '14-02-1983');
    expect($('#toDate').datepicker("option", "minDate")).toEqual('14-02-1983');

    $.datepicker._selectDate($("#toDate"), '28-08-1976');
    expect($('#fromDate').datepicker("option", "maxDate")).toEqual('28-08-1976');
  });

  it('it should invoke the provided callbacks', function () {
    loadFixtures('text_inputs.html');
    var onSelectFromCallback = jasmine.createSpy();
    var onSelectToCallback = jasmine.createSpy();

    $.daterangepicker({
      fromSelector: "#fromDate",
      toSelector: "#toDate",
      onSelectFrom: onSelectFromCallback,
      onSelectTo: onSelectToCallback
    });

    $.datepicker._selectDate($("#fromDate"), '14-02-1983');
    expect(onSelectFromCallback).toHaveBeenCalled();

    $.datepicker._selectDate($("#toDate"), '28-08-1976');
    expect(onSelectToCallback).toHaveBeenCalled();
  });

  it('should self initialize in case there are values already present', function () {
    loadFixtures('text_inputs.html');
    var spy = spyOn($.datepicker, '_selectDate');

    $.daterangepicker({
      fromSelector: "#fromDate",
      toSelector: "#toDate"
    });

    expect(spy.callCount).toEqual(2);
  });
});
import Ember from 'ember';

var $ = Ember.$;

var BsColorpicker = Ember.Object.extend({

  $: function(selector) {
    if (selector) {
      return $(this.get('element')).find(selector);
    } else {
      return $(this.get('element'));
    }
  },

  didInsertElement: function() {
    this._initializeValues();
    this.$().colorpicker(this.getProperties('color', 'format', 'align'));
    this.$().on('changeColor', $.proxy(this.didChangeColorFromComponent, this));
    this.$().on('showPicker', $.proxy(this.didChangeColorFromComponent, this));
  },

  willDestroyElement: function() {
    this.$().off('changeColor');
    this.$().off('showPicker');
    this.$().colorpicker('destroy');
  },

  didChangeColorFromComponent: function(event) {
    var componentColor = event.color.toString(this.get('format'));

    // Prevent changing color if component is already set
    if (componentColor !== this.get('color')) {
      this.set('color', componentColor);
    }
  },

  didChangeColorFromProperty: function() {
    // Prevent changing color if value is already set
    var color = this.$().data('colorpicker').color;
    if (this.get('color') !== color.toString(this.get('format'))) {
      color.setColor(this.get('color') || '#000000');
      this.$().colorpicker('update');
    }
  },

  // If value of input is empty, the colorpicker doesn't initialize properly
  _initializeValues: function() {
    var color = this.get('color');
    if (color) {
      if (this.$().is('input')) {
        this.$().val(color);
      } else if (this.$('input').length) {
        this.$('input').val(color);
      }
    }
    this.$().data('color', color);
  },

});

export default function(options) {
  var hash = options.hash;
  var element = options.element;
  var view = options.data.view;
  var stream = view.getStream(hash.color);

  var colorpicker = BsColorpicker.create({
    element: element,
    format: hash.format,
    align: hash.align
  });

  // Add computed property for color
  Ember.defineProperty(colorpicker, 'color', Ember.computed({
    set: function(key, value) {
      stream.setValue(value);
      return value;
    },
    get: function() {
      return stream.value();
    }
  }).volatile());

  stream.subscribe(function() {
    colorpicker.didChangeColorFromProperty();
  });

  colorpicker.didInsertElement();

  options.data.view.one('willDestroyElement', function() {
    colorpicker.willDestroyElement();
  });
}

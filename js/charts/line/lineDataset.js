var label;
var data;
var fill;
var backgroundColor;
var borderColor;

function LineDataset(label_, data_, color) {
  this.label = label_;
  this.data = data_;
  this.fill = false;
  this.backgroundColor = color;
  this.borderColor = color;
}
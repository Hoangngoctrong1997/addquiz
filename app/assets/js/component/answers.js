var radioInput = [
  '<input type="radio" class="styled" name="ans-value">',
].join("\n");

var checkboxInput = [
  '<input type="checkbox" class="styled" name="ans-value">',
].join("\n");

var textInput = [
  '<input type="text" name="ans-value" class="form-control" placeholder="Số thứ tự">',
].join("\n");

var ansImageForm = [
  '<form>',
    '<div class="form-group">',
      '<input type="file" name="image" class="file-input">',
    '</div>',
    '<div class="form-group">',
      '{{> ansInput}}',
    '</div>',
    '<input type="hidden" value="{{uuid}}" name="uuid" />',
  '</form>',
].join("\n");

var ansTextForm = [
  '<form>',
    '<div class="form-group">',
      '<input type="text" name="ans-desc" class="form-control" placeholder="Nội dung câu trả lời">',
    '</div>',
    '<div class="form-group">',
      '{{> ansInput}}',
    '</div>',
    '<input type="hidden" value="{{uuid}}" name="uuid" />',
  '</form>',
].join("\n");

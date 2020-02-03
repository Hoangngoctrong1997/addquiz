var radioView = [
  '<div class="radio">',
    '<label>',
      '<input type="radio" name="{{name}}" /> {{description}}',
    '</label>',
  '</div>',
].join("\n");

var questionScPreview = [
  '<li class="media" data-uuid="{{uuid}}">',
    '<div class="media-body">',
      '{{description}}',
    '</div>',
    '<ul class="list-inline mt-5">',
      '<li><a data-action="edit" href="#" data-id="{{uuid}}">Edit</a></li>',
      '<li><a data-action="delete" href="#" data-id="{{uuid}}">Delete</a></li>',
    '</ul>',
    '<button type="submit" class="btn btn-primary btn-add-ans" data-question-type={{question}} data-type="{{type}}" data-uuid="{{uuid}}">',
      '<i class="icon-plus3 position-left"></i> Thêm câu trả lời',
    '</button>',
    '<div class="form-group">',
      '{{#ansList}}',
        '<div class="radio"><label><input type="radio" name="{{name}}">{{value}}</label></div>',
      '{{/ansList}}',
    '</div>',
  '</li>',
].join("\n")

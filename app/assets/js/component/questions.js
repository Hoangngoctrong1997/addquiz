/**
 * @file include question templates.
 */

// Question form.
var questionForm = [
  '<form class="question-form question-form">',
    '<input type="text" name="score" value="{{score}}" class="form-control" placeholder="Điểm">',
    '<div class="form-group">',
      '<select name="ans-type" class="select-search select-ans-type" data-placeholder="Loại câu trả lời">',
        '<option value="text">Text</option>',
        '<option value="image">Hình ảnh</option>',
      '</select>',
    '</div>',
    '<div class="form-group">',
      '<select name="level" class="select-search select-question-level" data-placeholder="Độ khó">',
        '<option></option>',
      '</select>',
    '</div>',
    '<div class="form-group">',
      '<select name="category" multiple="multiple" class="select-search select-question-category" data-placeholder="Danh mục">',
        '<option></option>',
      '</select>',
    '</div>',
    '<div class="form-group">',
      '<label>Mô tả</label>',
      '<textarea name="description" value="{{description}}" id="question-editor" class="textarea-ckeditor" placeholder="Question"></textarea>',
    '</div>',
    '<input type="hidden" name="question_type" value="{{type}}" />',
  '</form>',
].join("\n");

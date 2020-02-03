/**
 * @file includes all function relate to quiz form.
 */

$( document ).ready(function() {
  // Sortable feature.
  $('.panel-section').sortable({
    connectWith: '.row-sortable',
    items: '.panel',
    helper: 'original',
    cursor: 'move',
    handle: '.panel-heading',
    revert: 100,
    containment: '.content-wrapper',
    forceHelperSize: true,
    placeholder: 'sortable-placeholder',
    forcePlaceholderSize: true,
    tolerance: 'pointer',
    start: function(e, ui){
      ui.placeholder.height(ui.item.outerHeight());
    }
  });

  $('.sortable_questions').sortable({
    connectWith: '.row-sortable',
    items: '.media',
    cursor: 'move',
    revert: 100,
    forceHelperSize: true,
    forcePlaceholderSize: true,
    tolerance: 'pointer',
    placeholder: 'sortable_placeholder_questions',
    start: function(e, ui){
      ui.placeholder.height(ui.item.outerHeight());
    }
  });

  $('#button_help').on('click', function(){
    $('.help_content').toggleClass('hidden');
  });

  $('.button_hide_help').on('click', function(){
    $('.help_content').toggleClass('hidden');
  });

  // Event add new section of quiz.
  $('.btn-add-section').click(function(e){
    e.preventDefault();
    var sectionNumber = $(this).attr('data-number');
    var dataForm = {
      number: sectionNumber,
    }
    var htmlSectionForm = Mustache.render(sectionForm, dataForm);
    bootbox.dialog({
      title: "Section information.",
      message: htmlSectionForm,
      buttons: {
        success: {
          label: "Save",
          className: "btn-success",
          callback: function () {
            // Sample section.
            $.ajax({
              type: "GET",
              url: "/jsonapi/section/section/ef945933-2bd5-49a6-9586-32b8fdf6fc32",
              dataType: 'json',
              success: function (response){
                console.log(response);
                var attributes = response.data.attributes;
                var dataView = {
                  score: attributes.field_score,
                  label: attributes.name,
                  desc: attributes.field_description.value,
                  uuid: response.data.id,
                  number: sectionNumber,
                }
                var htmlSectionView = Mustache.render(sectionView, dataView);
                $('.panel-section').append(htmlSectionView);
                sectionNumber = parseInt(sectionNumber) + 1;
                $('.btn-add-section').attr('data-number', sectionNumber);
              }
            });
          }
        }
      }
    });
    // Apply config.
    CKEDITOR.disableAutoInline = true;
    CKEDITOR.config.toolbar = configToolbar;
    CKEDITOR.replace('section-editor', {height: '100px'});
  });

  $('.panel-section').on('click', '[data-action=edit]', function(e){
    e.preventDefault();
    var idSection = $(this).attr('data-id');
    $.ajax({
      type: "GET",
      url: "/jsonapi/section/section/" + idSection,
      dataType: 'json',
      success: function (response){
        var attributes = response.data.attributes;
        var dataForm = {
          score: attributes.field_score,
          label: attributes.name,
          desc: attributes.field_description.value,
          uuid: response.data.id,
        }
        var htmlSectionForm = Mustache.render(sectionForm, dataForm);
        bootbox.dialog({
          title: "Section information.",
          message: htmlSectionForm,
          buttons: {
            success: {
              label: "Save",
              className: "btn-success",
              callback: function () {
                // Sample section.
                $.ajax({
                  type: "GET",
                  url: "/jsonapi/section/section/e3d544a1-6c34-4fc5-819a-72d28749e631",
                  dataType: 'json',
                  success: function (response){
                    var attributes = response.data.attributes;
                    var dataView = {
                      score: attributes.field_score,
                      label: attributes.name,
                      desc: attributes.field_description.value,
                      uuid: response.data.id,
                    }

                    var htmlSectionView = Mustache.render(sectionView, dataView);
                    $('.panel-section').append(htmlSectionView);
                  }
                });
              }
            }
          }
        });
        CKEDITOR.disableAutoInline = true;
        CKEDITOR.config.toolbar = configToolbar;
        CKEDITOR.replace('section-editor', {height: '100px'});
        sectionNumber = parseInt(sectionNumber) + 1;
        $(this).attr('data-number', sectionNumber);

      }
    });
  });

    // Add single choice question.
  $('.panel-section').on('click', '.btn-question', function(e) {
    e.preventDefault();
    var sectionNumber = $(this).attr('data-section-number');
    var questionType = $(this).attr('data-type');
    var dataForm = {
      number: sectionNumber,
    }
    var htmlQuestionForm = Mustache.render(questionForm, dataForm);
    bootbox.dialog({
      title: "Question information.",
      message: htmlQuestionForm,
      buttons: {
        success: {
          label: "Save",
          className: "btn-success",
          callback: function () {
            // Sample section.
            $.ajax({
              type: "GET",
              url: "/jsonapi/question/" + questionType + "/c329b384-c6da-4840-ae31-ec414293cace",
              dataType: 'json',
              success: function (response){
                var attributes = response.data.attributes;
                console.log(attributes);
                // var relationships = response.data.relationships;
                $('.select-question-category').val('536411a5-c50e-4fb8-b66d-5145f91acc99');
                $('.select-question-level').val('20f3eca2-c95d-4493-9d9a-496823928533');
                var dataView = {
                  score: '20',
                  description: attributes.field_question_desc.value,
                  uuid: response.data.id,
                  type: $('select[name="ans-type"]').val(),
                  question: questionType,
                }
                var htmlSectionView = Mustache.render(questionScPreview, dataView);
                $('[data-section-id=' + sectionNumber + ']').find('.list-question').append(htmlSectionView);
              }
            });
          }
        }
      }
    });
    CKEDITOR.disableAutoInline = true;
    CKEDITOR.config.toolbar = configToolbar;
    CKEDITOR.replace('question-editor', {height: '100px'});

    var optionCategory = '';
    $.ajax({
      type: "GET",
      url: "/jsonapi/taxonomy_term/question_category",
      dataType: 'json',
      success: function (response){
        var data = response.data;
        $.each(data, function(index, value) {
          optionCategory += '<option value="' + value.id + '">' + value.attributes.name + '</option>'
        });
        $('.select-question-category').append(optionCategory);
      }
    });

    var optionLevel = '';
    $.ajax({
      type: "GET",
      url: "/jsonapi/taxonomy_term/question_level",
      dataType: 'json',
      success: function (response){
        var data = response.data;
        $.each(data, function(index, value) {
          optionLevel += '<option value="' + value.id + '">' + value.attributes.name + '</option>'
        });
        $('.select-question-level').append(optionLevel);
      }
    });
    $('.select-search').select2();
  });

  $('.panel-section').on('click', '.btn-add-ans', function(e){
    var uuid = $(this).attr('data-uuid');
    var type = $(this).attr('data-type');
    var questionType = $(this).attr('data-question-type');
    var dataForm = {
      uuid: uuid,
    }

    var ansInput = null;
    var ansView = null;
    switch (questionType) {
      case 'single_choice':
        ansInput = radioInput;
        ansView = ansSC;
        break;

      case 'multiple_choice':
        ansInput = checkboxInput;
        ansView = ansMC;
        break;

      case 'question_ordering':
        ansInput = textInput;
        ansView = ansQS;
    }

    if (type == 'text') {
      var htmlAnsText = Mustache.render(ansTextForm, dataForm, {
        ansInput: ansInput,
      });
    }
    if (type == 'image') {
      var htmlAnsText = Mustache.render(ansImageForm, dataForm, {
        ansInput: ansInput,
      });
    }

    bootbox.dialog({
      title: "Add new answer.",
      message: htmlAnsText,
      buttons: {
        success: {
          label: "Save",
          className: "btn-success",
          callback: function () {
            // Ajax call back update question.
            // $.ajax({});
            var desc = $('input[name="ans-desc"]').val();
            var value = $('input[name="ans-value"]').val();
            dataView = {};
            var htmlAnsView = Mustache.render(ansView, dataView);
            $('li[data-uuid=' + uuid + '] .form-group').append(htmlAnsView);
          }
        }
      }
    });
    if (type == 'image') {
      $('input.file-input').fileinput({
        browseLabel: 'Browse',
        browseIcon: '<i class="icon-file-plus"></i>',
        uploadIcon: '<i class="icon-file-upload2"></i>',
        removeIcon: '<i class="icon-cross3"></i>',
        layoutTemplates: {
            icon: '<i class="icon-file-check"></i>',
            modal: modalTemplate
        },
        initialCaption: "No file selected",
        previewZoomButtonClasses: previewZoomButtonClasses,
        previewZoomButtonIcons: previewZoomButtonIcons,
        fileActionSettings: fileActionSettings
      });
    }
  });

  $('.panel-section').on('change', 'select[name="ans-type"]', function(e){
  });

  // Event upload file.
  $('.panel-section').on('click', '.fileinput-upload', function(e) {
    e.preventDefault();
    console.log('okey');
  });

  // Submit single choice question.
  $('.panel-section').on('click', '.btn-sc', function (e) {
    e.preventDefault();
    var form = $(this).closest('form'), data = {};
    var ansDesc = [];
    var ansValue = [];
    form.find('[name]').each(function (i, v) {
      var name = $(this).attr('name');
      if (name.indexOf('ans-desc') != -1) {
        ansDesc.push($(this).val());
        data[name] = ansDesc;
      } else if (name.indexOf('ans-value') != -1) {
        ansValue.push($(this).val());
        data['ans_value'] = ansValue;
      } else {
        var input = $(this),
          value = input.val();
          data[name] = value;
      }

    });

    // Data mapping.
    var postData = {
      "data": {
        "type": "question--single_choice",
        "attributes": {
          "field_answer_type": {
            "value": "text"
          },
        },
        "relationships": {}
      }
    };
    if (data) {
      $.each(data, function(index, value) {
        postData.data.attributes.question_id = "tmp";
        if (index.indexOf('level-') != -1) {
          postData.data.relationships.field_level = {"data": {"type": "taxonomy_term--question_level", "id": value}};
        }
        if (index.indexOf('cat-') != -1) {
          var cat = [];
          $.each(value, function(i, v) {
            cat.push({"type": "taxonomy_term--question_category", "id": v});
          });
          postData.data.relationships.field_question_category = {"data": cat};
        }
        if (index.indexOf('question-desc-') != -1) {
          var id = $('textarea[name="'+ index +'"]').attr('id');
          postData.data.attributes.field_question_desc = {"value": CKEDITOR.instances[id].getData(), "format": "full_html"}
        }

        if (index.indexOf('ans-desc-') != -1) {
          var ansItems = [];
          $.each(value, function(i, v) {
            ansItems.push({'value': v, 'value2': data.ans_value[i]});
          });
          postData.data.attributes.field_answer_items = ansItems;
        }
      });
    }

    // Post single question.
    $.ajax({
      type: "POST",
      url: "/oauth/token",
      data: {
        grant_type: "password",
        client_id: "e9e4dfe3-2242-4890-9348-f4e7a213ab06",
        client_secret: "easy-quiz-app",
        username: "admin",
        password: "admin"
      },
      success: function (response){
        $.ajax({
          type: "POST",
          url: "/jsonapi/question/single_choice",
          dataType: 'json',
          headers: {
            "Accept": "application/vnd.api+json",
            "Content-Type": "application/vnd.api+json",
          },
          data: JSON.stringify(postData),
          beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", 'Bearer ' + response.access_token);
          },
          success: function (response2){
            var tmpData = {
              id: response2.data.id,
              description: postData.data.attributes.field_question_desc.value,
              ansList: postData.data.attributes.field_answer_items,
            };

            var htmlSC = Mustache.render(questionScPreview, tmpData);
            $('.sortable_questions').append(htmlSC);
          },
          error: function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(errorThrown);
          }
        });
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        console.log(errorThrown);
      }
    });
  });

});

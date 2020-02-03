$(function () {
  var quiz = {
    quiz_title: 'Quiz title here',
    quiz_description: '<p>Description of quiz here</p>',
    quiz_sections: []
  };

  var quizTpl = {};
  var sectionTpl = {};
  var questionFormTpl = {};
  var questionPrevTpl = {};

  $.get('templates/quiz.form.html', null, function (tpl) {
    quizTpl = tpl;
    renderQuiz(quizTpl, quiz, '#quiz-form');
  });

  $.get('templates/section.form.html', null, function (tpl) {
    sectionTpl = tpl;
  });

  $('#quiz-form').on('click', '#add-more-section', function (e) {
    e.preventDefault();

    var total = quiz.quiz_sections.length;
    quiz.quiz_sections.push({
      section_id: total ? total : 0,
      section_name: 'Section name',
      section_description: '',
      section_questions: []
    });

    renderSections();
  });

  $('#quiz-form').on('click', '.add-more-question button', function (e) {
    e.preventDefault();
    var section_id = $(this).closest('.panel').data('id');
    var question_type = $(this).data('type');

    renderQuestionForm({}, question_type, section_id);
  });

  $('#quiz-form').on('submit', '.questions-list li.form-add form', function (e) {
    e.preventDefault();
    var section_id = $(this).closest('.panel').data('id');

    var form = $(this),
      data = {};

    form.find('[name]').each(function (i, v) {
      var input = $(this),
        name = input.attr('name'),
        value = input.val();
      data[name] = value;
    });

    quiz.quiz_sections[section_id].section_questions.push(data);
    renderSections();
  });

  function renderQuiz(tpl, q, selector) {
    $(selector).html('');
    $.tmpl(tpl, q).appendTo(selector);
    CKEDITOR.disableAutoInline = true;
    CKEDITOR.inline('quiz-description');
  }

  function renderSections() {
    var selector = '#quiz-form #quiz-list-sections';
    $(selector).html('');

    if ($.isEmptyObject(sectionTpl)) {
      $.get('templates/section.form.html', null, function (tpl) {
        sectionTpl = tpl;
        $.tmpl(tpl, quiz.quiz_sections).appendTo(selector);

        $.each(quiz.quiz_sections, function (section_id, questions) {
          $.each(questions.section_questions, function (_, question) {
            renderQuestions(question, question.question_type, section_id);
          });
        });
      });
    }
    else {
      $.tmpl(sectionTpl, quiz.quiz_sections).appendTo(selector);

      $.each(quiz.quiz_sections, function (section_id, questions) {
        $.each(questions.section_questions, function (_, question) {
          renderQuestions(question, question.question_type, section_id);
        });
      });
    }
  }

  function renderQuestionForm(question, question_type, section_id) {
    var selector = '#quiz-form #section-' + section_id + ' .questions-list li.form-add';
    $(selector).html('');

    if ($.isEmptyObject(questionFormTpl[question_type])) {
      $.get('templates/questions/' + question_type + '/question.form.html', null, function (tpl) {
        questionFormTpl[question_type] = tpl;
        $.tmpl(tpl, question).appendTo(selector);

        $(selector).find('[contenteditable]').each(function () {
          if ($(this).attr('id')) {
            CKEDITOR.disableAutoInline = true;
            CKEDITOR.inline($(this).attr('id'));
          }
        });
      });
    }
    else {
      $.tmpl(questionFormTpl[question_type], question).appendTo(selector);

      $(selector).find('[contenteditable]').each(function () {
        if ($(this).attr('id')) {
          CKEDITOR.disableAutoInline = true;
          CKEDITOR.inline($(this).attr('id'));
        }
      });
    }
  }

  function renderQuestions(question, question_type, section_id, view_mod = 'preview') {
    var selector = '#quiz-form #section-' + section_id + ' .questions-list li.form-add';

    if ($.isEmptyObject(questionPrevTpl[question_type])) {
      $.get('templates/questions/' + question_type + '/question.' + view_mod + '.html', null, function (tpl) {
        questionPrevTpl[question_type] = tpl;

        $.tmpl(tpl, question).insertBefore(selector);
      });
    }
    else {
      $.tmpl(questionPrevTpl[question_type], question).insertBefore(selector);
    }
  }
});

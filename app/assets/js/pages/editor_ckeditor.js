/* ------------------------------------------------------------------------------
*
*  # CKEditor editor
*
*  Specific JS code additions for editor_ckeditor.html page
*
*  Version: 1.0
*  Latest update: Aug 1, 2015
*
* ---------------------------------------------------------------------------- */

$(function() {

    // Full featured editor
    CKEDITOR.replace( 'editor-full', {
        height: '400px',
        extraPlugins: 'forms'
    });

    // Inline editor
    // ------------------------------

    // We need to turn off the automatic editor creation first
    CKEDITOR.disableAutoInline = true;

    // Attach editor to the area
    var editor3 = CKEDITOR.inline('editor-inline');

});

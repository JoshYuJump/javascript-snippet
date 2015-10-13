/*
* File: casperjs utility for web pages
* Author: Box, Yu (Josh.Yu)
* Date: 2015-10-12
* Usage:
*   1. include this file using <script src='...'> tag.
*   2. add class 'casper-label' to the element which you want to capture
* dependence:
*   jQuery 1.8 +
*/

(function(){
    var $ = jQuery.noConflict();
    $(function(){
        // alert('document is ready!');
        $('.casper-label').each(function(index, element){
            $(element).addClass('casper-label-' + (index + 1));
        })
    })
})();


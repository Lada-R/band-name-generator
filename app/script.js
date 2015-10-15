'use strict';
$(function()
{
  var resultString = '';
  $('button#name').click(function()
  {

    var response = $.get('/adjective', null, function(data)
    {
      resultString += ' ' + data.word;
      $('#newName').text(resultString);
    }, 'json');

    response = $.get('/noun', null, function(data)
    {
      resultString += ' ' + data.word;
      $('#newName').text(resultString);
    }, 'json');

    response = $.get('/verb', null, function(data)
    {
      resultString += ' ' + data.word;
      $('#newName').text(resultString);
    }, 'json');
  });

  $('#submitWordsAdjective').on('submit', function(e)
  {
    e.preventDefault();
    var adjective = $('input[name=adjective]').val();
    var adjPost;
    if (adjective) {
      adjPost = {word: adjective};
      $.post('/adjective', adjPost, function(response) {
        var adjectiveRes = response.msg;
        $('#newWordInfo').text(adjectiveRes);
      }, 'json');
    }
  });

  $('#submitWordsNoun').on('submit', function(e)
  {
    e.preventDefault();
    var noun = $('input[name=noun]').val();
    var nounPost;
    if (noun) {
      nounPost = {word: noun};
      $.post('/noun', nounPost, function(response) {
        var nounRes = response.msg;
        $('#newWordInfo').text(nounRes);
      }, 'json');
    }
  });

  $('#submitWordsVerb').on('submit', function(e)
  {
    e.preventDefault();
    var verb = $('input[name=verb]').val();
    var verbPost;
    if (verb) {
      verbPost = {word: verb};
      $.post('/verb', verbPost, function(response) {
        var verbRes = response.msg;
        $('#newWordInfo').text(verbRes);
      }, 'json');
    }
  });
});

$(function(){

  function buildPost(post){
    var message = post.content ? `<p class="lower-message__content">${post.content}</p>` : '';
    var image = post.image ? `${post.image}` : '';

    var html = `<div class="main__contents-user" data-messageid="${post.id}">
                  <div class="main__contents-user-title">
                    <div class="main__contents-user-title-name">
                      ${post.name}
                    </div>
                    <div class="main__contents-user-title-posttime">
                      ${post.created_at}
                    </div>
                  </div>
                  <div class="main__contents-user-message">
                      ${message}
                      <img class="lower-message__image" src="${image}">
                  </div>
                </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(post){
      var html = buildPost(post);
      $('.main__contents').append(html)
      $('.main__contents').animate({ scrollTop: $('.main__contents')[0].scrollHeight});
      $('.form__submit').prop('disabled', false);
      $('#new_message')[0].reset();
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    })
  })
  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      var last_message_id = $('.main__contents-user:last').data('messageid');
      $.ajax({
        url: 'api/messages',
        type: 'GET',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        if (messages) {
          messages.forEach(function(message) {
            var insertHTML = buildPost(message)
            $('.main__contents').append(insertHTML);
            $('.main__contents').animate({scrollTop: $('.main__contents')[0].scrollHeight}); 
          });
        }
      })
      .fail(function() {
      });
    }
  };
  setInterval(reloadMessages, 7000);
});


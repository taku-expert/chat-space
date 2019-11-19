$(function(){
  function buildPost(post){
    var message = post.content ? `<p class="lower-message__content">${post.content}</p>` : '';
    var image = post.image ? `${post.image}` : '';

    var html = `<div class="main__contents-user">
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
                      ${image}
                  </div>
                </div>`
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
    console.log($('#new_message'))
    $.ajax({
      url: url,  //同期通信でいう『パス』
      type: 'POST',  //同期通信でいう『HTTPメソッド』
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

});


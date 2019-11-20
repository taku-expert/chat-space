$(function(){
  function addUser(username, user_id) {
    var html = `
              <div class="chat-group-user clearfix">
                <p class="chat-group-user__name">
                  ${username}
                </p>
                <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user_id}" data-user-name="${username}">
                  追加
                </div>
              </div>
              `;
              $('#user-search-result').append(html);
  }
  function addNoUser() {
    var html = `
               <div class="chat-group-user clearfix">
                <p class="chat-group-user__name">ユーザーが見つかりません</p>
               </div>
               `;
               $('#user-search-result').append(html);
  }
  function  addDeleteUser(userName,userId){
    var html = `
            <div class='chat-group-user'>
              <input name='group[user_ids][]' type='hidden' value='${userId}'>
              <p class='chat-group-user__name'>${userName}</p>
              <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>
                削除
              </div>
            </div>
            `;
            $('#chat-group-users').append(html);
  }
  function addMember(userId) {
    let html = `<input value="${userId}" name="group[user_ids][]" type="hidden" id="group_user_ids_${userId}" />`;
    $(`#${userId}`).append(html);
  }
  $('#user-search-field').on('keyup', function() {
    $('#user-search-result').empty();
    var input = $('#user-search-field').val();
    $.ajax({
      type: 'GET',
      url: '/users',
      dataType: 'json',
      data: { keyword: input },
    })
      .done(function(users) {
        if (users.length !== 0 ) {
          users.forEach(function( user ) {
            var username = user.name
            var user_id = user.id
            addUser(username, user_id)
          });
        } else if (input.length == 0) {
          return
        } else {
          addNoUser()
        }
      })
      .fail(function() {
        alert("該当するユーザーが見当たりません。");
      });
  });
  $(document).on('click', '.chat-group-user__btn--add', function(){
    const userName = $(this).attr("data-user-name");
    const userId = $(this).attr("data-user-id");
    $(this)
      .parent()
      .remove();
    addDeleteUser(userName,userId);
    addMember(userId);
  });
  $(document).on('click', '.chat-group-user__btn--remove', function(){
    $(this)
      .parent()
      .remove();
  });
});
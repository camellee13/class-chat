$(function () {
  var COLORS = ['pink darken-1', 'indigo',
  'deep-orange darken-1', 'blue darken-2',
  'deep-purple', 'purple darken-1',
  'red darken-3','light-blue lighten-1'];

  var COLORS_TEXT = ['pink-text darken-1', 'indigo-text',
  'deep-orange-text darken-1', 'blue-text darken-2',
  'deep-purple-text', 'purple-text darken-1',
  'red-text darken-3', 'light-blue-text lighten-1'];

  //initialize variables
  var $chatTitle = $('#chat-title');
  var $memberList = $('#member-list');
  var $chatHistory = $('#chat-message');
  var $sendButton = $('#send-button');
  var $messageInput = $('#message-input');
  var $messages = $('.messages');
  var $myProfile = $('#my-profile');
  var $sendButton;
  var socket = io();
  var username;

  /* FOR PRIVATE CHATS */
  var pathArray = window.location.pathname.split('/');
  var base = pathArray[1];
  var id = pathArray[2];

  // $loginButton.click(function () {
  //   var username = $loginUsername.val();
  //   var password = $loginPassword.val();
  //   var info = {
  //     "username": username,
  //     "password": password
  //   }
  //   console.log(info);
  //   socket.emit('login', info);
  // });

  // $registerButton.click(function () {
  //   if (checking()) {
  //     var email = $registerEmail.val();
  //     var username = $registerUsername.val();
  //     var password = $registerPasword.val();
  //     var info = {
  //       "email": email,
  //       "username": username,
  //       "password": password
  //     }
  //     console.log(info);
  //     socket.emit('register', info);
  //   }
  // });

  // $registerConfirmPasword.on('input', function () {
  //   //checking();
  //   console.log("typing");
  // });
  
  function sendMessage() {
    message = $messageInput.val().trim();
    console.log(message);
    if (message) {
      $messageInput.val('');
      createChatMessage(message, username);
      socket.emit('new message', message);
    }
  }

  function createChatMessage(message, user) {
    var type = '';
    var align = '';
    var initial = user.charAt(0);

    if (user === username) {
      type = 'replies';
      align = 'text-right';
      order = '<b></b> <span>3:25 PM</span> <div class="user-avatar"><img avatar="' + user + '"></div></div>';
    } else {
      type = 'sent'
      order = '<div class="user-avatar"><img avatar="' + user + '"></div><b></b> <span>3:25 PM</span> </div>';
    }

    var $li = $(
      '<li class="' + type + '">' + 
      '<div class="message-header ' + align + '">' +
      order + '<p></p>' +
      '</li>'
    );

    $li.find('p').text(message);
    $li.find('b').text(user);
    LetterAvatar.transform1($li.find('img')[0]);
    postMessage($li);
  }

  function createChatMessage(message, user) {
    var type = '';
    var align = '';
    var initial = user.charAt(0);

    if (user === username) {
      type = 'replies';
      align = 'text-right';
      order = '<b></b> <span>3:25 PM</span> <div class="user-avatar"><img avatar="' + user + '"></div></div>';
    } else {
      type = 'sent'
      order = '<div class="user-avatar"><img avatar="' + user + '"></div><b></b> <span>3:25 PM</span> </div>';
    }

    var $li = $(
      '<li class="' + type + '">' + 
      '<div class="message-header ' + align + '">' +
      order + '<p></p>' +
      '</li>'
    );

    $li.find('p').text(message);
    $li.find('b').text(user);
    LetterAvatar.transform1($li.find('img')[0]);
    postMessage($li);
  }

  function userColor(user, forText) {
    var hash = 2;
    for (var i = 0; i < user.length; i++) {
      hash = user.charCodeAt(i) + (hash<<2);
    }
    var index = hash % COLORS.length;
    if (forText)
      return COLORS_TEXT[index];
    return COLORS[index];
  }

  function postMessage(el) {
    var $el = $(el);
    $messages.append($el);
    $messages[0].scrollTop = $messages[0].scrollHeight;
  }

  //Keyboard events
  $(window).keydown(function(event){
    if (event.which === 13) {  //'ENTER'
      event.preventDefault();
      //send chat
      sendMessage();
    }
  });

  $sendButton.click(function () {
    sendMessage();
  });

  //socket
  socket.on('connect', function(){
    console.log('socket connect');
    if (base === 'chats' && id) {
      if (id.length === 6) {
        roomId = id;
        console.log(id);
        $messages.empty();
        $memberList.empty();
        $messageInput.focus();
        socket.emit('load', roomId);
      }
    }else if (base === 'chats' && !id){
      //go to lobby?
    }
  });

  socket.on('load chat page', function(data){
    console.log('load chat page');
    console.log(data.roomId);
    console.log(data.roomName);
    console.log(data.userName);
    console.log(data.members);
    showUserList(data.members);
    username = data.userName;
    $toggle = '<div class="onoffswitch mx-auto"><input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch" checked><label class="onoffswitch-label" for="myonoffswitch"> <span class="onoffswitch-inner"></span> <span class="onoffswitch-switch"></span> </label></div>';
    $myProfile.html('<img avatar="' + data.userName + '"><p>' + data.userName + '</p>' + $toggle);
    LetterAvatar.transform1($myProfile.children()[0]);
    $chatTitle.html('<span class="badge-info badge-pill pincode-title" id="pincode-no">' + data.roomId + '</span>' + data.roomName);
  });

  socket.on('page does not exist', function () {
    alert("房間不存在!");
    window.location.href = '/';
  });

  socket.on('create virtual user', function (data) {
    alert(data);
    $loginUsername.val("");
    $loginPassword.val("");
  });

  socket.on('new message', function(data){
    if(data.type === "tradition"){
      createChatMessage(data.message, data.username);
    }else{
      createVoteMessage(data.message, data.username);
    }
  });

  socket.on('new user', function(data){
    console.log(data);
    addUserToList(data);
  });

});


  function showUserList(list){
    for (var i = 0 ; i < list.length; i++) {
      addUserToList(list[i]);
      // var $listElement = $("<li><img avatar='"+name+"'><span>"+name+"</span> </li>");
      // $('#member-list').append($listElement);
      // LetterAvatar.transform1($listElement.find('img')[0]);
    }
  }

  function addUserToList(name){
      var $listElement = $("<li><img avatar='"+name+"'><span>"+name+"</span> </li>");
      $('#member-list').append($listElement);
      LetterAvatar.transform1($listElement.find('img')[0]);
  }
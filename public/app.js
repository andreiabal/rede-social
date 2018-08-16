const database = firebase.database();
const USER_ID = getUserId();

$(document).ready(function() {
  getUserPostsFromDB();
  $('#publish').click(addPost);
  $('#friends').click(goToFriends)
});

function goToFriends() {
  window.location = "friends.html?userId=" + USER_ID;
}

function getUserId() {
  const queryString = window.location.search;
  const regExpForUserId = new RegExp(/\?userId=(.+)/);
  return queryString.match(regExpForUserId)[1];
}

function getUserPostsFromDB() {
  database.ref('posts/' + USER_ID).once('value')
  .then(function(snapshot) {
    renderPostsList(snapshot);
  });
}

function renderPostsList(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    const post = childSnapshot.val();
    createPostItem(post.text, childSnapshot.key);
  });
}

function addPostToDB(text, visibility) {
  return database.ref('posts/' + USER_ID).push({ 
    text: text,
    visibility: visibility,
  });
}

function deletePost(listItem, key) {
  deletePostFromDB(key);
  listItem.remove();
}

function deletePostFromDB(key) {
  database.ref(`posts/${USER_ID}/${key}`).remove();
}

function editPost(newText, listItemText, key) {
  listItemText.text(newText);

  database.ref(`posts/${USER_ID}/${key}`).update({
    text: newText
  })
}

function createPostItem(text, key) {
  $('#posts').prepend(`
    <li class="post" data-id=${key}>
      <span id="style-text" class="text"> ${text} </span>

      <div class="post-actions">
        <button data-id=${key} class="edit"> Editar </button>
        <button data-id=${key} class="delete"> Apagar </button>
      </div>
    </li>`
  );

  $(`.delete[data-id='${key}']`).click(function() {
    const listItem = $(`li[data-id='${key}']`);
    deletePost(listItem, key);
  });

  $(`.edit[data-id='${key}']`).click(function() {
    const newText = prompt(`Altere o seu texto: ${text}`);
    editPost(newText, $(`li[data-id=${key}] .text`), key);
  });
}

function addPost(event) {
  event.preventDefault();

  const postText = $('#post-input').val();
  const isVisibilityAll = $('#visibility-all').is(':checked');

  let visibility = ''

  if (isVisibilityAll) {
    visibility = 'all'
  } else {
    visibility = 'friends'
  }

  const isTextEmpty = postText === '';

  if (!isTextEmpty) {
    const newPost = addPostToDB(postText, visibility);
    const postId = newPost.getKey();

    createPostItem(postText, postId);
  }

  $('#post-input').val('');
}

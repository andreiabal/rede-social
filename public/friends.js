const database = firebase.database();
const USER_ID = getUserId();

$(document).ready(function() {
  getFriendsFromDB();

  $('#profile').click(goToProfile)
});

function goToProfile() {
  window.location = "app.html?userId=" + USER_ID;
}

function getUserId() {
  const queryString = window.location.search;
  const regExpForUserId = new RegExp(/\?userId=(.+)/);
  return queryString.match(regExpForUserId)[1];
}

function getFriendsFromDB() {
  database.ref('users').once('value')
  .then(function(snapshot) {
    renderUsersList(snapshot);
  });
}

function renderUsersList(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    const user = childSnapshot.val();
    createUserItem(user.email, childSnapshot.key);
  });
}

function createUserItem(text, key) {
  $('#friends-list').prepend(`
    <li class="user" data-id=${key}>
      <span class="text"> ${text} </span>

      <div class="user-actions">
      </div>
    </li>`
  );
}

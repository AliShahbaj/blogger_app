import consumer from "./consumer"

consumer.subscriptions.create("CommentChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
    console.log("Connected to the comment!");
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    let comment = data.comment;
    if(comment.parent_id){
      console.log($(`#replies_${comment.id}`))
    }
    else{
      $(`.post_${comment.post_id}`).append(`<div id="comment_${comment.id}"> <p class="m-0"><span>${comment.body} <a data-remote="true" href="/posts/7/comments/new?parent_id=${comment.id}">reply</a></span></p> <em>${comment.email} - ${comment.time}</em><div id="replies_${comment.id}"></div> <hr> </div>`);
      $(`#comment_${comment.id}`).after(`<div id="reply-form-${comment.id}"></div>`)
      document.getElementById(`comment_form_${comment.post_id}`).reset();
      document.getElementById(`sbmt_${comment.post_id}`).removeAttribute("disabled")
    }
    // Called when there's incoming data on the websocket for this channel
  }
});
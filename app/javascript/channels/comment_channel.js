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
    $(`.post_${comment.post_id}`).append(`<div id="comment_${comment.id}"> <p class="m-0"><span>${comment.body}</span></p> <em>${comment.email} - ${comment.time}</em> <hr> </div>`);
    $(`#comment_count`).html(`${comment.total_comments}`);
    document.getElementById(`comment_form_${comment.post_id}`).reset();
    document.getElementById(`sbmt_${comment.post_id}`).removeAttribute("disabled")
    // Called when there's incoming data on the websocket for this channel
  }
});
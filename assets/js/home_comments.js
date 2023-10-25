{
    //method to submit the form data for new comment using AJAX
    //create a function which sends the data to the comment_controller's action(create) using AJAX
    let createComment = function(){
        let  newCommentForm = $('#new-comment-form'); // get the post form
        //e.preventDefault() is used for to stop working of submit button that follows normally
        // i.e means when we click on submit button then flow goes to action="/create" this is normal flow 
        // but we want to stop this flow and want to working using AJAX method on the submit button

        newCommentForm.submit(function(e){
            e.preventDefault();
            // manually submit the form asynchronously 
            $.ajax({
                type:'POST',
                url:'/comments/create',
                data: newCommentForm.serialize(),  //convert form data to JSON

                //if req successfull then 
                success: function(data){
                   console.log("Comment Data:", data);  //JSON data 
                   let newComment = newCommentDom(data.data.comment); // now post is created 
                   new Noty({
                    theme: 'relax',
                    text: "Comment Created",
                    type: 'success',
                    layout: 'TopCenter',
                    timeout: 1500
                }). show();
                   // we need to add each post on div of "post-list-container" to <ul> tag and then looping 
                   //over multiple posts
                   // prepend jquery fn means adding a newly post  to top in the post-list-container
                   $('#post-comments-list >ul').prepend(newComment);
                   deleteComment($(' .delete-comment-button', newComment));
                },  
                error: function(error){
                    console.log(error.responseText);
                }

            });
        });
    }

    // method to create comment in DOM
    // we need a function which will help us in converting our(_comment.ejs) text of html into jquery Object
    // "comment" is reccieved from comment controllers

    // we have removed the if condtion bcs we have kept condtion in home.ejs
        let newCommentDom = function(comment){
            return $(`<li id="comment-${comment._id }">
            <p>
                <a href="/comments/destroy/${comment._id}">Delete Comment(X)</a>
             </small>
                     ${comment.content}
                     <br>
                     <small>
                         ${comment.user.name}
                     </small>
                 </p>
          </li>`);
        } 

        // method to delete a comment from DOM
        let deleteComment = function(deleteLink){   // this deletePost function gets the deleteLink
            $(deleteLink).click(function(e){     // when this deleteLink clicked its should not follow
                e.preventDefault();

                $.ajax({
                    type: 'GET',
                    url: $(deleteLink).prop('href'),
                    success: function(data){
                        console.log("Comment Id:", data.data);
                        $(`#comment-${data.data.comment_id}`).remove();
                        new Noty({
                            theme: 'relax',
                            text: "Comment Deleted",
                            type: 'success',
                            layout: 'TopCenter',
                            timeout: 1500
                        }). show();
                    }, error: function(error){
                            console.log(error.responseText);
                    }
                });
            })
        }

    createComment();
}
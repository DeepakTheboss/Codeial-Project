{
    //method to submit the form data for new post using AJAX
    //create a function which sends the data to the post_controller's action(create) using AJAX
    let createPost = function(){
        let  newPostForm = $('#new-post-form'); // get the post form
        //e.preventDefault() is used for to stop working of submit button that follows normally
        // i.e means when we click on submit button then flow goes to action="/create" this is normal flow 
        // but we want to stop this flow and want to working using AJAX method on the submit button

        newPostForm.submit(function(e){
            e.preventDefault();

            // manually submit the form asynchronously 
            $.ajax({
                type:'POST',
                url:'/posts/create',
                data: newPostForm.serialize(),  //convert form data to JSON

                //if req successfull then 
                success: function(data){
                   console.log("Data:", data);  //JSON data 
                   let newPost = newPostDom(data.data.post); // now post is created (post is key from 
                   // line no. 26 post controller.js) 
                   new Noty({
                    theme: 'relax',
                    text: "Post Created",
                    type: 'success',
                    layout: 'TopCenter',
                    timeout: 1500
                }). show();// neeraj walia
                   // we need to add each post on div of "post-list-container" to <ul> tag and then looping 
                   //over multiple posts
                   // prepend jquery fn means adding a newly post  to top in the post-list-container
                   $('#posts-list-container>ul').prepend(newPost);
                   deletePost($(' .delete-post-button', newPost)); //
                  // new PostComments(data.data.post._id);
                },  
                error: function(error){
                    console.log(error.responseText);
                }

            });
        });
    }

    // method to create post in DOM
    // we need a function which will help us in converting our(_post.ejs) text of html into jquery Object
    // "post" is reccieved from post controllers

    // we have removed the if condtion bcs we have kept condtion in home.ejs ans _post.ejs views 
        let newPostDom = function(post){
            return $(` <li id="post-${post._id }">
            <p>
                    <small>
                       <a class="delete-post-button" href="/posts/destroy/${post._id }">Delete Post(X)</a>
                    </small>
                   
        
                ${post.content}
                <br>
                <small>
                    ${post.user.name}
                </small>
            </p>
            <!-- showing commment form-->
            <div class="post-comments">
               
                    <form action="/comments/create" method="POST" id = "new-comment-form">
                        <input type="text" name="content" placeholder="type here to add comment..." id="type-comment" required>
                        <input type="hidden" name="post"  value=" ${post._id }" >
                        <input type="submit" value="Add Comment" id="add-comment">
                    </form>
                  
            </div>
            <!-- dsiplaying comments and author of comments-->
            <!-- for viewing the comments signedIn not required-->
            <div id = "post-comments-list">
                <ul id="post-comments- ${post._id }">
                </ul>
            </div>
        
        </li> `)
        } 

        // method to delete a post from DOM
        let deletePost = function(deleteLink){   // this deletePost function gets the deleteLink
            $(deleteLink).click(function(e){     // when this deleteLink clicked its should not follow
                e.preventDefault();

                $.ajax({
                    type: 'GET',
                    url: $(deleteLink).prop('href'),
                    success: function(data){
                        console.log("Post Id:", data.data);
                        $(`#post-${data.data.post_id}`).remove();  // post_id is coming from controller
                        new Noty({
                            theme: 'relax',
                            text: "Post deleted",
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

        // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
        // let convertPostsToAjax = function(){
        //     $('#posts-list-container>ul>li').each(function(){
        //         let self = $(this);
        //         let deleteButton = $(' .delete-post-button', self);
        //         deletePost(deleteButton);
    
        //         // get the post's id by splitting the id attribute
        //         let postId = self.prop('id').split("-")[1]
        //         new PostComments(postId);
        //     });
        // }
    createPost();
    //convertPostsToAjax();
}
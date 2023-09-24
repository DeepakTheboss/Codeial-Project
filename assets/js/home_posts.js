{
    //method to submit the form data for new post using AJAX
    //create a function which sends the data to the post_controller's action(create) using AJAX
    let createPost = function(){
        let  newPostForm = $('#new-post-form'); // get the post form
        // form data should not be submitted normally , we can submit the form data using AJAX,
        //So for that e.preventDefault() is used

        newPostForm.submit(function(e){
            e.preventDefault();


            // manually submit the form asynchronously 
            $.ajax({
                type:'post',
                url:'/posts/create',
                data: newPostForm.serialize(),  //convert form data to JSON

                //if req successfull then 
                success: function(data){
                   // console.log(data.data.post);  //JSON data 
                   let newPost = newPostDom(data.data.post);
                   $('#posts-list-container >ul').prepend(newPost);
                },
                error: function(error){
                    console.log(error.responseText);
                }

            })
        })
    }

    // method to create post in DOM
        let newPostDom = function(post){
            return $(` <li id="post- ${post._id } ">
            <p>
                <!-- deleting post in UI url-->
                <!-- locals.user is signedIn user & id of user who currently  signedIn == id of user who made a post-->
                <!-- post.user is user's id only but in ObjectId('98765432') form 
                and post.user.id is '98765987' string format-->
                
                    <small>
                       <a class="delete-post-button" href="/posts/destroy/ ${post._id }">Delete Post(X)</a>
                    </small>
                   
        
                ${post.content}
                <br>
                <small>
                    ${post.user.name}
                </small>
            </p>
            <!-- showing commment form-->
            <div class="post-comments">
               
                    <form action="/comments/create" method="POST">
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

    createPost();
}
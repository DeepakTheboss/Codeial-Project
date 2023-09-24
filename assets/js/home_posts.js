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
                   let newPost = newPostDom(data.data.post); // now post is created 
                   // we need to add each post on div of "post-list-container" to <ul> tag and then looping 
                   //over multiple posts
                   // prepend means adding a newly post post to top in the post-list-container
                   $('#posts-list-container >ul').prepend(newPost);
                },
                error: function(error){
                    console.log(error.responseText);
                }

            })
        })
    }

    // method to create post in DOM
    // we need a function which will help us in converting our(_post.ejs) text of html into jquery Object
    // "post" is reccieved from post controllers
        let newPostDom = function(post){
            return $(` <li id="post- ${post._id } ">
            <p>
               
                
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
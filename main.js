'use strict'
const $ = document.querySelector.bind(document)

function createComment(commentDoc,id){
    window.lasttimestamp=commentDoc.timestamp;
    var div = document.createElement('div');
    console.log(commentDoc);
    var textspan=div.appendChild(document.createElement("span"));
    textspan.innerText = commentDoc.comment;
    var editbutton = div.appendChild(document.createElement("button"));
    editbutton.innerText ="update";
    editbutton.onclick= async function(){
        var newcomment = prompt("updated messages");
        if (newcomment){
            stopListeningForLastestComment();
           await updateMessage (id, newcomment );
           textspan.innerText=newcomment;
           startListeningForLastestComment( createComment );

        }
    }
    div.onmousedown = function(e){
        var started = Date.now();
        div.onmouseup = function(e){
            if(Date.now()>started+3000){
                div.remove();
                deleteMessage(div.id);
            }
        }
    }
    $('#comments').appendChild(div);
    div.className = 'comment';
    div.id=id;
   /* div.addEventListener('mouseup',()=>{
        div.remove();
        deleteMessage(div.id);

    });*/
}


window.onload = function(){
    
    // check if user is logged in
    onLogin( user => {
        if(user){
            //user just logged in
            $('#comments').style.display = 'block';
            $('#addCommentDiv').style.display = 'block';
            $('#loginDiv').style.display = 'none';
            $('#signupDiv').style.display = 'none';
            forEachComment(createComment).then(()=>{
                startListeningForLastestComment( createComment );
            })
            
        }else{
            //user just logged out
            $('#comments').style.display = 'none';
            $('#loginDiv').style.display = 'block';
            $('#addCommentDiv').style.display = 'none';
        }
    });

    //show comments
    

    ////////////////////////////////
    // button and link functionality

    $('#loginLink').onclick = function(){
        $('#loginDiv').style.display = 'block';
        $('#signupDiv').style.display = 'none';
    }

    $('#signupLink').onclick = function(){
        $('#loginDiv').style.display = 'none';
        $('#signupDiv').style.display = 'block';
    }

    $('#slattbratha').onclick = function(){
        $('#comments').style.display = 'none';
        comments.innerHTML = '';
        logout();
    }

    $('#loginBtn').onclick = function(){
        login( $('#email').value, $('#password').value )
        .catch( err => $('.error').innerText = err.message );
    }

    $('#registerBtn').onclick = function(){
        signup( $('#emailReg').value, $('#passwordReg').value )
        .catch( err => $('.error').innerText = err.message );
    }

    $('#addCommentBtn').onclick = function(){

        addComment( $('#newComment').value )
        .then( () => {
         //  createComment({comment: $('#newComment').value});
            $('#newComment').value = '';
        })
        .catch( err => $('.error').innerText = err.message )
    }

    

}
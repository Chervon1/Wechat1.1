// OUR firebase File

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-auth.js";
import { getFirestore, addDoc, deleteDoc, getDocs, collection, onSnapshot, limit, query, where ,orderBy, serverTimestamp, doc, updateDoc} from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD_nUco0Zaw4xcrOo2rn_S_YbC82dP9inM",
    authDomain: "wechat-3f257.firebaseapp.com",
    projectId: "wechat-3f257",
    storageBucket: "wechat-3f257.appspot.com",
    messagingSenderId: "58679190398",
    appId: "1:58679190398:web:dac06fd8441060963c092f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
window.auth = getAuth();
const db = getFirestore(app);


window.signup = function(email, password){
    return createUserWithEmailAndPassword (auth, email, password);
}

window.isLoggedIn = function(){
    return auth.currentUser !== null;
}

window.login = function(email,password){
    return signInWithEmailAndPassword(auth, email, password);
}

window.logout = function(){
    auth.signOut();
}

window.onLogin = function( f ){
    onAuthStateChanged(auth, user => {
        f( user );
    });
}

//////////////////////////////////////////////

// exposed functionality for db
window.addComment = async function(comment){
    console.log(comment);
    return await addDoc( collection(db, "comments"), 
        {comment,timestamp: serverTimestamp()});

}

window.forEachComment = async function( f ){
    var docs = await getDocs( query(collection(db, "comments"), orderBy("timestamp")));
    console.log(docs);
    docs.forEach( doc => f(doc.data(), doc.id) );
    
}
///////////////////////////////////////////////

window.deleteMessage = function(comment){
    deleteDoc(doc(db,'comments', comment));
        console.log("Deleted");

}

window.startListeningForLastestComment = function(f){
    window.stopListeningForLastestComment = onSnapshot(
        query(collection(db,"comments"), where("timestamp",">", window.lasttimestamp),
        orderBy("timestamp","desc"), limit(1)), doc=> doc.forEach(doc => {
            var data = doc.data();
            if(data.timestamp)f(data, doc.id)}));
}
window.updateMessage = function(id, newComment){
    const update = doc(db,"comments",id)
    
    return updateDoc(update,{comment: newComment});

}

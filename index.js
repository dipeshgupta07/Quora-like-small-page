const express = require("express");
const app = express();
const port = 8080;
const { v4: uuidv4 } = require('uuid');
const path = require("path");
const methodOverride = require("method-override");

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));



let posts = [
    {
        id: uuidv4(),
        username: "dipeshgupta",
        content: "I like Coding !!",
        comments : [{
            cid: uuidv4(),
            cusername: "Coding",
            ccontent: "I dont like you back"

        }]
    },
    {
        id: uuidv4(),
        username: "aryansagar",
        content: "I love chicken !!"
    },
    {
        id: uuidv4(),
        username: "abhinavthakur",
        content: "I am hero !!"
    }
   
]



app.get("/posts", (req, res)=>{
    res.render("index.ejs", {posts});
    console.log("Server running ");
});
app.get("/posts/new", (req, res)=>{
    res.render("new.ejs");
});
app.post("/posts", (req, res)=>{
    let { username, content } = req.body;
    let id = uuidv4();
    posts.unshift({username, content, id});
    res.redirect("/posts")
    
});

app.patch("/posts/:id", (req, res)=>{
    let {id} = req.params;
    console.log(id);
    let newcontent = req.body.content;
    let post = posts.find((p) => id ===p.id);
    console.log(newcontent)
    post.content = newcontent;

    res.redirect("/posts")
    

})




app.get("/posts/:id", (req, res)=>{
    let {id} = req.params;
    let post = posts.find((p) => id ===p.id);
    res.render("post.ejs", {post});
});
app.get("/posts/:id/edit", (req, res) =>{
    let{id} = req.params;
    let post = posts.find((p) => id ===p.id);
    
    res.render("edit.ejs", {post});
})
app.delete("/posts/:id", (req, res)=>{
    let {id} = req.params;
    console.log(id);
    
    posts = posts.filter((p) => id !=p.id);
    
    

    res.redirect("/posts")
    

})

app.listen(port, ()=>{
    console.log(`Listening on port: ${port}`);
});
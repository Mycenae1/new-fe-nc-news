import { useEffect, useState } from "react";
import {  getCommentsdById } from "./api";
import {postComment} from "./api"
import { useParams } from "react-router-dom";

const CommentAdder = ({setCommentList}) => {

const [newComment, setNewComment] = useState('')
const {article_id} = useParams();


const handleSubmit = (event) => {
event.preventDefault();
postComment(article_id, newComment)
.then((comment) => {
    setCommentList((currentComments) => {
        return [comment,...currentComments]
        
    })
    
    setNewComment('')
})

};
    return (
        <section>
            <form onSubmit={handleSubmit}className="CommentAdder">
            <label htmlFor="newComment">Reply to Article</label>
            <br/>
            <br/>
             <textarea id="newComment"
            value={newComment}
            type="text"
            onChange={(event) => setNewComment(event.target.value)}
            ></textarea>
            <br/>
            <button>Add Comment</button>
            </form>
            
        </section>
    )
}

export default CommentAdder
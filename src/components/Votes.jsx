import { useEffect, useState } from "react";
import { patchArticleById } from "./api";

const Votes = ({votes, article_id}) => {
    const [changeVotes, setChangeVotes] = useState(0)

    

    const incVotes = () => {
        setChangeVotes((currentVotes) => currentVotes +1)
        patchArticleById(article_id, +1)
    }

    const decVotes = () => {
        setChangeVotes((currentVotes) => currentVotes -1)
        patchArticleById(article_id, -1)
    }



    return (
        <section>
            <button disabled={changeVotes === +1} onClick={() => incVotes()}>👍</button>
            <h2>{votes + changeVotes}</h2>
            <button disabled={changeVotes === -1} onClick={() => decVotes()}>👎</button>
        </section>

    );
}







export default Votes
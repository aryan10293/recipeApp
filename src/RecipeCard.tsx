import LikeButton from "./LikeButton";

const RecipeCard = () => {

    return ( 
    <div className="recipe-card">
        <div className="left-side">

            <div className="left-top">
                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.washingtonpost.com%2Fresizer%2FbQSMEsuJvnR6VCoiAqM0OGK7qzA%3D%2Farc-anglerfish-washpost-prod-washpost%2Fpublic%2FHN5GC63R3USHK3METQVBXHUMZA.jpg&f=1&nofb=1&ipt=048aa13968426cef9d419a263b38069ce48a7dc621b273bc15f7a4fe6fe20052&ipo=images"/>
            </div>
{/*             <div className="left-bottom">
                <LikeButton/>
            </div> */}

        </div>
        <div className="right-side">

            <div className="right-top">

            </div>
            <div className="right-bottom">

            </div>

        </div>

    </div>
     );
}
 
export default RecipeCard;
import useFetch from "./useFetch";

interface GetCommentsProps{
    postId:string
}


const GetComments = () => {

    const {comments} = useFetch('http://localhost:2030/')

    return ( 
        <div>

        </div>
     );
}
 
export default GetComments;
import useFetch from "./useFetch";

const RecipeList = () => {

    type Recipe = {
        name:string;
        id:number;
    }

    const {data:recipes} = useFetch<Recipe[]>('http://localhost:2020/')
     


    return ( 
        <div>
            {/* {recipes && (recipes as Recipe[]).map((recipe)=>(
                <div key={recipe.id}>
                    <h2>{recipe.name}</h2>
                </div>
            ))} */}
        </div>
     );
}
 
export default RecipeList;
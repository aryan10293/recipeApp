
interface Nutrition{
    fats:number,
    carbs:number,
    protein:number,
    calories:number,
    servings:number,
}

interface Nutri{
    handle:void,
    calories:string,
    protein: string,
    carbs: string,
    fats: string
}

const NutritionCard:React.FC<Nutri> = ({fats,protein,carbs,handle,calories}) => {


    return ( 
        <div className="nutrition-container">
            <div className="header">
                <h2>Nutritions</h2>
            </div>
            <hr />
            <div className="bottom">
                <div className="left">
                    <div className="nutrient">
                        <h3>Calories</h3>
                        <h3>Fats</h3>
                    </div>
                    <div className="nutrient-value">
                        <h3>{calories}</h3>
                        <h3>{fats}</h3>
                    </div>
                </div>
                <div className="right">
                    <div className="nutrient">
                        <h3>Protein</h3>
                        <h3>Carbs</h3>
                    </div>
                    <div className="nutrient-value">
                        <h3>{protein}</h3>
                        <h3>{carbs}</h3>
                    </div>
                </div>
            </div>
            <div className="button-div">
                <button onClick={handle}>Recipe Card</button>
            </div>

        </div>
     );
}
 
export default NutritionCard;
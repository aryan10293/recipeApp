
interface Nutrition{
    fats:number,
    carbs:number,
    protein:number,
    calories:number,
    servings:number,
}

interface Nutri{
    handle:void
}

const NutritionCard = ({handle}) => {


    return ( 
        <div className="nutrition-container">
            <div className="header">
                <h2>Nutritions</h2>
            </div>
            <div className="bottom">
                <div className="left">
                    <div className="nutrient">
                        <h3>Calories</h3>
                        <h3>Fats</h3>
                    </div>
                    <div className="nutrient-value">
                        <h3>120g</h3>
                        <h3>12g</h3>
                    </div>
                </div>
                <div className="right">
                    <div className="nutrient">
                        <h3>Protein</h3>
                        <h3>Carbs</h3>
                    </div>
                    <div className="nutrient-value">
                        <h3>20g</h3>
                        <h3>40g</h3>
                    </div>
                </div>
            </div>
            <button onClick={handle}>Front Side</button>
        </div>
     );
}
 
export default NutritionCard;
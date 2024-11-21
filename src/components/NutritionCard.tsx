import {motion, transform} from 'framer-motion'

interface Nutrition{
    fats:number,
    carbs:number,
    protein:number,
    calories:number,
    servings:number,
}

interface Nutri{
    handle: (e: React.MouseEvent<HTMLButtonElement>) => void,
    calories:string | number,
    protein: string | number,
    carbs: string | number,
    fats: string | number
}

const NutritionCard:React.FC<Nutri> = ({fats,protein,carbs,handle,calories}) => {


    return ( 
        <motion.div 
        initial={{transform:'rotateX(90deg)'}}
        animate={{transform:'rotateX(0deg)'}}
        transition={{duration:0.3}}
        className="nutrition-container">
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

        </motion.div>
     );
}
 
export default NutritionCard;
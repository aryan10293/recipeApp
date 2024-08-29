import React from 'react'
import { json, Link } from 'react-router-dom';
import RecipeItem from '../../components/RecipeItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';
const Home: React.FC = () => {
    const [userId, setUserId] = React.useState<string>('')
    const [ingridentList, setIngridentList] = React.useState<string[]>([])
    const [levelOfMeal, setLevelOfMeal] = React.useState<string>('')
    const [title, setTitle] = React.useState<string>('')
    const [prepTime, setPrepTime] = React.useState<number>()
    const [postData, setPostData] = React.useState<any[]>([])
    interface Obj{
        userId:string,
    }
    const likeObj: Obj = {
        userId : userId
    }
    React.useEffect(() => {
        const getUser = async() => {
            const checkUser = await fetch(`http://localhost:2020/getuser/${localStorage.getItem('token')}`, {
                method:'GET',
                headers: {'Content-Type': 'application/json'}
            })
            const userData = await checkUser.json()
            setUserId(userData.userinfo[0]._id)
        }
        getUser()
    }, [])
    const getAllPost = async () => {
          try {
              const response = await fetch('http://localhost:2020/getallpost', {
                  method: "GET",
                  headers: { 'Content-Type': 'application/json' },
              });
              const data = await response.json();
              console.log(data);
              setPostData([...data.post].reverse()); 
          } catch (error) {
              console.error('Error fetching posts:', error);
          }
      };
        React.useEffect(() => {
        getAllPost(); 
    }, []);
    interface CreateRecipeInfo{
      title:string,
      userId:string,
      ingridentList: string[],
      levelOfMeal: string,
      prepTime: number,
      pictureOfFood: any
    }
    const createRecipeInfo: CreateRecipeInfo = {
      userId:userId,
      title:title,
      ingridentList: ingridentList,
      levelOfMeal: levelOfMeal,
      prepTime: prepTime || 0,
      pictureOfFood: ''
    }
    const handleSumbit = async (e:any) => {
      e.preventDefault()
      let img = e.target.childNodes[3].childNodes[1].files[0]
      img = await convertBase64(img)
      createRecipeInfo.pictureOfFood = img
      const postRecipe = await fetch('http://localhost:2020/createrecipe', {
        method:"POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(createRecipeInfo),
      })
      console.log(createRecipeInfo, 1)
      const recipeData = await postRecipe.json()
      getAllPost()
    }
    const handleLikes =  async (e:any) => {
        // make sure to set type strictness to "e". im to lazy to do so right now
        e.preventDefault()
        const postId = e.currentTarget.getAttribute('data-id')
        const thumbsUpOrDown = e.currentTarget.getAttribute('data-icon')
        let likeOrUnlikePost: string = ''
        if ( thumbsUpOrDown === 'thumbs-down') {
          likeOrUnlikePost = 'unlikepost'
        } else  if(thumbsUpOrDown === 'thumbs-up'){
          likeOrUnlikePost = 'addliketopost'
        } else {
          alert('error')
        }
        const handleLike = await fetch(`http://localhost:2020/${likeOrUnlikePost}/${postId}`, {
            method:'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(likeObj)
        })
        const likeData = await handleLike.json()
        getAllPost()
        console.log(likeData)
    }
    const addIngrident = (e:any) => {
      let ingrident:string = e.target.parentElement.childNodes[1].value
      setIngridentList([...ingridentList, ingrident])
      e.target.parentElement.childNodes[1].value = ''
      // things to add onto this later
      // display ingridents added
      // delete indridents added by accident 
      // edit typos 
      // add measurings 
    }

    // adds images, sends to backend and uploads to cloudinary
    const convertBase64 = (file: any) => {
      return new Promise(async (resolve, reject) => {
        try {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);

          fileReader.onload = () => {
            resolve(fileReader.result);
          };

          fileReader.onerror = (error) => {
            reject(error);
          };
        } catch (error) {
          reject(error);
        }
      });
    };
    console.log(postData)
  return (
    <div>
      <form onSubmit={handleSumbit}>
        <div>
            <label htmlFor="nameOfMEal">Name of Meal</label>
            <input onChange={(e:React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} type="text" />
        </div>
        <div>
            <label htmlFor="nameOfMEal">Cooking Diffculty</label>
            <input onChange={(e:React.ChangeEvent<HTMLInputElement>) => setLevelOfMeal(e.target.value)} type="text" />
        </div>
        <div>
            <label htmlFor="nameOfMEal">ingrident list</label>
            <input type="text" />
            <p onClick={addIngrident}>Add Ingrident</p>
        </div>
        <div>
            <label htmlFor="nameOfMEal">Add Picture Of Food</label>
            <input type="file" />
        </div>
        <button type='submit'>postRecipe</button>
      </form>
            <div>
        {postData.map((x:any, i:number) => {
          return (
            <>
              <li style={{ 
                      border: '1px solid #ccc', 
                      borderRadius: '5px', 
                      padding: '15px', 
                      margin: '10px 0', 
                      listStyleType: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                  }}>
                <Link to={`/comment/${x._id}`}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                      <img 
                      src={x.image} 
                      alt={title} 
                      style={{ 
                          width: '100px', 
                          height: '100px', 
                          objectFit: 'cover', 
                          borderRadius: '5px', 
                          marginRight: '15px' 
                      }} 
                      />
                      <div>
                          <h3 style={{ 
                              margin: '0 0 10px 0', 
                              fontSize: '1.2em', 
                              color: '#333' 
                          }}>{x.nameOfDish}</h3>
                          <p style={{ 
                              margin: '0 0 10px 0', 
                              fontSize: '0.9em', 
                              color: '#777' 
                          }}>Difficulty: {x.levelOfMeal}</p>
                          <ul style={{ 
                                  padding: '0', 
                                  margin: '0', 
                                  listStyleType: 'disc', 
                                  paddingLeft: '20px' 
                              }}>
                              {x.ingridentList.map((ingredient:string, index:number) => (
                              <li key={index} style={{ 
                                  fontSize: '0.9em', 
                                  color: '#555' 
                              }}>
                                  {ingredient}
                              </li>
                              ))}
                          </ul>
                      </div>
                  </div>
                </Link>
                <div style={{ display: 'flex', alignItems: 'center' }} >
                  <button 
                  style={{
                      background: 'none',
                      border: 'none',
                      color: '#007bff',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      marginRight: '10px',
                    
                  }}
                  >
                      {x.likes.includes(userId) ? (
                        <div onClick={handleLikes} data-id={x._id} data-icon='thumbs-down' ><FontAwesomeIcon   icon={faThumbsDown} style={{ marginRight: '5px' }}/></div>
                      ) : (
                        <div onClick={handleLikes} data-id={x._id} data-icon='thumbs-up' ><FontAwesomeIcon   icon={faThumbsUp} style={{ marginRight: '5px' }}/></div>
                      )}
                  {x.likes.length}
                  </button>
                  <FontAwesomeIcon 
                  icon={faBookmark} 
                  style={{
                      fontSize: '1.5em', 
                      color: '#007bff',
                      cursor: 'pointer'
                  }} 
                  />
              </div>
              </li>
            </>
          )
        })}
      </div>
    </div>
    
  );
};

export default Home

 // const newRecipe = {
        //     userId: req,
        //     image:{type: String, required: true},
        //     ingridentList:{type: String, required: true},
        //     levelOfMeal: {type: String, required: true},
        //     prepTime: {type:  Number, required: true},
        // }
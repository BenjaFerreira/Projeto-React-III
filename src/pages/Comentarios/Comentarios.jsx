import Header from '../../components/Header/Header'
import image from '../../assets/feedback.svg'
import {FiTrash2, FiPlus} from 'react-icons/fi'
import './comentarios.css'
import {useState, useEffect} from 'react'

function Comentarios(){
   const getLocalList = () =>{
      let items = localStorage.getItem('list')
      if(items){
         return JSON.parse(localStorage.getItem('list'))
      }else{
         return []
      }
   }

   const [list, setList] = useState([getLocalList])
   const [newIten, setNewIten] = useState('')

   function handleCreateNewIten(){
      const item ={
         id: Math.random(),
         title: newIten
      }
      if(item.title === ''){
         return
      }
      setList([...list, item])
      setNewIten('')

   }
   function handleRemoveItem(id){
      const itemsFiltered = list.filter(item => item.id !== id)
      setList(itemsFiltered)
   }

   useEffect(() => {
      localStorage.setItem('list', JSON.stringify(list))
   }, [list])

   return(
      <>
         <Header image={image} description="ilustracao mulher com estrelas ">Comentários e Feedbacks</Header>
         <section className="list">
            <header>
               <div className="input-container">
                  <input type="text" placeholder="Digite aqui" 
                  onChange={(e) => setNewIten (e.target.value)}
                  value={newIten} />
                  
                  <div className="add-container">
                     <button 
                        className="add-task" 
                        type='submit' 
                        onClick={handleCreateNewIten}
                     >
                        <FiPlus size={16} color="#FFFF"/>
                     </button>
                  </div>
               </div>
            </header>
            <main>
               <ul className="list-items">
                  {
                     list.map(item =>{
                        return(
                           <li key={item.id}>
                              <div>
                                 <p>{item.title}</p>
                              </div>
                              <button 
                                 className="remove-task" 
                                 type='button'
                                 onClick={() => handleRemoveItem(item.id)}
                              >
                                 <FiTrash2 size={16} />
                              </button>
                           </li>
                        )
                     })
                  }

               </ul>
            </main>
         </section>
      </>
   )
}
export default Comentarios

import axios from 'axios';
import { useEffect, useState } from 'react';

const App = () => {

  const [data, setData] = useState([]);
  const [pageNo,setPageNo] = useState(1);

  const getData = async() => {
    const response = await axios.get(`https://picsum.photos/v2/list?page=${pageNo}&limit=10`);
    setData(response.data);
  }

  const nextPage = () =>{
    setPageNo(pageNo+1);
    setData([]);
  }

  const prevPage = () =>{
    if(pageNo<1) return;
    setPageNo(pageNo-1);
    setData([]);
  }


  let content = <h3 className=' absolute top-1/2 left-1/2 text-2xl -translate-x-1/2 -translate-y-1/2'>Loading...</h3>

  if(data.length>0) {
    content = data.map(function(ele,ind){
      return <div key={ind}>
        <a href={ele.url} target="_blank">
          <img src={ele.download_url}
          className='h-60 w-60 object-cover rounded-xl' alt=''
          />
            <h1 className='font-bold text-center'>{ele.author}</h1>
        </a>
      </div>
    })
  }

  useEffect(function(){
    getData();
  },[pageNo])


  return (
    <div>
      <div className='flex h-[80vh] flex-wrap justify-center gap-5 m-5 '>
        {content}
      </div>


      <div className='flex justify-center'>
        <button  
          onClick={prevPage} 
          className='bg-red-500 m-2.5 p-5 rounded active:scale-95'
        >Prev</button>

        <button
          onClick={nextPage} 
          className='bg-red-500 my-2.5 p-5 rounded active:scale-95'
        >Next</button>
      </div>
    </div>

  );
}


export default App;
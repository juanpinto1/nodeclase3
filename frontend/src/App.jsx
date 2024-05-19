import axios from "axios";
import { useEffect, useState } from "react";
import Form from "./components/Form";
import Post from "./components/Post";

const urlBaseServer = "http://localhost:3000/api";

function App() {
  const [titulo, setTitulo] = useState("");
  const [imgSrc, setImgSRC] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      const response = await axios.get(urlBaseServer + '/likes/get-all');
      const { data } = response;

      if (Array.isArray(data.data)) {
        setPosts(data.data);
      } else {
        console.error('Expected array but got', data);
      }
    } catch (error) {
      console.error('Error fetching posts', error);
    }
  };

  const agregarPost = async () => {
    const post = { titulo, img: imgSrc, descripcion };
    await axios.post(urlBaseServer + "/likes/add", post);
    
    getPosts();
  };

  // este método se utilizará en el siguiente desafío
  const like = async (id) => {
    try {
    await axios.put(urlBaseServer + `/likes/${id}/like`);
    const updatedPosts = posts.map((post) => {
      if (post.id === id) {
        return { ...post, likes: post.likes + 1 };
      }
      return post;
    });
    setPosts(updatedPosts);
  } catch (error) {
    console.error('Error al dar like:', error);
  }
};

useEffect(() => {
  getPosts();
}, []);

  // este método se utilizará en el siguiente desafío
  const eliminarPost = async (id) => {
    await axios.delete(urlBaseServer + `/likes/${id}`);
    getPosts();
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="App">
      <h2 className="py-5 text-center">&#128248; Like Me &#128248;</h2>
      <div className="row m-auto px-5">
        <div className="col-12 col-sm-4">
          <Form
            setTitulo={setTitulo}
            setImgSRC={setImgSRC}
            setDescripcion={setDescripcion}
            agregarPost={agregarPost}
          />
        </div>
        <div className="col-12 col-sm-8 px-5 row posts align-items-start">
          {posts.map((post, i) => (
            <Post
              key={i}
              post={post}
              like={like}
              eliminarPost={eliminarPost}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

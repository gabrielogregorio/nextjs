import {useRouter} from 'next/router';
import Router from 'next/dist/next-server/lib/router/router';
import Layout from '../../components/layout';
import Title from '../../components/title';


export default function User({ user }){
    const router = useRouter();

    if (router.isFallback) {
      return <div>Aguarde, carregando página!</div>
    }

    return (
      <Layout>
        <Title>User ID: {user.id}</Title>
        <div className='card'>
          <h3>User</h3>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <p>Website: {user.website}</p>
        </div>

        <style jsx>
        {`
          .card {
            margin: 1rem;
            flex-basis: 45%;
            padding: 1.5rem;
            text-align: left;
            color: inherit;
            text-decoration: none;
            border: 1px solid #eaeaea;
            border-radius: 10px;
            transition: color 0.15s ease, border-color 0.15s ease;
          }
  
          .card:hover,
          .card:focus,
          .card:active {
            color: #0070f3;
            border-color: #0070f3;
          }
  
          .card h3 {
            margin: 0 0 1rem 0;
            font-size: 1.5rem;
          }
  
          .card p {
            margin: 0;
            font-size: 1.25rem;
            line-height: 1.5;
          }
        `}
      </style>
    </Layout>

  )
}

// Asignaction:
// criar rota dinamica de posts
// div
    // h2 -> Post Details
    // p -> Post ID: ${}
// div


// For static pages
// AVISO. CASO EXISTA UM LINK PARA UM DESTES USUARIOS
// QUE NAO ESTEJA AQUI, ESSA PÁGINA SERÁ RENDERIZADA
export async function getStaticPaths() {
  // para renderizar
  //const paths = [
  //  {params: {id: '1'}},
  //  {params: {id: '2'}}
  //];

  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const users = await res.json();

  const paths = users.map(user => {
    return {
      params: { id: `${user.id}` }
    }
  });
  
  return {
    paths,

    //True, gera uma página caso ela não esteja renderizada
    // False, renderiza somente links e as páginas especificas no path
    fallback: true
  }
}

export async function getStaticProps({ params }) {
  // context.params
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`);
  const user = await res.json();

  return {
    props: {
      user
    }
  }
}
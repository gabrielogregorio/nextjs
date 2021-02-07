import Title from '../components/title';
import Layout from '../components/layout';

export default function Home(){
    return(
      <Layout>
        <Title>Home Page</Title>
        <p>Aprendendo Next Js</p>
        <style>
        {`
          p {
            color: darkgray;
          }

          p:hover {
            color: darkblue;
          }
        `}
        </style>
      </Layout>
    )
}
import type { NextPage } from 'next'
import { Typography } from '@mui/material'
import { Layout } from '../componentes/layouts';

const Home: NextPage = () => {
  return (
  <Layout title='OpenJira - Home'>
    <Typography variant='h1' color={'primary'}>Hola Mundo</Typography>;
  </Layout>
)}

export default Home

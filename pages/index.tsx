import type { NextPage } from 'next'
import { Card, CardContent, CardHeader, Grid, Typography } from '@mui/material'
import { Layout } from '../componentes/layouts';
import { EntryList, NewEntry } from '../componentes/ui';

const Home: NextPage = () => {
  return (
    <Layout title="OpenJira - Home">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              height: 'calc(100vh - 100px)',
            }}
          >
            <CardHeader title="Pendientes" />
            <CardContent>
              <NewEntry />
              <EntryList status="pending" />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              height: 'calc(100vh - 100px)',
            }}
          >
            <CardHeader title="En Progreso" />
            <CardContent>
              {/*Agregar una nueva entrada */}
              <EntryList status="in-progress" />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card
            sx={{
              height: 'calc(100vh - 100px)',
            }}
          >
            <CardHeader title="Completadas" />
            <CardContent>
              {/*Agregar una nueva entrada */}
              <EntryList status="finished" />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );}

export default Home

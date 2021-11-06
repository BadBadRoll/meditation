import { FunctionComponent } from 'react'
import Icon from '@material-ui/core/Icon'
import Store from '@material-ui/icons/Store'
import Warning from '@material-ui/icons/Warning'
import DateRange from '@material-ui/icons/DateRange'
import LocalOffer from '@material-ui/icons/LocalOffer'
import Update from '@material-ui/icons/Update'
import Accessibility from '@material-ui/icons/Accessibility'
import { Avatar, Card, CardActions, CardContent, CardHeader, Grid, Table, TableHead, TableCell, TableBody, TableRow } from '@material-ui/core'

const Home: FunctionComponent = () => {
  return (
    <div>
      <Grid container>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color='warning' icon>
              <Avatar color='warning'>
                <Icon>content_copy</Icon>
              </Avatar>
              <p>Used Space</p>
              <h3>
                49/50 <small>GB</small>
              </h3>
            </CardHeader>
            <CardActions>
              <Warning />
              <a href='#pablo' onClick={(e) => e.preventDefault()}>
                Get more space
              </a>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color='success' icon>
              <Avatar color='success'>
                <Store />
              </Avatar>
              <p>Revenue</p>
              <h3>$34,245</h3>
            </CardHeader>
            <CardActions>
              <div>
                <DateRange />
                Last 24 Hours
              </div>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color='danger' icon>
              <Avatar color='danger'>
                <Icon>info_outline</Icon>
              </Avatar>
              <p>Fixed Issues</p>
              <h3>75</h3>
            </CardHeader>
            <CardActions>
              <div>
                <LocalOffer />
                Tracked from Github
              </div>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color='info' icon>
              <Avatar color='info'>
                <Accessibility />
              </Avatar>
              <p>Followers</p>
              <h3>+245</h3>
            </CardHeader>
            <CardActions>
              <div>
                <Update />
                Just Updated
              </div>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color='warning'>
              <h4 className='text-white mb-2'>Employees</h4>
              <p>
                New employees on 15th September, 2016
              </p>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      ID
                    </TableCell>
                    <TableCell>
                      Name
                    </TableCell>
                    <TableCell>
                      Country
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      1
                    </TableCell>
                    <TableCell>
                      Dakota Rice
                    </TableCell>
                    <TableCell>
                      Niger
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      1
                    </TableCell>
                    <TableCell>
                      Dakota Rice
                    </TableCell>
                    <TableCell>
                      Niger
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      1
                    </TableCell>
                    <TableCell>
                      Dakota Rice
                    </TableCell>
                    <TableCell>
                      Niger
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      1
                    </TableCell>
                    <TableCell>
                      Dakota Rice
                    </TableCell>
                    <TableCell>
                      Niger
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}

export default Home

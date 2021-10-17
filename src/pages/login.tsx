import { FunctionComponent } from "react";
// @material-ui/core components
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
import router from 'next/router'
// core components
import { Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, TextField } from "@material-ui/core";

const Login:FunctionComponent = () => {
  return (
    <div>
      <div
        className='min-h-full h-auto relative items-center flex justify-center'
        style={{
          backgroundImage: "url('/img/bg7.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className='z-2 relative pb-32'>
          <Grid container className='w-max' justify="center">
            <Grid item className='relative w-2/3 px-4'>
              <Card>
                <form className='py-10'>
                  <CardHeader color="primary" className='w-full text-center z-10 bg-purple -mt-8 px-4 mb-4' title='Login'>
                  </CardHeader>
                  <CardContent>
                    <TextField
                      label="Email..."
                      id="email"
                      fullWidth
                      className='my-4'
                      inputProps={{
                        type: "email",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className='bg-gray-300' />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TextField
                      label="Password"
                      id="pass"
                      fullWidth
                      className='my-4'
                      inputProps={{
                        type: "password",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className='bg-gray-300'>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off",
                      }}
                    />
                  </CardContent>
                  <Divider className='my-4' />
                  <CardActions className='w-full p-4 gap-4'>
                    <Button color="primary" fullWidth variant='text'>
                      Register
                    </Button>
                    <Button color="primary" fullWidth onClick={async () => await router.push('/')}>
                      Login
                    </Button>
                  </CardActions>
                </form>
              </Card>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}

export default Login

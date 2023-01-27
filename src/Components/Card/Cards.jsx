import React from "react"
import styles from "./Cards.module.css"
import { Card, CardContent, Typography, Grid } from "@mui/material"
import CountUp from "react-countup"
import cx from "classnames"

const Cards = ({ data: { cases, deaths, recovered, active } }) => {
  return (
    <div className={styles.container}>
      <Grid container spacing={3} justify='center'>
        <Grid
          item
          component={Card}
          className={cx(styles.card, styles.infected)}
        >
          <CardContent>
            <Typography color='textSecondary' gutterBottom>
              Infected
            </Typography>
            <Typography variant='h5'>
              <CountUp start={0} end={cases} duration={2} separator=',' />
            </Typography>
            <Typography color='textSecondary' gutterBottom>
              {new Date().toDateString()}
            </Typography>
            <Typography variant='body2'>
              Number of registered cases of Covid-19
            </Typography>
          </CardContent>
        </Grid>
        <Grid item component={Card} className={cx(styles.card, styles.active)}>
          <CardContent>
            <Typography color='textSecondary' gutterBottom>
              Active Cases
            </Typography>
            <Typography variant='h5'>
              <CountUp start={0} end={active} duration={2} separator=',' />
            </Typography>
            <Typography color='textSecondary' gutterBottom>
              {new Date().toDateString()}
            </Typography>
            <Typography variant='body2'>
              Number of Active cases of Covid-19
            </Typography>
          </CardContent>
        </Grid>
        <Grid
          item
          component={Card}
          className={cx(styles.card, styles.recovered)}
        >
          <CardContent>
            <Typography color='textSecondary' gutterBottom>
              Recovered
            </Typography>
            <Typography variant='h5'>
              <CountUp start={0} end={recovered} duration={2} separator=',' />{" "}
            </Typography>
            <Typography color='textSecondary' gutterBottom>
              {new Date().toDateString()}
            </Typography>
            <Typography variant='body2'>
              Number of Recoveries of Covid-19
            </Typography>
          </CardContent>
        </Grid>
        <Grid item component={Card} className={cx(styles.card, styles.deaths)}>
          <CardContent>
            <Typography color='textSecondary' gutterBottom>
              Deaths
            </Typography>
            <Typography variant='h5'>
              <CountUp start={0} end={deaths} duration={2} separator=',' />
            </Typography>
            <Typography color='textSecondary' gutterBottom>
              {new Date().toDateString()}
            </Typography>
            <Typography variant='body2'>
              Number of registered Deaths caused by Covid-19
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </div>
  )
}

export default Cards

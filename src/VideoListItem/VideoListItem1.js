import React, { Component } from 'react';

class VideolistItem1 extends Component {
  render() {
    return (
      <Card className={classes.card}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography variant="headline">Live From Space</Typography>
            <Typography variant="subheading" color="textSecondary">
              Mac Miller
            </Typography>
          </CardContent>
        <div className={classes.controls}>
          <IconButton aria-label="Previous">
            {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
          </IconButton>
          <IconButton aria-label="Play/pause">
            <PlayArrowIcon className={classes.playIcon} />
          </IconButton>
          <IconButton aria-label="Next">
            {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
          </IconButton>
        </div>
      </div>
      <CardMedia
        className={classes.cover}
        image="/static/images/cards/live-from-space.jpg"
        title="Live from space album cover"
      />
    </Card>
    );
  }
}

export default VideolistItem;

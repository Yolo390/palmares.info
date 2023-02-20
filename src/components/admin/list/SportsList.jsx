"use client";

import Link from "next/link";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const SportsList = ({ sport }) => {
  return (
    <Card variant="outlined" sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Sport
        </Typography>

        <Typography variant="h5" component="div">
          {sport?.name}
        </Typography>

        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {sport?.type}
        </Typography>
      </CardContent>

      <CardActions>
        <Link href={`/${sport.name}`}>
          <Button size="small">Learn More</Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default SportsList;

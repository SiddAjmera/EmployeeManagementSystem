import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

interface SearchNotFoundProps {
  searchQuery: string;
  [key: string]: any;
}

export default function SearchNotFound({
  searchQuery = "",
  ...other
}: SearchNotFoundProps) {
  return (
    <Paper {...other}>
      <Typography gutterBottom align="center" variant="subtitle1">
        Not found
      </Typography>
      <Typography variant="body2" align="center">
        No results found for &nbsp;
        <strong>&quot;{searchQuery}&quot;</strong>. Try checking for typos or
        using complete words.
      </Typography>
    </Paper>
  );
}

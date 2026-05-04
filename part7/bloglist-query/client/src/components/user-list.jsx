import { Link } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
} from '@mui/material'
import { useUsers } from '../hooks/useUsers'

const UserList = () => {
  const { users, isPending, isError } = useUsers()
  if (isPending) {
    return <div>Loading users...</div>
  }
  if (isError) {
    return <h1>Service currently unavailable due to server error...</h1>
  }
  const cellStyle = {
    textDecoration: 'none',
    color: 'inherit',
    display: 'block',
    width: '100%',
    py: 1,
  }
  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', mt: 3 }}>
      <TableContainer
        component={Paper}
        elevation={2}
        sx={{ borderRadius: 2, border: 1, borderColor: 'divider' }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                colSpan={3}
                align="center"
                sx={{ fontWeight: 'bold', fontSize: '1.25rem' }}
              >
                <Typography variant="h4" component="h2">
                  Userlist
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Username</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="right">
                Blogs #
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                sx={{
                  transition: 'background-color 0.15s',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                  cursor: 'pointer',
                }}
              >
                <TableCell>
                  <Box component={Link} to={`/users/${user.id}`} sx={cellStyle}>
                    {user.name}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box component={Link} to={`/users/${user.id}`} sx={cellStyle}>
                    {user.username}
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Box component={Link} to={`/users/${user.id}`} sx={cellStyle}>
                    {user.blogs.length}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default UserList

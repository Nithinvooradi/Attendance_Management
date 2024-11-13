import React, { useState } from 'react';
import { extendTheme, styled } from '@mui/material/styles';
import {
   Button, Container, Dialog, DialogActions, DialogContent,
  DialogTitle, TextField
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider, Navigation, Router } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,Tabs,Tab, Typography ,Box} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { PieChart } from '@mui/x-charts/PieChart';
interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}
const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'users',
    title: 'Users',
    icon: <AccountCircleIcon />,
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Analytics',
  },
  {
    segment: 'reports',
    title: 'Reports',
    icon: <BarChartIcon />,
    children: [
      {
        segment: 'attendance',
        title: 'Attendance',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'leaves',
        title: 'Leaves',
        icon: <DescriptionIcon />,
      },
    ],
  },
//   {
//     segment: 'integrations',
//     title: 'Integrations',
//     icon: <LayersIcon />,
//   },
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function useDemoRouter(initialPath: string): Router {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path: string | URL) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}

const Skeleton = styled('div')<{ height: number }>(({ theme, height }) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  height,
  content: '" "',
}));

export default function DashboardLayoutBasic(props: any) {
  const { window } = props;
  
  const [employees, setEmployees] = useState<User[]>([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Employee' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Employee' },
  ]);

  const [learners, setLearners] = useState<User[]>([
    { id: 1, name: 'Emily Brown', email: 'emily@example.com', role: 'Learner' },
    { id: 2, name: 'Michael Green', email: 'michael@example.com', role: 'Learner' },
  ]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [open, setOpen] = useState(false);  // State for dialog open/close
  const [newUser, setNewUser] = useState<User>({ id: 0, name: '', email: '', role: '' });
  const router = useDemoRouter('/users');
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };
  const handleOpenDialog = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
    setNewUser({ id: 0, name: '', email: '', role: '' }); // Clear form fields
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };
  const handleAddUser = () => {
    const userWithId = { ...newUser, id: newUser.role==='Employee'?employees.length+1:learners.length+1 };
    if (newUser.role === 'Employee') {
      setEmployees([...employees, userWithId]);
    } else if (newUser.role === 'Learner') {
      setLearners([...learners, userWithId]);
    }
    handleCloseDialog();
  };
  // Remove this const when copying and pasting into your project.
  const demoWindow = window ? window() : undefined;
  const BRANDING = {
    title: 'Attendence Management',
  };
  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      branding={BRANDING}
    >
    
      <DashboardLayout>
    
    {router.pathname === '/users'&& ( <Grid container spacing={0} padding={2}>
       <Grid size={12}>
       <Tabs value={selectedTab} onChange={handleTabChange} aria-label="User type tabs">
                <Tab label={`Employees (${employees.length})`} />
                <Tab label={`Learners (${learners.length})`} />
        </Tabs>
        <Button variant="contained" color="primary" onClick={handleOpenDialog}>
                Add User
        </Button>
        {selectedTab === 0 && (
                <Box>
                  {/* <Typography variant="h6" gutterBottom>
                    Employees ({employees.length})
                  </Typography> */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>{employee.id}</TableCell>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </Box>)}
      </Grid>

      {/* Learners Table */}
      <Grid size={12}>
      {selectedTab === 1 && (
                <Box>
                  {/* <Typography variant="h6" gutterBottom>
                    Learners ({learners.length})
                  </Typography> */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {learners.map((learner) => (
                <TableRow key={learner.id}>
                  <TableCell>{learner.id}</TableCell>
                  <TableCell>{learner.name}</TableCell>
                  <TableCell>{learner.email}</TableCell>
                  <TableCell>{learner.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </Box>)}
      </Grid>
    </Grid>)} 
    <Dialog open={open} onClose={handleCloseDialog}>
          <DialogTitle>Add New User</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Name"
              name="name"
              fullWidth
              value={newUser.name}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              label="Email"
              name="email"
              fullWidth
              value={newUser.email}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              label="Role"
              name="role"
              fullWidth
              placeholder="Enter 'Employee' or 'Learner'"
              value={newUser.role}
              onChange={handleInputChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="secondary">Cancel</Button>
            <Button onClick={handleAddUser} color="primary">Add</Button>
          </DialogActions>
    </Dialog>
    {router.pathname == '/dashboard' && (
          <Container>
            <Typography variant="h4">Welcome to the Dashboard</Typography>
            <PieChart
      series={[
        {
          data: [
            { id: 0, value:employees.length, label: 'Employees' },
            { id: 1, value:learners.length, label: 'Learners' },
          ],
        },
      ]}
      width={400}
      height={200}
    />
          </Container>
        )}
      </DashboardLayout>
    </AppProvider>
    
  );
}

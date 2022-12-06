import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import {
  useGetSwitchesQuery,
  useCreateSwitchMutation,
  useUpdateSwitchMutation,
  useDeleteSwitchMutation,
} from '../features/switches/switchesAPI';
import CreateSwitchDialog from './CreateSwitchDialog';
import { DialogMode } from '../types';

export default function SwitchTable() {
  const [open, setOpen] = useState(false);
  const [switchName, setSwitchName] = useState('');
  const [highLimit, setHighLImit] = useState<number>(50);
  const [dialogMode, setDialogMode] = useState<DialogMode>('create');
  const [editableId, setEditableId] = useState('');

  const { data, isLoading, isError } = useGetSwitchesQuery();
  const [createSwitch, { isLoading: isLoadingCreateSwitch }] =
    useCreateSwitchMutation();
  const [deleteSwitch] = useDeleteSwitchMutation();
  const [updateSwitch] = useUpdateSwitchMutation();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSwitchName('');
    setHighLImit(0);
  };
  console.log(isLoadingCreateSwitch);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <div>Something went wrong</div>;
  }

  const handleCreateSwitch = () => {
    createSwitch({ name: switchName, highLimit: highLimit, isActive: true });
    setSwitchName('');
    setHighLImit(0);
    setOpen(false);
  };

  const handleDeleteSwitch = (id: string) => {
    deleteSwitch(id);
  };

  const stageEditSwitch = (id: string) => {
    const editableSwitch = data.find((item) => {
      return item._id === id;
    });
    if (editableSwitch) {
      setSwitchName(editableSwitch.name);
      setHighLImit(editableSwitch.highLimit);
      setEditableId(editableSwitch._id);
    }
    handleClickOpen();
    setDialogMode('edit');
  };

  const handleEditSwitch = () => {
    const data = {
      _id: editableId,
      ...{ name: switchName, highLimit: highLimit, isActive: true },
    };
    updateSwitch(data);
    handleClose();
  };

  return (
    <>
      <CreateSwitchDialog
        handleClose={handleClose}
        open={open}
        switchName={switchName}
        setSwitchName={setSwitchName}
        highLimit={highLimit}
        setHighLimit={setHighLImit}
        createSwitch={handleCreateSwitch}
        dialogMode={dialogMode}
        editSwitch={handleEditSwitch}
      />
      <TableContainer component={Box}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">High limit</TableCell>
              <TableCell align="right">Active</TableCell>
              <TableCell />
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.highLimit}</TableCell>
                <TableCell align="right">
                  {row.isActive ? 'true' : 'false'}
                </TableCell>
                <TableCell>
                  <IconButton
                    aria-label="edit"
                    onClick={() => stageEditSwitch(row._id)}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDeleteSwitch(row._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => {
            handleClickOpen(), setDialogMode('create');
          }}
        >
          Create
        </Button>
      </TableContainer>
    </>
  );
}

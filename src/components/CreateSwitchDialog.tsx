import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogMode } from '../types';

interface CreateSwitchDialogProps {
  handleClose: () => void;
  open: boolean;
  switchName: string;
  setSwitchName: (name: string) => void;
  highLimit: number;
  setHighLimit: (highLimit: number) => void;
  createSwitch: () => void;
  dialogMode: DialogMode;
  editSwitch: () => void;
}

function CreateSwitchDialog({
  handleClose,
  open,
  switchName,
  setSwitchName,
  highLimit,
  setHighLimit,
  createSwitch,
  dialogMode,
  editSwitch,
}: CreateSwitchDialogProps) {
  const getMode = () => (dialogMode === 'create' ? 'Create' : 'Edit');
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{getMode()} switch</DialogTitle>
        <DialogContent>
          <TextField
            sx={{ m: 1 }}
            label="Name"
            value={switchName}
            onChange={(e: { target: { value: string } }) =>
              setSwitchName(e.target.value)
            }
          />
          <TextField
            sx={{ m: 1 }}
            label="High Limit"
            type="number"
            value={highLimit}
            onChange={(e) => setHighLimit(Number(e.target.value))}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="outlined"
            onClick={dialogMode === 'create' ? createSwitch : editSwitch}
          >
            {getMode()}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreateSwitchDialog;

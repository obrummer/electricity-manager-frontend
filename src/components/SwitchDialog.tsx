import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { MenuItem } from '@mui/material';
import { DialogMode } from '../types';

interface SwitchDialogProps {
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

function SwitchDialog({
  handleClose,
  open,
  switchName,
  setSwitchName,
  highLimit,
  setHighLimit,
  createSwitch,
  dialogMode,
  editSwitch,
}: SwitchDialogProps) {
  const highLimitValues = Array.from(Array(101).keys()).map((i) => ({
    value: i,
  }));
  const getMode = () => (dialogMode === DialogMode.create ? 'Create' : 'Edit');
  return (
    <div>
      <Dialog open={open} onClose={handleClose} data-testid="switch-dialog">
        <DialogTitle>{getMode()} switch</DialogTitle>
        <DialogContent>
          <TextField
            sx={{ m: 1 }}
            label="Name"
            name="switchName"
            required
            value={switchName}
            onChange={(e: { target: { value: string } }) =>
              setSwitchName(e.target.value)
            }
          />
          <TextField
            sx={{ m: 1, minWidth: 200 }}
            label="High Limit"
            type="number"
            value={highLimit}
            select
            onChange={(e) => setHighLimit(Number(e.target.value))}
            inputProps={{ type: 'number' }}
          >
            {highLimitValues.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="outlined"
            onClick={
              dialogMode === DialogMode.create ? createSwitch : editSwitch
            }
          >
            {getMode()}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SwitchDialog;
